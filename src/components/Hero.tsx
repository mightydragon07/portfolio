"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroOrbs from "./HeroOrbs";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-28 sm:px-10 lg:px-16"
    >
      <HeroOrbs />

      {/* Main name block */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.2rem,12vw,8rem)] font-black leading-[0.92] tracking-tight"
            >
              SEMIKA
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text font-display text-[clamp(3.2rem,12vw,8rem)] font-black leading-[0.92] tracking-tight"
            >
              ANUSARA
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted sm:text-sm"
        >
          <p>Creative Full Stack</p>
          <p>Developer &amp; Editor —</p>
          <p className="text-accent">Building Immersive Web.</p>
        </motion.div>
      </div>

      {/* Bottom corner details removed: scroll-down icon intentionally omitted */}
    </section>
  );
}
