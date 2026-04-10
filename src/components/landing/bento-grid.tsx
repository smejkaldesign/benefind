"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Globe, Users, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MagicBento, MagicBentoCard } from "@/components/magic-bento";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "AI-Powered Screening",
    description:
      "Our AI asks simple questions and matches you against 80+ programs instantly.",
    icon: Sparkles,
  },
  {
    title: "Plain Language",
    description:
      "No government jargon. Every program explained in words you understand.",
    icon: MessageSquare,
  },
  {
    title: "Multilingual",
    description:
      "Available in English, Spanish, Chinese, Vietnamese, and Arabic. Every program explanation, every result, every next step, all translated.",
    icon: Globe,
  },
  {
    title: "For People & Companies",
    description:
      "Individuals find personal benefits like SNAP and Medicaid. Companies find grants, tax credits, and incentives like R&D and SBIR.",
    icon: Users,
  },
];

export function BentoGrid() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1520px]">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-semibold text-text sm:text-4xl lg:text-5xl"
          >
            How Benefind Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-text-muted sm:text-lg"
          >
            A smarter way to find every benefit you qualify for
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <MagicBento
            glowColor="202, 177, 247"
            spotlightRadius={350}
            enableSpotlight
          >
            {/* Big square: video card */}
            <MagicBentoCard className="magic-bento-span-2-col magic-bento-span-2-row">
              <div className="relative flex h-full min-h-[380px] w-full items-center justify-center bg-gradient-to-br from-brand/10 via-transparent to-brand-dark/10">
                <button
                  type="button"
                  aria-label="Play demo video"
                  className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20"
                >
                  <span className="absolute inset-0 rounded-full ring-1 ring-white/20" />
                  <Play
                    className="ml-1 h-10 w-10 text-white"
                    fill="currentColor"
                  />
                </button>
                <p className="absolute bottom-6 left-6 text-sm text-text-subtle">
                  Demo coming soon
                </p>
              </div>
            </MagicBentoCard>

            {/* 4 feature cards */}
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <MagicBentoCard key={feature.title}>
                  <div className="flex h-full flex-col justify-between p-6">
                    <Icon className="h-6 w-6 text-accent" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-text">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MagicBentoCard>
              );
            })}
          </MagicBento>
        </motion.div>
      </div>
    </section>
  );
}
