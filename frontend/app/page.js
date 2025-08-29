"use client";

import { useEffect } from "react";
import GlowingEffectDemo from "@/components/ui/glowing-effect-demo";
import LampDemo from "@/components/lamp-demo";
import WavyBackgroundDemo from "@/components/wavy-background-demo";
import WobbleCardDemo from "@/components/wobble-card-demo";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
import CardHoverEffectDemo from "@/components/card-hover-effect-demo";
import StickyScrollRevealDemo from "@/components/sticky-scroll-reveal-demo";
import { useStacks } from "@/hooks/use-stacks";

export default function Home() {
  const { userData, connectWallet } = useStacks();

  useEffect(() => {
    // ensure client-side hook loads
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-12 px-4">
      <section className="w-full mb-6">
        <WavyBackgroundDemo />
        <div className="mt-12">
          <WobbleCardDemo />
          <InfiniteMovingCardsDemo />
        </div>
        
      </section>

      <section className="w-full max-w-6xl mx-auto mb-8">
        <div className="z-50">
          <LampDemo />
          
          <CardHoverEffectDemo />
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto mt-12">
        <div className="mx-auto text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Echain — Supply Chain Traceability</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mt-3">
            Trace products across manufacturers, vendors, warehouses and customers with cryptographic proofs and wallet-based authentication.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <div className="flex gap-3">
              <a href="/manufacturer/login" className="px-4 py-2 rounded-md bg-gray-800 text-sm text-gray-200 hover:bg-gray-700">Manufacturer</a>
              <a href="/vendor/login" className="px-4 py-2 rounded-md bg-gray-800 text-sm text-gray-200 hover:bg-gray-700">Vendor</a>
              <a href="/warehouse/login" className="px-4 py-2 rounded-md bg-gray-800 text-sm text-gray-200 hover:bg-gray-700">Warehouse</a>
              <a href="/customer/login" className="px-4 py-2 rounded-md bg-gray-800 text-sm text-gray-200 hover:bg-gray-700">Customer</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-semibold">Traceability</h3>
            <p className="text-sm text-gray-400 mt-2">Immutable product records linked to wallet identities.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-semibold">Real-time Updates</h3>
            <p className="text-sm text-gray-400 mt-2">Firestore listeners keep the UI in sync across roles.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-semibold">Wallet-first Auth</h3>
            <p className="text-sm text-gray-400 mt-2">Connect via Stacks and manage product actions with your wallet.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-semibold">QR & Events</h3>
            <p className="text-sm text-gray-400 mt-2">Generate QR codes and track events through checkpoints.</p>
          </div>
        </div>

        <div className="mt-12">
          <GlowingEffectDemo />
        </div>
        
        {/* <div className="mt-12">
          <WobbleCardDemo />
        </div> */}
        {/* <div className="mt-12">
          <InfiniteMovingCardsDemo />
        </div> */}
        {/* <div className="mt-12">
          <CardHoverEffectDemo />
        </div> */}
        {/* <div className="mt-12 w-full">
          <StickyScrollRevealDemo />
        </div> */}
      </section>
    </main>
  );
}
