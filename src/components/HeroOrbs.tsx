"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type Orb = {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  depth: number; // parallax strength
  filled: boolean; // solid glass fill vs outline only
  blur?: number;
  hideOnMobile?: boolean;
  floatDuration: number;
};

const orbs: Orb[] = [
  { size: 560, top: "-12%", right: "6%", depth: 18, filled: true, blur: 0, floatDuration: 11 },
  { size: 230, top: "8%", right: "32%", depth: 30, filled: true, blur: 0, floatDuration: 8, hideOnMobile: true },
  { size: 120, top: "2%", right: "2%", depth: 42, filled: false, floatDuration: 7 },
  { size: 340, bottom: "-8%", right: "-4%", depth: 14, filled: true, blur: 0, floatDuration: 13, hideOnMobile: true },
  { size: 70, bottom: "18%", right: "46%", depth: 50, filled: true, floatDuration: 6 },
  { size: 46, bottom: "8%", right: "20%", depth: 55, filled: false, floatDuration: 9, hideOnMobile: true },
];

export default function HeroOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [mx, my]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {orbs.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

function ParallaxOrb({
  orb,
  sx,
  sy,
}: {
  orb: Orb;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * orb.depth);
  const y = useTransform(sy, (v) => v * orb.depth);

  return (
    <motion.div
      style={{
        x,
        y,
        width: orb.size,
        height: orb.size,
        top: orb.top,
        left: orb.left,
        right: orb.right,
        bottom: orb.bottom,
      }}
      className={`absolute rounded-full ${orb.hideOnMobile ? "hidden sm:block" : ""}`}
      animate={{ y: [0, -16, 0] }}
      transition={{
        duration: orb.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={
          orb.filled
            ? {
                background:
                  "radial-gradient(circle at 32% 28%, var(--accent-glow), transparent 60%), linear-gradient(135deg, var(--glass), var(--bg-2))",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(2px)",
              }
            : {
                border: "1.5px solid var(--glass-border)",
              }
        }
      />
    </motion.div>
  );
}
