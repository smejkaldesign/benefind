"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Globe,
  Users,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  {
    id: "ai-screening",
    label: "AI-Powered Screening",
    description:
      "Our AI asks simple questions and matches you against 80+ programs instantly.",
    icon: Sparkles,
  },
  {
    id: "plain-language",
    label: "Plain Language",
    description:
      "No government jargon. Every program explained in words you understand.",
    icon: MessageSquare,
  },
  {
    id: "multilingual",
    label: "Multilingual",
    description:
      "Available in English, Spanish, Chinese, Vietnamese, and Arabic. Every program explanation, every result, every next step, all translated.",
    icon: Globe,
  },
  {
    id: "people-companies",
    label: "For People & Companies",
    description:
      "Individuals find personal benefits like SNAP and Medicaid. Companies find grants, tax credits, and incentives like R&D and SBIR.",
    icon: Users,
  },
];

function VideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-border bg-surface-bright">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand/5" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <button
          type="button"
          className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 backdrop-blur transition hover:bg-accent/30"
          aria-label="Play demo video"
        >
          <Play className="ml-1 h-8 w-8 text-accent" fill="currentColor" />
        </button>
        <p className="text-sm text-text-subtle">Demo coming soon</p>
      </div>
    </div>
  );
}

export function BentoGrid() {
  const [activeTab, setActiveTab] = useState(tabs[0]!.id);
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0]!;

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

        {/* Mobile: pill tabs */}
        <div
          className="mb-6 flex gap-2 overflow-x-auto pb-2 sm:hidden"
          role="tablist"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-accent bg-surface-bright text-text"
                    : "border-border bg-surface text-text-muted hover:border-accent/30"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Mobile: video + description */}
        <div className="sm:hidden">
          <VideoPlaceholder />
          <AnimatePresence mode="wait">
            <motion.p
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 text-sm text-text-muted"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Desktop: side-by-side accordion + video */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden gap-8 sm:flex lg:gap-12"
        >
          {/* Left: accordion tabs */}
          <div className="flex w-2/5 flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative rounded-[10px] border p-5 text-left transition ${
                    isActive
                      ? "border-border bg-surface-bright"
                      : "border-transparent hover:border-border/50 hover:bg-surface-dim"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition ${
                      isActive ? "bg-accent" : "bg-transparent"
                    }`}
                  />
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-5 w-5 transition ${
                        isActive
                          ? "text-accent"
                          : "text-text-subtle group-hover:text-text-muted"
                      }`}
                    />
                    <span className="font-semibold text-text">
                      {tab.label}
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-3 overflow-hidden text-sm leading-relaxed text-text-muted"
                      >
                        {tab.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right: video placeholder */}
          <div className="w-3/5">
            <VideoPlaceholder />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
