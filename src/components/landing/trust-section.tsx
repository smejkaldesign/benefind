"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Code, Quote } from "lucide-react";

const trustBadges = [
  { label: "100% Free", icon: Shield },
  { label: "Private by Design", icon: Lock },
  { label: "Open Source", icon: Code },
];

const avatarColors = [
  "bg-brand",
  "bg-sky-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
];

const testimonials = [
  {
    name: "Maria G.",
    location: "Houston, TX",
    initials: "MG",
    quote:
      "I had no idea I qualified for SNAP and LIHEAP. Benefind found $340 a month in benefits I was missing.",
  },
  {
    name: "James T.",
    location: "Detroit, MI",
    initials: "JT",
    quote:
      "The whole process took 5 minutes. I applied for heating assistance the same day.",
  },
  {
    name: "Sarah L.",
    location: "Phoenix, AZ",
    initials: "SL",
    quote:
      "As a single mom, navigating government programs felt impossible. Benefind made it simple.",
  },
  {
    name: "TechStart Inc.",
    location: "Austin, TX",
    initials: "TS",
    quote:
      "We discovered $150K in SBIR funding we didn\u2019t know we were eligible for.",
  },
  {
    name: "GreenBuild Co.",
    location: "Portland, OR",
    initials: "GB",
    quote:
      "The clean energy credits alone saved us $45K. Worth every minute of the screening.",
  },
  {
    name: "David K.",
    location: "Miami, FL",
    initials: "DK",
    quote:
      "I was skeptical about a free tool, but it found $8,200 in annual benefits. Incredible.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function TrustSection() {
  return (
    <section className="w-full bg-surface py-24">
      <div className="mx-auto max-w-[1520px] px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl text-text md:text-5xl">
            Trusted by thousands
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-text-muted">
            Real people and businesses finding real money, every single day.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-8">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                <badge.icon className="h-4 w-4" />
              </span>
              {badge.label}
            </div>
          ))}
        </div>

        {/* Testimonial grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.initials}
              variants={cardVariants}
              className="rounded-[16px] border border-border bg-surface-bright p-6 transition hover:border-accent/20"
            >
              <Quote className="mb-4 h-6 w-6 text-accent/20" />
              <p className="mb-6 text-sm leading-relaxed text-text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[i % avatarColors.length]}`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-text-subtle">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
