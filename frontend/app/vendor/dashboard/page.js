"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import { db } from '../../../lib/firebase';
import { collection, updateDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useStacks } from "@/hooks/use-stacks";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State for the event form, now with more specific fields
  const [event, setEvent] = useState({ 
    event_type: 'Goods Received', // Default event type
    timestamp: '', 
    location: '', 
    responsibleParty: '', 
    temperature: '', // IoT sensor data from the article
    humidity: '', // IoT sensor data from the article
    inspectionReportUrl: '' // For certificates/reports
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState('');
  const [eventSuccess, setEventSuccess] = useState('');
  const [newProduct, setNewProduct] = useState({
    productId: '1001',
    name: 'Sample Product',
    sku: 'SKU-001',
    gtin: '0123456789012',
    ingredients: 'Water, Sugar, Salt',
    certifications: 'ISO9001, FDA',
    manufacturer: 'Acme Corp',
    location: 'New York, USA',
    productionDate: new Date().toISOString().slice(0, 10),
    expirationDate: new Date(Date.now() + 31536000000).toISOString().slice(0, 10), // +1 year
    batch: 'BATCH-001',
  });
  
  // State for the QR Code Modal
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [qrProduct, setQrProduct] = useState(null);
  const {user, handleCreateNewProduct} = useStacks();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Updated to handle the new, richer event data
  async function handleAddEvent(productId) {
    setEventError('');
    setEventSuccess('');
    setEventLoading(true);

    if (!event.event_type || !event.timestamp || !event.location || !event.responsibleParty) {
      setEventError('Please fill all required fields.');
      setEventLoading(false);
      return;
    }
    
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        const updatedEvents = [...(productData.events || []), event];
        await updateDoc(productRef, { events: updatedEvents });
        await handleCreateNewProduct(newProduct);
        
        setEvent({ event_type: 'Goods Received', timestamp: '', location: '', responsibleParty: '', temperature: '', humidity: '', inspectionReportUrl: '' });
        setEventSuccess('Event successfully recorded on the blockchain ledger.');
      } else {
        setEventError('Product not found.');
      }
    } catch (err) {
      setEventError('Failed to add event. Please try again.');
    }
    setEventLoading(false);
  }

  // Function to generate a QR code for consumer traceability
  async function generateQrCodeForProduct(product) {
    try {
        // This URL would point to a public page where a consumer can see the product's history
        const productTraceabilityUrl = `${window.location.origin}/trace/${product.id}`;
        const dataUrl = await QRCode.toDataURL(productTraceabilityUrl, { width: 300 });
        setQrCodeUrl(dataUrl);
        setQrProduct(product);
    } catch (err) {
        console.error('Failed to generate QR code', err);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Vendor Food Trust Portal</h1>
          <p className="text-gray-300">Enhancing food safety and transparency through blockchain traceability, inspired by Walmart's Food Trust initiative.</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Product Ledger</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-300 mb-1"><strong>Origin:</strong> {product.location}</p>
                  <p className="text-sm text-gray-300 mb-1"><strong>Batch #:</strong> {product.batch}</p>
                  <p className="text-sm text-gray-300 mb-1"><strong>Production Date:</strong> {product.productionDate}</p>
                  <p className="text-sm text-gray-300 mb-4"><strong>Total Events Logged:</strong> {(product.events || []).length}</p>
                </div>
                
                <div className="mt-4 space-y-2">
                  <button 
                    onClick={() => generateQrCodeForProduct(product)} 
                    className="bg-gray-600 hover:bg-gray-700 text-white w-full px-3 py-2 rounded transition-colors"
                  >
                    Generate Consumer QR Code
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full px-3 py-2 rounded transition-colors"
                  >
                    {selectedProduct === product.id ? 'Hide Ledger' : 'Update Product Ledger'}
                  </button>
                </div>
                
                {selectedProduct === product.id && (
                  <div className="mt-4 border-t border-gray-600 pt-4">
                    <form onSubmit={e => { e.preventDefault(); handleAddEvent(product.id); }} className="flex flex-col gap-3 mb-4">
                        <label className="text-sm font-medium">Event Type</label>
                        <select value={event.event_type} onChange={e => setEvent({ ...event, event_type: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded">
                            <option>Goods Received</option>
                            <option>Quality Check Passed</option>
                            <option>Stored in Warehouse</option>
                            <option>Dispatched to Retailer</option>
                        </select>
                        <input type="datetime-local" value={event.timestamp} onChange={e => setEvent({ ...event, timestamp: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded" />
                        <input placeholder="Current Location (e.g., Warehouse A)" value={event.location} onChange={e => setEvent({ ...event, location: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded" />
                        <input placeholder="Responsible Party" value={event.responsibleParty} onChange={e => setEvent({ ...event, responsibleParty: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded" />
                        <div className="grid grid-cols-2 gap-2">
                            <input placeholder="Temperature (°C)" type="number" value={event.temperature} onChange={e => setEvent({ ...event, temperature: e.target.value })} className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded" />
                            <input placeholder="Humidity (%)" type="number" value={event.humidity} onChange={e => setEvent({ ...event, humidity: e.target.value })} className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded" />
                        </div>
                        <input placeholder="Inspection Report URL" value={event.inspectionReportUrl} onChange={e => setEvent({ ...event, inspectionReportUrl: e.target.value })} className="border border-gray-600 bg-gray-700 text-white px-2 py-2 rounded" />
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors" disabled={eventLoading}>{eventLoading ? 'Submitting...' : 'Submit to Ledger'}</button>
                    </form>
                    
                    {eventError && <div className="text-red-400 text-sm mb-2">{eventError}</div>}
                    {eventSuccess && <div className="text-green-400 text-sm mb-2">{eventSuccess}</div>}
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Traceability History:</h4>
                      <ul className="space-y-3 text-gray-300 text-sm">
                        {(product.events && product.events.length > 0) ? (
                          product.events.map((ev, idx) => (
                            <li key={idx} className="border-b border-gray-700 pb-2">
                              <strong>{ev.event_type}</strong>
                              <p>By: {ev.responsibleParty} at {ev.location}</p>
                              <p>Date: {new Date(ev.timestamp).toLocaleString()}</p>
                              {ev.temperature && <p>Conditions: {ev.temperature}°C, {ev.humidity}% Humidity</p>}
                            </li>
                          ))
                        ) : (
                          <li>No traceability history recorded.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {qrCodeUrl && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setQrCodeUrl('')}>
                <div className="bg-white p-8 rounded-lg text-center text-black" onClick={e => e.stopPropagation()}>
                    <h2 className="text-2xl font-bold mb-2">QR Code for {qrProduct?.name}</h2>
                    <p className="mb-4">Scan to see the full product journey.</p>
                    <img src={qrCodeUrl} alt="Product QR Code" />
                    <button onClick={() => setQrCodeUrl('')} className="mt-6 bg-red-600 text-white px-6 py-2 rounded">Close</button>
                </div>
            </div>
        )}

        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}