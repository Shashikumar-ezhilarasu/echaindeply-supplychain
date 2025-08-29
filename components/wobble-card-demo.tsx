"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      {/* Card 1: Food Safety */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-full">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Blockchain for Food Safety
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Our solution enables end-to-end traceability, reducing the time to
            identify contaminated food from days to just seconds — protecting
            both consumers and businesses.
          </p>
        </div>
      </WobbleCard>

      {/* Card 2: Transparency */}
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-indigo-900">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Transparency & Trust
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Every step of the supply chain is securely recorded on the blockchain,
          ensuring data immutability and building consumer trust in food
          authenticity.
        </p>
      </WobbleCard>

      {/* Card 3: Efficiency */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-full">
          <h2 className="max-w-full md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Smarter Supply Chains
          </h2>
          <p className="mt-4 max-w-full text-left text-base/6 text-neutral-200">
            By combining blockchain with IoT and AI, our platform delivers
            real-time insights on origin, storage, and transportation, making
            recalls faster and supply chains more resilient.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
