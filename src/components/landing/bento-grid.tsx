"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Users, Lock, Play, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { BorderGlow } from "@/components/border-glow";
import "@/components/magic-bento.css";
import { useI18n } from "@/lib/i18n/context";

const featureMeta: { icon: LucideIcon; span?: string }[] = [
  { icon: Sparkles },
  { icon: MessageSquare, span: "magic-bento-span-2-col" },
  { icon: Users, span: "magic-bento-span-2-col" },
  { icon: Lock },
];

export function BentoGrid() {
  const { t } = useI18n();
  const tb = t.marketing.bento;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Match the StatsStrip BorderGlow palette so the bento reads as a continuation
  // of the "top callouts" above it. Theme-aware for light/dark.
  const glowProps = {
    backgroundColor: isDark ? "#1A1A1A" : "#F8F8F7",
    borderRadius: 16,
    glowColor: "270 80 80",
    colors: isDark
      ? ["#CAB1F7", "#DEB0F7", "#B19EEF"]
      : ["#9B7DD4", "#B794F6", "#7C5DB8"],
  };
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
            {tb.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-text-muted sm:text-lg"
          >
            {tb.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="magic-bento-grid"
        >
          {/* Video card — poster only, opens lightbox on click */}
          <BorderGlow {...glowProps} className="magic-bento-span-2-row">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative h-full min-h-[380px] w-full cursor-pointer overflow-hidden rounded-[15px] bg-gradient-to-br from-brand/20 via-surface-bright to-brand-dark/20"
              aria-label={tb.playDemo}
            >
              {/* Poster image */}
              <img
                src="/video/benefind-demo-poster.jpg"
                alt={tb.posterAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Soft overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
                  <Play
                    className="ml-1 h-7 w-7 text-white"
                    fill="currentColor"
                  />
                </div>
              </div>
              {/* Badge */}
              <div className="pointer-events-none absolute start-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Play className="h-3 w-3" fill="currentColor" />
                {tb.walkthrough}
              </div>
              {/* Bottom text */}
              <div className="pointer-events-none absolute start-5 end-5 bottom-5">
                <p className="font-display text-xl font-semibold text-white">
                  {tb.seeInAction}
                </p>
                <p className="mt-1 text-xs text-white/80">
                  {tb.seeInActionDesc}
                </p>
              </div>
            </button>
          </BorderGlow>

          {/* Lightbox video player */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label={tb.videoPlayer}
            >
              <div
                className="relative w-full max-w-4xl px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute -top-10 end-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label={tb.closeVideo}
                >
                  <X className="h-5 w-5" />
                </button>
                <video
                  ref={videoRef}
                  className="w-full rounded-lg"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src="/video/benefind-demo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}

          {/* 4 feature cards with varying widths */}
          {tb.features.map((feature, i) => {
            const Icon = featureMeta[i].icon;
            return (
              <BorderGlow
                key={feature.title}
                {...glowProps}
                className={featureMeta[i].span}
              >
                <div className="flex h-full min-h-[180px] flex-col justify-between p-6">
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
              </BorderGlow>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
