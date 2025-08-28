"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Food Traceability in Seconds",
    description:
      "Our blockchain-powered system reduces food traceability from days to just seconds. This ensures faster recalls, safer food, and greater consumer confidence.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#065f46,#0f766e)] text-white text-lg font-semibold">
        Trace Food in Seconds
      </div>
    ),
  },
  {
    title: "End-to-End Transparency",
    description:
      "Every step of the supply chain is securely recorded — from farm to table. Immutable records guarantee authenticity and build trust with consumers.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        <img
          src="/placeholder.jpg"
          width={400}
          height={400}
          className="h-full w-full object-cover rounded-xl"
          alt="supply chain transparency demo"
        />
      </div>
    ),
  },
  {
    title: "Smarter Supply Chains",
    description:
      "By combining blockchain with IoT and AI, our system delivers real-time insights on origin, storage, and transport conditions, making supply chains more resilient.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#ea580c,#facc15)] text-black text-lg font-semibold">
        Blockchain + IoT + AI
      </div>
    ),
  },
  {
    title: "Consumer Safety First",
    description:
      "Faster recalls and accurate product tracking help prevent contaminated food from reaching customers — protecting health and strengthening trust.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#06b6d4,#db2777)] text-white text-lg font-semibold">
        Safer Food. Stronger Trust.
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto py-6 bg-black"> {/* Black background */}
      <StickyScroll content={content} />
    </div>
  );
}
