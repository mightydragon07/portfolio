import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { social } from "@/lib/data";

const links = [
  { Icon: Github, href: social.github },
  { Icon: Linkedin, href: social.linkedin },
  { Icon: Mail, href: social.email },
  { Icon: Instagram, href: social.instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-ink-muted">
          Building digital experiences with cutting-edge technology
        </p>
        <div className="flex gap-4">
          {links.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-accent transition-transform hover:-translate-y-1"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
        <p className="text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} Semika Anusara. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
