"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Building2, ArrowRight } from "lucide-react";
import { LandingNav } from "@/components/landing-nav";
import { Grainient } from "@/components/grainient";
import { SuccessChips } from "@/components/landing/success-chips";
import { StatsStrip } from "@/components/landing/stats-strip";
import { BentoGrid } from "@/components/landing/bento-grid";
import { Testimonial7 } from "@/components/testimonial7";
import { GetStartedCTA } from "@/components/landing/get-started-cta";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n/context";

export default function Home() {
  const { t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t.landing.faq1Q, a: t.landing.faq1A },
    { q: t.landing.faq2Q, a: t.landing.faq2A },
    { q: t.landing.faq3Q, a: t.landing.faq3A },
    { q: t.landing.faq4Q, a: t.landing.faq4A },
    { q: t.landing.faq5Q, a: t.landing.faq5A },
    { q: t.landing.faq6Q, a: t.landing.faq6A },
  ];

  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <LandingNav />

      {/* ── Hero with Vanta.js Clouds (Oz-style container) ──── */}
      <section className="relative pt-[76px]">
        {/* Dark edge gradients — width matches gap between hero container and viewport edge */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[calc((100vw-1600px)/2)] min-w-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-surface) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[calc((100vw-1600px)/2)] min-w-0"
          style={{
            background:
              "linear-gradient(to left, var(--color-surface) 0%, transparent 100%)",
          }}
        />
        <div
          className="relative mx-auto max-w-[1600px] overflow-hidden rounded-t-[20px]"
          style={{
            height: "clamp(805px, 80vh, 1035px)",
            backgroundColor: "#5227FF",
          }}
        >
          {/* Grainient gradient background — dark anchored at top, pink pushed lower */}
          <div className="absolute inset-0">
            <Grainient
              color1="#FF9FFC"
              color2="#5227FF"
              color3="#B19EEF"
              timeSpeed={0.25}
              rotationAmount={120}
              centerY={-0.25}
              colorBalance={0.15}
            />
          </div>
          {/* Dark vignette behind hero text — top fade for legibility */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(20,10,40,0.55) 0%, rgba(20,10,40,0.35) 40%, transparent 100%)",
            }}
          />
          {/* Inner wrapper to keep children rendering above grainient */}
          <div className="absolute inset-0">
            {/* Hero text — lowered ~40px */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-32 sm:pt-40">
              <motion.h1
                className="max-w-[900px] text-center font-display text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl lg:text-[64px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t.landing.heroTitle1}
              </motion.h1>

              <motion.p
                className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/80 sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t.landing.heroSubtitle}
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col items-center gap-3 sm:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/screening"
                  className="group inline-flex h-[52px] items-center gap-2 rounded-lg border border-surface/20 bg-white px-6 text-sm font-semibold text-surface shadow-sm transition-all hover:bg-white/95"
                >
                  <User className="h-4 w-4" />
                  Personal Benefits
                  <ArrowRight className="h-4 w-4 max-w-0 -translate-x-2 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[16px] group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
                <Link
                  href="/screening/company"
                  className="group inline-flex h-[52px] items-center gap-2 rounded-lg border border-surface/20 bg-white px-6 text-sm font-semibold text-surface transition-colors hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <Building2 className="h-4 w-4" />
                  Business Benefits
                  <ArrowRight className="h-4 w-4 max-w-0 -translate-x-2 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[16px] group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Simple gradient fade to dark at bottom */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-[12] h-[45%]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(18,18,18,0.3) 40%, rgba(18,18,18,0.7) 70%, #121212 100%)",
            }}
          />
        </div>

        {/* Scrolling chips — full viewport width, on top of everything */}
        <SuccessChips />
      </section>

      {/* ── Stats Strip ──────────────────────────────────────── */}
      <StatsStrip />

      {/* ── Bento Feature Grid ───────────────────────────────── */}
      <div id="how-it-works">
        <BentoGrid />
      </div>

      {/* ── Testimonials (full-bleed auto-scrolling carousels) ── */}
      <Testimonial7 />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl">
              {t.landing.faqTitle}
            </h2>
            <p className="mt-3 text-text-muted">{t.landing.faqSubtitle}</p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  aria-label={`${faq.q} — ${openFaq === i ? "collapse" : "expand"} answer`}
                  className="flex w-full items-center justify-between py-5 text-start active:opacity-70"
                >
                  <span className="pr-4 font-medium text-text">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-subtle transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Get Started CTA ─────────────────────────────────── */}
      <GetStartedCTA />

      {/* ── Footer ───────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
