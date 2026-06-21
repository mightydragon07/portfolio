"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      // Center the circle (10px offset for a 20px cursor)
      el.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.body.style.cursor = prev || "";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[9999] h-5 w-5 rounded-full bg-transparent transition-transform duration-75"
      style={{ transform: "translate3d(-9999px, -9999px, 0)", border: "2px solid rgba(0,240,255,0.9)" }}
    />
  );
}
