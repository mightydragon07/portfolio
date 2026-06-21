"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "day";

  return (
    <button
      aria-label="Toggle day and night mode"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }}
      className="glass-pill relative flex h-10 w-[4.5rem] items-center rounded-full px-1 transition-shadow hover:shadow-glow-accent"
    >
      <span
        className="absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent/90 text-night-bg shadow-md transition-transform duration-500"
        style={{
          transform: isDay ? "translateX(1.6rem)" : "translateX(0)",
        }}
      >
        {isDay ? <Sun size={16} /> : <Moon size={16} />}
      </span>
      <Moon
        size={14}
        className="absolute left-2.5 text-ink-muted"
        style={{ opacity: isDay ? 0.35 : 0 }}
      />
      <Sun
        size={14}
        className="absolute right-2.5 text-ink-muted"
        style={{ opacity: isDay ? 0 : 0.35 }}
      />
    </button>
  );
}
