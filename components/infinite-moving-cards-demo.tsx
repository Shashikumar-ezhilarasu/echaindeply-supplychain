"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={quotes}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const quotes = [
  {
    quote:
      "Every year, millions are affected by foodborne diseases due to slow traceability. Our system reduces recall time from days to seconds.",
    name: "Hackathon Project",
    title: "Problem Solved",
  },
  {
    quote:
      "Blockchain ensures that every record is tamper-proof, building consumer trust and protecting brands from fraud.",
    name: "Hackathon Project",
    title: "Trust Through Transparency",
  },
  {
    quote:
      "With real-time traceability, contaminated products can be identified and removed instantly, saving lives and costs.",
    name: "Hackathon Project",
    title: "Impact",
  },
  {
    quote:
      "Our platform is scalable beyond food — pharmaceuticals, agriculture, and global supply chains can all benefit.",
    name: "Hackathon Project",
    title: "Future Vision",
  },
  {
    quote:
      "Safe food is not just a choice, it's a right. Technology can make it possible for everyone, everywhere.",
    name: "Hackathon Project",
    title: "Mission",
  },
];
