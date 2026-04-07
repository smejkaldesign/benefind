'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  FileCheck,
  Lock,
  Zap,
  MessageSquare,
  Heart,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { LandingNav } from '@/components/landing-nav';
import { useI18n } from '@/lib/i18n/context';

const PROGRAMS = [
  'SNAP',
  'Medicaid',
  'WIC',
  'CHIP',
  'SSI',
  'SSDI',
  'TANF',
  'Section 8',
  'LIHEAP',
  'Pell Grant',
  'EITC',
  'CCDF',
];

export default function Home() {
  const { t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: t.landing.step1Title,
      desc: t.landing.step1Desc,
      icon: MessageSquare,
    },
    {
      num: '02',
      title: t.landing.step2Title,
      desc: t.landing.step2Desc,
      icon: Zap,
    },
    {
      num: '03',
      title: t.landing.step3Title,
      desc: t.landing.step3Desc,
      icon: CheckCircle2,
    },
  ];

  const features = [
    { title: t.landing.feat1Title, desc: t.landing.feat1Desc, icon: Globe },
    {
      title: t.landing.feat2Title,
      desc: t.landing.feat2Desc,
      icon: FileCheck,
    },
    { title: t.landing.feat3Title, desc: t.landing.feat3Desc, icon: Lock },
    { title: t.landing.feat4Title, desc: t.landing.feat4Desc, icon: Zap },
    {
      title: t.landing.feat5Title,
      desc: t.landing.feat5Desc,
      icon: MessageSquare,
    },
    { title: t.landing.feat6Title, desc: t.landing.feat6Desc, icon: Heart },
  ];

  const stats = [
    { value: t.landing.impact1Value, label: t.landing.impact1Label },
    { value: t.landing.impact2Value, label: t.landing.impact2Label },
    { value: t.landing.impact3Value, label: t.landing.impact3Label },
    { value: t.landing.impact4Value, label: t.landing.impact4Label },
  ];

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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:pt-40 sm:pb-28">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-48 right-1/4 h-96 w-96 rounded-full bg-brand/10 blur-[100px]" />
          <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-brand/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand">
              <Sparkles className="h-3 w-3" />
              {t.landing.badge}
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 text-3xl leading-[1.1] font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.landing.heroTitle1}{' '}
            <span className="bg-gradient-to-r from-brand to-blue-400 bg-clip-text text-transparent">
              {t.landing.heroTitle2}
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.landing.heroSubtitle}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/screening"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-7 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t.landing.heroCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-base font-medium text-text-muted transition-colors hover:text-brand"
            >
              {t.landing.heroSecondaryCta}
            </Link>
          </motion.div>

          <motion.div
            className="mt-14 flex items-center justify-center gap-6 sm:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center">
              <p className="text-xl font-bold text-text sm:text-2xl">50+</p>
              <p className="mt-0.5 text-[0.65rem] text-text-subtle sm:text-xs">
                {t.landing.statPrograms}
              </p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <div className="text-center">
              <p className="text-xl font-bold text-text sm:text-2xl">5</p>
              <p className="mt-0.5 text-[0.65rem] text-text-subtle sm:text-xs">
                {t.landing.statLanguages}
              </p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <div className="text-center">
              <p className="text-xl font-bold text-text sm:text-2xl">~3 min</p>
              <p className="mt-0.5 text-[0.65rem] text-text-subtle sm:text-xs">
                {t.landing.statMinutes}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Programs Marquee ─────────────────────────────────── */}
      <section className="overflow-hidden border-y border-border bg-surface-dim py-6">
        <p className="mb-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-subtle">
          {t.landing.programsLabel}
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface-dim to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface-dim to-transparent" />
          <div
            className="flex gap-8 sm:gap-12"
            style={{
              width: 'max-content',
              animation: 'marquee 35s linear infinite',
            }}
          >
            {Array.from({ length: 3 }, (_, copy) =>
              PROGRAMS.map((p, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="shrink-0 text-sm font-medium text-text-muted/60"
                >
                  {p}
                </span>
              )),
            ).flat()}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {t.landing.howTitle}
            </h2>
            <p className="mt-3 text-text-muted">{t.landing.howSubtitle}</p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {steps.map(({ num, title, desc, icon: Icon }) => (
              <motion.div
                key={num}
                className="relative rounded-2xl border border-border bg-surface p-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <span className="text-5xl font-black text-brand/10">
                  {num}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="bg-surface-dim px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {t.landing.featuresTitle}
            </h2>
            <p className="mt-3 text-text-muted">
              {t.landing.featuresSubtitle}
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {features.map(({ title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                className="rounded-2xl border border-border bg-surface p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-semibold text-text">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Impact / Stats ───────────────────────────────────── */}
      <section className="bg-surface-dark px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text-on-dark sm:text-4xl">
              {t.landing.impactTitle}
            </h2>
            <p className="mt-3 text-text-on-dark-muted">
              {t.landing.impactSubtitle}
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p className="text-3xl font-extrabold text-white sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-sm text-text-on-dark-muted">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
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
              <div
                key={i}
                className="border-b border-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-start active:opacity-70"
                >
                  <span className="pr-4 font-medium text-text">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-subtle transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-4 pb-24 sm:pb-32">
        <motion.div
          className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand to-indigo-600 px-6 py-12 text-center sm:px-16 sm:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.landing.ctaTitle}
          </h2>
          <p className="mt-4 text-blue-100">{t.landing.ctaSubtitle}</p>
          <Link
            href="/screening"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-base font-semibold text-brand shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
          >
            {t.landing.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-blue-200">{t.landing.ctaNote}</p>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-lg font-bold text-brand">
                {t.common.appName}
              </span>
              <p className="mt-2 text-sm text-text-muted">
                {t.landing.footerTagline}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                {t.landing.footerProduct}
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/screening"
                    className="text-sm text-text-muted transition-colors hover:text-brand"
                  >
                    {t.landing.footerScreening}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-text-muted transition-colors hover:text-brand"
                  >
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
                  <Link
                    href="/privacy"
                    className="text-sm text-text-muted transition-colors hover:text-brand"
                  >
                    {t.landing.footerPrivacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-text-muted transition-colors hover:text-brand"
                  >
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
            <p>
              &copy; {new Date().getFullYear()} {t.common.appName}.{' '}
              {t.common.free}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
