"use client"

import { useState, useEffect } from "react"
import { db } from '../../../lib/firebase';
import { collection, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import Link from "next/link"

export default function GenerateQR() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [qrCode, setQrCode] = useState("")

  const [products, setProducts] = useState([]);

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

  const generateQRCode = async () => {
    if (selectedProduct) {
      const productUrl = `${window.location.origin}/customer/${selectedProduct}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(productUrl)}`;
      setQrCode(qrUrl);
      // Save QR code URL to Firestore for the selected product
      await updateDoc(doc(db, "products", selectedProduct), { qrCodeUrl: qrUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate QR Code</h1>
          <p className="text-gray-600">Create QR codes for your products to enable traceability.</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
              Select Product
            </label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={generateQRCode}
            disabled={!selectedProduct}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Generate QR Code
          </button>

          {qrCode && (
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Generated</h3>
              <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                This QR code links to the product traceability page for customers.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link href="/manufacturer/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
