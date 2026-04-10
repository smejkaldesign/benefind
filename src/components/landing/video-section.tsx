"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, User, Building2, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  {
    id: "individuals",
    label: "Individuals",
    description:
      "Answer a few simple questions about your household, income, and needs. Benefind instantly matches you with programs like SNAP, Medicaid, housing assistance, and more.",
    icon: User,
  },
  {
    id: "companies",
    label: "Companies",
    description:
      "Tell us about your business, industry, and goals. We scan 20+ federal and state programs for grants, tax credits, incentives, and contracting preferences.",
    icon: Building2,
  },
  {
    id: "multilingual",
    label: "Multilingual",
    description:
      "Complete the entire screening in your preferred language. Every program explanation, every result, every next step, all translated.",
    icon: Languages,
  },
];

function VideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-border bg-surface-bright">
      {/* Subtle gradient overlay */}
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

export function VideoSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-medium text-text sm:text-5xl"
          >
            See It In Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-text-muted"
          >
            Watch how Benefind finds benefits in minutes, not hours
          </motion.p>
        </div>

        {/* Mobile: horizontal scrollable pills */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 sm:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
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

        {/* Mobile: video placeholder */}
        <div className="sm:hidden">
          <VideoPlaceholder />
          <AnimatePresence mode="wait">
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-4 text-sm text-text-muted"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Desktop: side-by-side layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden gap-8 sm:flex lg:gap-12"
        >
          {/* Left: tab buttons (40%) */}
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
                  {/* Accent left bar */}
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition ${
                      isActive ? "bg-accent" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-5 w-5 transition ${
                        isActive ? "text-accent" : "text-text-subtle group-hover:text-text-muted"
                      }`}
                    />
                    <span className="font-semibold text-text">{tab.label}</span>
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

          {/* Right: video placeholder (60%) */}
          <div className="w-3/5">
            <VideoPlaceholder />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
