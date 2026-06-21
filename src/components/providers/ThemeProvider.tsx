"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "day" | "night";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (originX: number, originY: number) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("night");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "day"
        : "night");
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "day");
    setMounted(true);
  }, []);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    window.localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "day");
  };

  // The signature interaction: a liquid, circular reveal that ripples out
  // from the toggle button using the View Transitions API when available,
  // gracefully falling back to a simple class swap otherwise.
  const toggleTheme = (originX: number, originY: number) => {
    const next: Theme = theme === "night" ? "day" : "night";

    const docWithTransitions = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
      };
    };

    if (
      typeof docWithTransitions.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.style.setProperty("--ripple-x", `${originX}px`);
      document.documentElement.style.setProperty("--ripple-y", `${originY}px`);

      const transition = docWithTransitions.startViewTransition(() => {
        applyTheme(next);
      });

      transition.ready
        .then(() => {
          const endRadius = Math.hypot(
            Math.max(originX, window.innerWidth - originX),
            Math.max(originY, window.innerHeight - originY)
          );

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${originX}px ${originY}px)`,
                `circle(${endRadius}px at ${originX}px ${originY}px)`,
              ],
            },
            {
              duration: 650,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          // Transition unsupported mid-flight — theme is already applied.
        });
    } else {
      applyTheme(next);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
