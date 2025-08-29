"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import { useStacks } from "../hooks/use-stacks";
import { abbreviateAddress } from "../lib/stx-utils";

export default function LampDemo() {
  const { userData } = useStacks();

  return (
    <LampContainer className="w-full max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Echain <br /> Supply Chain Traceability
      </motion.h1>
      <div className="mt-6 flex justify-center">
        {userData?.profile ? (
          <span className="rounded-full bg-white/6 px-4 py-2 text-sm font-medium text-white/90 ring-1 ring-white/10">
            {abbreviateAddress(userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet) || 'Connected'}
          </span>
        ) : null}
      </div>
    </LampContainer>
  );
}
