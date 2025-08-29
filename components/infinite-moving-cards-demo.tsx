"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function DoubleInfiniteMovingCardsDemo() {
  return (
    <div className="h-[50rem] flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center gap-10 relative overflow-hidden">
      {/* First Row - Right to Left */}
      <InfiniteMovingCards items={quotes} direction="left" speed="slow" />

      {/* Second Row - Left to Right */}
      <InfiniteMovingCards items={quotesBottom} direction="right" speed="slow" />
    </div>
  );
}

const quotes = [
  {
    quote:
      "Every year, 600 million people fall ill from contaminated food, and 420,000 die. Traceability delays make recalls too slow to save lives.",
    name: "Hackathon Project",
    title: "The Problem",
  },
  {
    quote:
      "Food fraud costs billions annually — from diluted olive oil to mislabeled meat. Blockchain prevents tampering by recording every step immutably.",
    name: "Hackathon Project",
    title: "Food Fraud",
  },
  {
    quote:
      "Recalls of millions of pounds of poultry and lettuce have shown the weaknesses of traditional supply chains. Blockchain cuts trace time from 7 days to 2.2 seconds.",
    name: "Hackathon Project",
    title: "Faster Recalls",
  },
  {
    quote:
      "Illegal production makes up 5–50% of the global food market. Our system provides proof of origin, ensuring authenticity from farm to fork.",
    name: "Hackathon Project",
    title: "Fighting Illegal Production",
  },
];

const quotesBottom = [
  {
    quote:
      "Outbreaks of Salmonella, Listeria, and E. coli can devastate communities. With real-time blockchain traceability, contaminated batches can be isolated instantly.",
    name: "Hackathon Project",
    title: "Health Protection",
  },
  {
    quote:
      "Horse meat scandals and mislabeling show how opaque supply chains fail. Our platform restores trust with transparency and immutable records.",
    name: "Hackathon Project",
    title: "Transparency Restored",
  },
  {
    quote:
      "Beyond food, blockchain traceability applies to pharmaceuticals, agriculture, and global logistics. This is just the beginning.",
    name: "Hackathon Project",
    title: "Future Potential",
  },
];
