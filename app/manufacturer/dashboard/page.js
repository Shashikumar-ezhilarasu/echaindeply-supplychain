"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarDemo from "@/components/sidebar-demo";
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  stringAsciiCV,
  stringUtf8CV,
  uintCV,
  someCV,
} from "@stacks/transactions";

export default function ManufacturerDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productId: '',
    name: '',
    sku: '',
    gtin: '',
    ingredients: '',
    certifications: '',
    manufacturer: '',
    location: '',
    productionDate: '',
    expirationDate: '',
    batch: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [event, setEvent] = useState({ event_type: '', timestamp: '', location: '', responsibleParty: '', destination: '', shipmentID: '' });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState('');
  const [eventSuccess, setEventSuccess] = useState('');

  useEffect(() => {
    // Use Firestore real-time updates for products
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );
    return () => unsubscribe();
  }, []);

  async function handleAddProduct(e) {
    e.preventDefault();
    // Example args for Stacks smart contract
    // Safely parse dates to integer timestamps
    const prodDate = newProduct.productionDate ? Math.floor(new Date(newProduct.productionDate).getTime() / 1000) : 0;
    const expDate = newProduct.expirationDate ? Math.floor(new Date(newProduct.expirationDate).getTime() / 1000) : 0;
    const fnArgs = [
      stringAsciiCV(newProduct.productId),
      stringUtf8CV(newProduct.name),
      stringAsciiCV(newProduct.sku),
      newProduct.gtin ? someCV(stringAsciiCV(newProduct.gtin)) : someCV(),
      stringUtf8CV(newProduct.ingredients),
      stringUtf8CV(newProduct.certifications),
      stringUtf8CV(newProduct.manufacturer),
      stringUtf8CV(newProduct.location),
      uintCV(Number.isInteger(prodDate) ? prodDate : 0),
      uintCV(Number.isInteger(expDate) ? expDate : 0),
    ];
    // Add to Firestore for now
    await addDoc(collection(db, "products"), {
      productId: newProduct.productId,
      name: newProduct.name,
      sku: newProduct.sku,
      gtin: newProduct.gtin,
      ingredients: newProduct.ingredients.split(',').map(i => i.trim()),
      certifications: newProduct.certifications,
      manufacturer: newProduct.manufacturer,
      location: newProduct.location,
      productionDate: newProduct.productionDate,
      expirationDate: newProduct.expirationDate,
      batch: newProduct.batch,
      qrCodeUrl: '',
      events: []
    });
    setNewProduct({
      productId: '',
      name: '',
      sku: '',
      gtin: '',
      ingredients: '',
      certifications: '',
      manufacturer: '',
      location: '',
      productionDate: '',
      expirationDate: '',
      batch: '',
    });
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(p => p.id !== id));
  }

  async function handleUpdate(id, batch) {
    await updateDoc(doc(db, "products", id), { batch });
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  async function handleAddEvent(productId) {
    setEventError('');
    setEventSuccess('');
    setEventLoading(true);
    // Validate event fields
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
        setEvent({ event_type: '', timestamp: '', location: '', responsibleParty: '', destination: '', shipmentID: '' });
        setEventSuccess('Event added successfully!');
        const querySnapshot = await getDocs(collection(db, "products"));
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setEventError('Product not found.');
      }
    } catch (err) {
      setEventError('Failed to add event. Please try again.');
    }
    setEventLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manufacturer Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your products and generate QR codes.</p>
        </header>

        <div className="mb-8">
          <SidebarDemo />
        </div>

        <form onSubmit={handleAddProduct} className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input placeholder="Product ID" value={newProduct.productId} onChange={e => setNewProduct({ ...newProduct, productId: e.target.value })} required className="border px-3 py-2 rounded" />
          <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required className="border px-3 py-2 rounded" />
          <input placeholder="SKU" value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} required className="border px-3 py-2 rounded" />
          <input placeholder="GTIN" value={newProduct.gtin} onChange={e => setNewProduct({ ...newProduct, gtin: e.target.value })} className="border px-3 py-2 rounded" />
          <input placeholder="Ingredients (comma separated)" value={newProduct.ingredients} onChange={e => setNewProduct({ ...newProduct, ingredients: e.target.value })} required className="border px-3 py-2 rounded" />
          <input placeholder="Certifications" value={newProduct.certifications} onChange={e => setNewProduct({ ...newProduct, certifications: e.target.value })} className="border px-3 py-2 rounded" />
          <input placeholder="Manufacturer Name" value={newProduct.manufacturer} onChange={e => setNewProduct({ ...newProduct, manufacturer: e.target.value })} required className="border px-3 py-2 rounded" />
          <input placeholder="Manufacturing Location" value={newProduct.location} onChange={e => setNewProduct({ ...newProduct, location: e.target.value })} required className="border px-3 py-2 rounded" />
          <input type="date" placeholder="Production Date" value={newProduct.productionDate} onChange={e => setNewProduct({ ...newProduct, productionDate: e.target.value })} required className="border px-3 py-2 rounded" />
          <input type="date" placeholder="Expiration Date" value={newProduct.expirationDate} onChange={e => setNewProduct({ ...newProduct, expirationDate: e.target.value })} required className="border px-3 py-2 rounded" />
          <input placeholder="Batch" value={newProduct.batch} onChange={e => setNewProduct({ ...newProduct, batch: e.target.value })} required className="border px-3 py-2 rounded" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 lg:col-span-3">Add Product</button>
        </form>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Batch:</strong> {product.batch}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ingredients:</strong> {Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients}
                </p>
                {product.qrCodeUrl && (
                  <div className="mt-2">
                    <img src={product.qrCodeUrl} alt="QR Code" style={{ width: 120, height: 120 }} />
                  </div>
                )}
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded mt-2 mr-2">Delete</button>
                <button onClick={() => handleUpdate(product.id, prompt('New batch:', product.batch))} className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 mr-2">Update Batch</button>
                <button onClick={() => setSelectedProduct(product.id)} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">View/Add Events</button>
                {selectedProduct === product.id && (
                  <div className="mt-4">
                    <form onSubmit={e => { e.preventDefault(); handleAddEvent(product.id); }} className="flex gap-2 flex-wrap mb-2">
                      <input placeholder="Event Type" value={event.event_type} onChange={e => setEvent({ ...event, event_type: e.target.value })} required className="border px-2 py-1 rounded" />
                      <input placeholder="Timestamp" value={event.timestamp} onChange={e => setEvent({ ...event, timestamp: e.target.value })} required className="border px-2 py-1 rounded" />
                      <input placeholder="Location" value={event.location} onChange={e => setEvent({ ...event, location: e.target.value })} required className="border px-2 py-1 rounded" />
                      <input placeholder="Responsible Party" value={event.responsibleParty} onChange={e => setEvent({ ...event, responsibleParty: e.target.value })} required className="border px-2 py-1 rounded" />
                      <input placeholder="Destination" value={event.destination} onChange={e => setEvent({ ...event, destination: e.target.value })} className="border px-2 py-1 rounded" />
                      <input placeholder="Shipment ID" value={event.shipmentID} onChange={e => setEvent({ ...event, shipmentID: e.target.value })} className="border px-2 py-1 rounded" />
                      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded" disabled={eventLoading}>{eventLoading ? 'Adding...' : 'Add Event'}</button>
                    </form>
                    {eventError && <div className="text-red-600 mb-2">{eventError}</div>}
                    {eventSuccess && <div className="text-green-600 mb-2">{eventSuccess}</div>}
                    <div>
                      <h4 className="font-semibold mb-1">Events:</h4>
                      <ul className="list-disc ml-5">
                        {(product.events || []).map((ev, idx) => (
                          <li key={idx}>
                            <strong>{ev.event_type}</strong> | {ev.timestamp} | {ev.location} | {ev.responsibleParty} | {ev.destination} | {ev.shipmentID}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
