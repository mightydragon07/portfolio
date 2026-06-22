"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";

    const state = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const onMove = (e: PointerEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
    };

    function render() {
      // simple easing to smooth small jumps while keeping it responsive
      state.x += (state.tx - state.x) * 0.35;
      state.y += (state.ty - state.y) * 0.35;
      el.style.transform = `translate3d(${state.x - 10}px, ${state.y - 10}px, 0)`;
      rafId = requestAnimationFrame(render);
    }

    document.addEventListener("pointermove", onMove);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", onMove);
      document.body.style.cursor = prev || "";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[9999] h-5 w-5 rounded-full bg-transparent"
      style={{ transform: "translate3d(-9999px, -9999px, 0)", border: "2px solid rgba(0,240,255,0.9)", willChange: "transform" }}
    />
  );
}
