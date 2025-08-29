"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Trace Food. Build Trust. Save Lives.
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Our blockchain platform brings real-time transparency to food supply chains — 
        making them safer, faster, and smarter.
      </p>
    </WavyBackground>
  );
}
