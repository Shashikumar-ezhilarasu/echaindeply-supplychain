"use client";
import React, { useRef } from "react";
import { GoogleGeminiEffect } from "./google-gemini-effect";
import { useScroll, useTransform } from "motion/react";

export function GoogleGeminiEffectDemo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0, 1.2]),
  ];

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={pathLengths}
        title="Secure Supply Chain Traceability"
        description="Track products from manufacturer to customer. Verify authenticity, ensure transparency, and build trust with blockchain-powered supply chain solutions."
        className=""
      />
    </div>
  );
}
