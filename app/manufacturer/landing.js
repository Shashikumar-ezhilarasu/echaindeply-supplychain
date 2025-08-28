import React, { useState } from "react";
import Link from "next/link";

export default function ManufacturerLanding() {
  const [walletAddress, setWalletAddress] = useState("");
  const [connecting, setConnecting] = useState(false);
  const connectWallet = async () => {
    setConnecting(true);
    if (window.leather) {
      try {
        const result = await window.leather.connect();
        setWalletAddress(result.address || "");
        alert("Wallet connected: " + (result.address || ""));
      } catch (err) {
        alert("Wallet connection failed.");
      }
    } else {
      alert("Leather wallet extension not found.");
    }
    setConnecting(false);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-8">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to Manufacturer Portal</h1>
        <p className="mb-6 text-gray-700 text-lg">
          Manage your products, generate QR codes, and track supply chain events with blockchain-backed traceability. Connect your Leather wallet to get started!
        </p>
        <button
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition-transform mb-4"
          onClick={connectWallet}
          disabled={connecting}
        >
          {connecting ? "Connecting..." : walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
        </button>
        <ul className="text-left text-gray-600 mb-6">
          <li className="mb-2">• Add and manage products</li>
          <li className="mb-2">• Generate QR codes for traceability</li>
          <li className="mb-2">• Track product events and batches</li>
          <li className="mb-2">• Secure, blockchain-based data</li>
        </ul>
        <Link href="/manufacturer/dashboard" className="text-blue-600 hover:underline font-semibold">Go to Dashboard</Link>
      </div>
    </div>
  );
}
