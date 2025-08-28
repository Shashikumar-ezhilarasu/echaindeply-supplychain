"use client";

import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import Link from "next/link";

export default function WarehouseLogin() {
  const { userData, connectWallet, disconnectWallet } = useStacks();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Warehouse Login</h1>
        <div className="space-y-6">
          {!userData ? (
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md font-semibold shadow hover:scale-105 transition-transform mb-4"
            >
              Connect Wallet
            </button>
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
            <Link href="/warehouse/dashboard">
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
