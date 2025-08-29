"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from '../../../lib/firebase'; // Assuming firebase config is in this path
import { collection, updateDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useStacks } from "@/hooks/use-stacks";

export default function WarehouseDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [event, setEvent] = useState({ 
    event_type: 'Received at Loading Dock', // Default warehouse event
    timestamp: '', 
    location: '', // e.g., Aisle 4, Bay 12
    responsibleParty: '', 
    notes: '' // Optional notes for warehouse staff
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState('');
  const [eventSuccess, setEventSuccess] = useState('');
  const {user, handleCreateNewProduct} = useStacks();
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

  // Fetch all products in real-time from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); // Clean up the listener
  }, []);

  // Function to add a new warehouse event to a product's history
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
        
        // Reset form and show success message
        setEvent({ event_type: 'Received at Loading Dock', timestamp: '', location: '', responsibleParty: '', notes: '' });
        setEventSuccess('Warehouse event logged successfully.');
      } else {
        setEventError('Product not found in the system.');
      }
    } catch (err) {
      console.error("Error adding event: ", err);
      setEventError('Failed to log event. Please try again.');
    } finally {
        setEventLoading(false);
        // Hide messages after 3 seconds
        setTimeout(() => {
            setEventSuccess('');
            setEventError('');
        }, 3000);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Warehouse Operations Dashboard</h1>
          <p className="text-gray-300">Track and manage product inventory as it moves through the warehouse.</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Incoming & Stored Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-400">No products are currently tracked in the system.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-300 mb-1"><strong>Batch:</strong> {product.batch}</p>
                  <p className="text-sm text-gray-300 mb-1"><strong>SKU:</strong> {product.sku}</p>
                  <p className="text-sm text-gray-300 mb-4"><strong>Manufacturer:</strong> {product.manufacturer}</p>
                  
                  <button 
                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)} 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded w-full transition-colors"
                  >
                    {selectedProduct === product.id ? 'Hide Actions' : 'Update Status'}
                  </button>

                  {/* Collapsible section for adding warehouse events */}
                  {selectedProduct === product.id && (
                    <div className="mt-4 border-t border-gray-700 pt-4">
                      <h4 className="font-semibold mb-2 text-white">Log New Warehouse Event:</h4>
                      <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(product.id); }} className="flex flex-col gap-3 mb-4">
                        <label className="text-sm font-medium text-gray-300">Event Type</label>
                        <select value={event.event_type} onChange={e => setEvent({ ...event, event_type: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded">
                            <option>Received at Loading Dock</option>
                            <option>Stored in Aisle</option>
                            <option>Picked for Shipment</option>
                            <option>Dispatched to Vendor</option>
                        </select>
                        <input placeholder="Location (e.g., Aisle 4, Bay 12)" value={event.location} onChange={e => setEvent({ ...event, location: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded" />
                        <input type="datetime-local" value={event.timestamp} onChange={e => setEvent({ ...event, timestamp: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded" />
                        <input placeholder="Operator Name" value={event.responsibleParty} onChange={e => setEvent({ ...event, responsibleParty: e.target.value })} required className="border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded" />
                        <textarea placeholder="Internal Notes (Optional)" value={event.notes} onChange={e => setEvent({ ...event, notes: e.target.value })} className="border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded" />
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors" disabled={eventLoading}>
                          {eventLoading ? 'Logging...' : 'Log Event'}
                        </button>
                      </form>
                      
                      {eventError && <p className="text-red-400 text-sm mb-2">{eventError}</p>}
                      {eventSuccess && <p className="text-green-400 text-sm mb-2">{eventSuccess}</p>}

                      <div>
                        <h4 className="font-semibold mb-2 text-white">Product History:</h4>
                        {(product.events && product.events.length > 0) ? (
                            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                            {product.events.map((ev, idx) => (
                                <li key={idx}>
                                  <strong>{ev.event_type}</strong> at {ev.location}
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 text-sm">No events recorded for this product yet.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-12">
          <Link href="/" className="text-orange-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
