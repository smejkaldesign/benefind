'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { LandingNav } from '@/components/landing-nav';
import { VantaClouds } from '@/components/vanta-clouds';
import { SuccessChips } from '@/components/landing/success-chips';
import { StatsStrip } from '@/components/landing/stats-strip';
import { BentoGrid } from '@/components/landing/bento-grid';
import { VideoSection } from '@/components/landing/video-section';
import { TrustSection } from '@/components/landing/trust-section';
import { GetStartedCTA } from '@/components/landing/get-started-cta';
import { useI18n } from '@/lib/i18n/context';

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

      {/* ── Hero with Vanta.js Clouds ─────────────────────────── */}
      <section className="relative">
        <VantaClouds className="min-h-[700px] overflow-hidden rounded-b-[20px] sm:min-h-[800px]">
          <div className="relative z-10 flex min-h-[700px] flex-col items-center justify-center px-4 pt-32 pb-24 sm:min-h-[800px] sm:pt-48 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-[50px] border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                {t.landing.badge}
              </span>
            </motion.div>

            <motion.h1
              className="mt-8 max-w-4xl text-center font-display text-4xl leading-[1.05] font-medium tracking-tight text-text sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.landing.heroTitle1}{' '}
              <span className="bg-gradient-to-b from-accent to-accent-end bg-clip-text text-transparent">
                {t.landing.heroTitle2}
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-text-muted sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.landing.heroSubtitle}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/get-started"
                className="group inline-flex h-12 items-center gap-2 rounded-[50px] bg-brand px-8 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30"
              >
                {t.landing.heroCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex h-12 items-center gap-2 rounded-[50px] border border-white/30 px-6 text-base font-medium text-text backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                {t.landing.heroSecondaryCta}
              </Link>
            </motion.div>
          </div>

          {/* Dither fade to blend hero into page background */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40 bg-gradient-to-b from-transparent to-surface" />
        </VantaClouds>
      </section>

      {/* ── Success Story Chips ───────────────────────────────── */}
      <SuccessChips />

      {/* ── Stats Strip ──────────────────────────────────────── */}
      <StatsStrip />

      {/* ── Bento Feature Grid ───────────────────────────────── */}
      <div id="how-it-works">
        <BentoGrid />
      </div>

      {/* ── Video Section ────────────────────────────────────── */}
      <div className="bg-surface-dim">
        <VideoSection />
      </div>

      {/* ── Trust + Testimonials ────────────────────────────── */}
      <TrustSection />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
              {t.landing.faqTitle}
            </h2>
            <p className="mt-3 text-text-muted">{t.landing.faqSubtitle}</p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between py-5 text-start active:opacity-70"
                >
                  <span className="pr-4 font-medium text-text">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-subtle transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-text-muted">{faq.a}</p>
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
      <footer className="border-t border-border px-4 py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-lg font-bold text-brand">{t.common.appName}</span>
              <p className="mt-2 text-sm text-text-muted">{t.landing.footerTagline}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                {t.landing.footerProduct}
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/screening" className="text-sm text-text-muted transition-colors hover:text-brand">
                    {t.landing.footerScreening}
                  </Link>
                </li>
                <li>
                  <Link href="/screening/company" className="text-sm text-text-muted transition-colors hover:text-brand">
                    {t.landing.footerCompanyGrants}
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-sm text-text-muted transition-colors hover:text-brand">
                    {t.landing.footerHowItWorks}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                {t.landing.footerLegal}
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-text-muted transition-colors hover:text-brand">
                    {t.landing.footerPrivacy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-text-muted transition-colors hover:text-brand">
                    {t.landing.footerTerms}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                {t.landing.footerLanguages}
              </h4>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-text-muted">English</li>
                <li className="text-sm text-text-muted">Español</li>
                <li className="text-sm text-text-muted">中文</li>
                <li className="text-sm text-text-muted">Tiếng Việt</li>
                <li className="text-sm text-text-muted">العربية</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-subtle">
            <p>&copy; {new Date().getFullYear()} {t.common.appName}. {t.common.free}</p>
            <p className="mt-1 text-text-subtle/60">Built by Smejkal Design</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
