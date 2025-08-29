"use client";

import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import Link from "next/link";
import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo";
import { useRef, useEffect } from "react";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useRouter } from "next/navigation";

export default function ManufacturerLogin() {
  const { userData, connectWallet, disconnectWallet } = useStacks();
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Auto-redirect to dashboard when wallet is connected
  useEffect(() => {
    if (userData) {
      router.push("/manufacturer/dashboard");
    }
  }, [userData, router]);

  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0, 1.2]),
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Google Gemini Effect */}
      <div
        className="h-[100vh] bg-black w-full dark:border dark:border-white/[0.1] relative pt-40 overflow-hidden"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={pathLengths}
          title="Manufacturer Portal"
          description="Create, track, and manage your products through the supply chain. Generate QR codes, monitor inventory, and ensure product authenticity."
          className=""
        />
        
        {/* Login Card Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-8 border border-white/20">
            <h1 className="text-2xl font-bold text-center text-white mb-8">Manufacturer Login</h1>
            <div className="space-y-6">
              {!userData ? (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    Connect Wallet
                  </button>
                  <Link href="https://docs.stacks.co" target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-700 transition-all duration-200"
                    >
                      Read Docs
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {abbreviateAddress(userData.profile?.stxAddress?.mainnet || userData.profile?.stxAddress?.testnet)}
                  </button>
                  <button
                    type="button"
                    onClick={disconnectWallet}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Disconnect
                  </button>
                </div>
              )}
              {userData && (
                <Link href="/manufacturer/dashboard">
                  <button
                    type="button"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Go to Dashboard
                  </button>
                </Link>
              )}
            </div>
            <div className="mt-6 text-center">
              <Link href="/" className="text-blue-300 hover:text-blue-200 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
