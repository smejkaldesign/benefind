"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Globe, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind col-span class for desktop grid */
  span: string;
  accentColor: "brand" | "accent";
}

const features: Feature[] = [
  {
    title: "AI-Powered Screening",
    description:
      "Our AI asks simple questions and matches you against 80+ programs instantly",
    icon: Sparkles,
    span: "sm:col-span-1",
    accentColor: "accent",
  },
  {
    title: "Plain Language",
    description:
      "No government jargon. Every program explained in words you understand",
    icon: MessageSquare,
    span: "sm:col-span-1",
    accentColor: "brand",
  },
  {
    title: "Multilingual",
    description:
      "Available in English, Spanish, Chinese, Vietnamese, and Arabic",
    icon: Globe,
    span: "sm:col-span-1",
    accentColor: "brand",
  },
  {
    title: "For People & Companies",
    description:
      "Individuals find benefits. Companies find grants, tax credits, and incentives",
    icon: Users,
    span: "sm:col-span-1",
    accentColor: "accent",
  },
];

export function BentoGrid() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-semibold text-text sm:text-4xl lg:text-5xl"
          >
            How Benefind Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-text-muted sm:text-lg"
          >
            A smarter way to find every benefit you qualify for
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const iconBg =
              feature.accentColor === "brand" ? "bg-brand/10" : "bg-accent/10";
            const iconText =
              feature.accentColor === "brand" ? "text-brand" : "text-accent";

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-[16px] border border-border bg-surface-bright p-6 transition hover:border-accent/20 sm:p-8 ${feature.span}`}
              >
                {/* Left accent divider matching icon color */}
                <div
                  className={`pointer-events-none absolute inset-y-0 left-0 w-[2px] opacity-60 ${
                    feature.accentColor === "brand"
                      ? "bg-brand"
                      : "bg-gradient-to-b from-accent to-accent-end"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[10px] ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconText}`} />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
