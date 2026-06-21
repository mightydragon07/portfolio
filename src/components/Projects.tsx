"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Laptop,
  LineChart,
  Smartphone,
  Car,
  ArrowRight,
} from "lucide-react";
import { projects, Project } from "@/lib/data";

const icons: Record<Project["icon"], typeof ShoppingCart> = {
  cart: ShoppingCart,
  laptop: Laptop,
  chart: LineChart,
  mobile: Smartphone,
  car: Car,
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center font-display text-4xl font-bold sm:text-5xl"
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const Icon = icons[project.icon];
          return (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              whileHover={{ y: -8 }}
              className="glass glass-sheen group flex flex-col rounded-3xl p-7"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Icon size={24} />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">
                {project.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-ink-muted">
                {project.description}
              </p>
              <span className="flex items-center gap-2 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                View Project <ArrowRight size={14} />
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
