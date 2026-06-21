"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { social } from "@/lib/data";

const contacts = [
  { label: "GitHub", href: social.github, Icon: Github },
  { label: "LinkedIn", href: social.linkedin, Icon: Linkedin },
  { label: "Email", href: social.email, Icon: Mail },
  { label: "Instagram", href: social.instagram, Icon: Instagram },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center font-display text-4xl font-bold sm:text-5xl"
      >
        Get In <span className="gradient-text">Touch</span>
      </motion.h2>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
        {contacts.map(({ label, href, Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass glass-sheen flex flex-col items-center gap-3 rounded-2xl p-6"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon size={22} />
            </span>
            <span className="font-display text-sm font-medium">{label}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
