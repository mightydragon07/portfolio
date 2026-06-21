"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  Code2,
  Mail,
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { social } from "@/lib/data";

const navItems = [
  { href: "#home", label: "Home", icon: Home, sub: "Welcome section" },
  { href: "#about", label: "About", icon: User, sub: "Learn more about me" },
  { href: "#projects", label: "Projects", icon: Code2, sub: "Featured work" },
  { href: "#contact", label: "Contact", icon: Mail, sub: "Get in touch" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 lg:block">
        <div className="glass flex items-center gap-2 rounded-full px-3 py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink/90 transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <item.icon size={15} className="text-accent" />
              {item.label}
            </a>
          ))}
          <div className="mx-1 h-6 w-px bg-[var(--glass-border)]" />
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile nav trigger */}
      <div className="fixed right-5 top-5 z-[60] flex items-center gap-3 lg:hidden">
        <ThemeToggle />
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(true)}
          className="glass flex h-12 w-12 items-center justify-center rounded-full"
        >
          <Menu size={20} className="text-accent" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--bg-1)", opacity: open ? 0.98 : 0 }}
      >
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] p-6">
          <h2 className="font-display text-lg">Navigation</h2>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-display text-center ${
                i === 0 ? "text-accent" : "text-ink/60"
              } text-5xl sm:text-6xl lg:text-5xl leading-tight`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-4 border-t border-[var(--glass-border)] p-6">
          {[
            { Icon: Github, href: social.github },
            { Icon: Linkedin, href: social.linkedin },
            { Icon: Mail, href: social.email },
            { Icon: Instagram, href: social.instagram },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="glass flex h-12 w-12 items-center justify-center rounded-full text-accent"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
