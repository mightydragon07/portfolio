"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center font-display text-4xl font-bold sm:text-5xl"
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass glass-sheen rounded-3xl p-8 text-ink-muted leading-relaxed"
        >
          <p className="mb-4">
            I&apos;m a passionate Full Stack Developer and Editor with a focus
            on creating immersive digital experiences. My expertise spans
            across modern web technologies and creative design.
          </p>
          <p>
            With a keen eye for detail and a love for innovation, I bring
            ideas to life through code and creativity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          {skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="mb-2 flex justify-between font-display text-sm">
                <span>{skill.name}</span>
                <span className="text-accent">{skill.level}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--glass-border)]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgb(var(--accent-rgb)), rgb(var(--accent-2-rgb)))",
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
