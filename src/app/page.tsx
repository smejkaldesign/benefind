'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  FileCheck,
  Lock,
  Zap,
  MessageSquare,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Shield,
  DollarSign,
  Users,
  Quote,
  Code,
} from 'lucide-react';
import { LandingNav } from '@/components/landing-nav';
import { useI18n } from '@/lib/i18n/context';

const PROGRAMS = [
  { name: 'SNAP', emoji: '🍎' },
  { name: 'Medicaid', emoji: '💊' },
  { name: 'WIC', emoji: '🍼' },
  { name: 'CHIP', emoji: '👶' },
  { name: 'SSI', emoji: '💵' },
  { name: 'SSDI', emoji: '🏥' },
  { name: 'Section 8', emoji: '🏠' },
  { name: 'LIHEAP', emoji: '🔥' },
  { name: 'Pell Grant', emoji: '🎓' },
  { name: 'EITC', emoji: '💰' },
  { name: 'R&D Tax Credit', emoji: '🔬' },
  { name: 'SBIR Grants', emoji: '🚀' },
  { name: 'WOTC', emoji: '👥' },
  { name: 'Workforce Training', emoji: '🎯' },
];

// TODO: These need i18n keys added to the translation files
const PAIN_POINTS = [
  {
    stat: '$80B+',
    label: 'Unclaimed Every Year',
    desc: 'Millions of eligible Americans miss out simply because they don\'t know what\'s available.',
    icon: DollarSign,
  },
  {
    stat: '45+ min',
    label: 'Per Application',
    desc: 'Long forms, confusing questions, and government jargon stop people before they even start.',
    icon: FileCheck,
  },
  {
    stat: '1 in 3',
    label: 'Never Apply',
    desc: 'Not because they don\'t need help, but because the process feels impossible.',
    icon: Users,
  },
];

// TODO: These need i18n keys added to the translation files
const TRUST_POINTS = [
  {
    title: 'Stored on Your Device',
    desc: 'Your screening answers stay on your device and are never sent to our servers. We can\'t see them, even if we wanted to.',
    icon: Lock,
  },
  {
    title: 'We Never Sell Your Data',
    desc: 'Not to advertisers. Not to data brokers. Not to anyone, ever. That\'s a promise.',
    icon: Shield,
  },
  {
    title: 'Open Source and Transparent',
    desc: 'Our code is public. Anyone can inspect how Benefind works. No black boxes, no hidden tricks.',
    icon: Code,
  },
];

// TODO: These need i18n keys added to the translation files
const TESTIMONIALS = [
  {
    quote: 'I had no idea I qualified for SNAP and LIHEAP. That\'s an extra $400 a month I was leaving on the table.',
    name: 'Maria G.',
    location: 'Houston, TX',
    initials: 'MG',
    color: 'bg-emerald-500',
  },
  {
    quote: 'I\'m a single dad and the forms always overwhelmed me. Benefind walked me through it like a friend would. My kids are on CHIP now.',
    name: 'James R.',
    location: 'Atlanta, GA',
    initials: 'JR',
    color: 'bg-sky-500',
  },
  {
    quote: 'My mom only speaks Vietnamese. She was able to use Benefind in her language and found out she qualifies for Medicaid.',
    name: 'Linh T.',
    location: 'San Jose, CA',
    initials: 'LT',
    color: 'bg-amber-500',
  },
  {
    quote: 'I\'m a college student working part-time. I didn\'t think I qualified for anything. Turns out I\'m eligible for SNAP and a Pell Grant.',
    name: 'Devon W.',
    location: 'Chicago, IL',
    initials: 'DW',
    color: 'bg-violet-500',
  },
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
    <main className="flex min-h-dvh flex-col bg-white dark:bg-zinc-950">
      <LandingNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24 sm:pt-48 sm:pb-32">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-48 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-emerald-500/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.12] px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-500">
              <Sparkles className="h-3 w-3" />
              {t.landing.badge}
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.landing.heroTitle1}{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              {t.landing.heroTitle2}
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-500 dark:text-zinc-400 sm:text-lg"
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
              href="/get-started"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-500 px-7 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              {t.landing.heroCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-gray-300 dark:border-zinc-700 px-6 text-base font-medium text-gray-600 dark:text-zinc-300 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              {t.landing.heroSecondaryCta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Programs Marquee ─────────────────────────────────── */}
      <section className="overflow-hidden border-y border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 py-6 sm:py-8">
        <p className="mb-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
          {t.landing.programsLabel}
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-50 dark:from-zinc-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-50 dark:from-zinc-900 to-transparent" />
          <div
            className="flex gap-10 sm:gap-14"
            style={{
              width: 'max-content',
              animation: 'marquee 35s linear infinite',
            }}
          >
            {Array.from({ length: 3 }, (_, copy) =>
              PROGRAMS.map((p, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="shrink-0 text-base font-medium text-gray-500/60 dark:text-zinc-400/60"
                >
                  <span aria-hidden="true">{p.emoji}</span> {p.name}
                </span>
              )),
            ).flat()}
          </div>
        </div>
      </section>

      {/* ── Problem Section ────────────────────────────────────── */}
      {/* TODO: Hardcoded English text below needs i18n keys */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
              Billions in Benefits Go Unclaimed Every Year
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-zinc-400">
              The system is confusing. We made it simple.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {PAIN_POINTS.map(({ stat, label, desc, icon: Icon }) => (
              <motion.div
                key={stat}
                className="rounded-2xl border border-gray-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-8 transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/[0.12]">
                  <Icon className="h-6 w-6 text-emerald-500" />
                </div>
                <p className="mt-6 text-3xl font-extrabold text-emerald-500 sm:text-4xl">
                  {stat}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-zinc-50">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="bg-gray-50/50 dark:bg-zinc-900/50 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">
              {t.landing.howTitle}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-zinc-400">{t.landing.howSubtitle}</p>
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
                className="relative rounded-2xl border border-gray-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-8 transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <span className="text-6xl font-black text-emerald-500/10">
                  {num}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/[0.12]">
                    <Icon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-50">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Impact / Stats ───────────────────────────────────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">
              {t.landing.impactTitle}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-zinc-400">
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
                <p className="text-3xl font-extrabold text-emerald-500 sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trust Section ──────────────────────────────────────── */}
      {/* TODO: Hardcoded English text below needs i18n keys */}
      <section className="bg-gray-50/50 dark:bg-zinc-900/50 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">
              Your Data Stays Yours
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-zinc-400">
              Private by design. We built Benefind to protect you, not profit from you.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {TRUST_POINTS.map(({ title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                className="rounded-2xl border border-gray-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-8 transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/[0.12]">
                  <Icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-zinc-50">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      {/* TODO: Hardcoded English text below needs i18n keys */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">
              Real Stories, Real Impact
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-zinc-400">
              People just like you are finding benefits they never knew they had.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {TESTIMONIALS.map(({ quote, name, location, initials, color }) => (
              <motion.div
                key={name}
                className="rounded-2xl border border-gray-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-8 transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Quote className="h-8 w-8 text-emerald-500/30" />
                <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-zinc-300">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{name}</p>
                    <p className="text-xs text-gray-400 dark:text-zinc-500">{location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-gray-50/50 dark:bg-zinc-900/50 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">
              {t.landing.faqTitle}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-zinc-400">{t.landing.faqSubtitle}</p>
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
                className="border-b border-gray-200 dark:border-zinc-800 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between py-5 text-start active:opacity-70"
                >
                  <span className="pr-4 font-medium text-gray-900 dark:text-zinc-50">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-400 dark:text-zinc-500 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
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
                      <p className="pb-5 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
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

      {/* ── Final CTA ──────────────────────────────────────────── */}
      {/* TODO: Hardcoded English text below needs i18n keys */}
      <section className="px-4 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-3xl rounded-3xl border border-gray-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 px-6 py-12 text-center sm:px-16 sm:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 sm:text-4xl">
            You Could Be Leaving Thousands on the Table
          </h2>
          <p className="mt-4 text-gray-500 dark:text-zinc-400">
            Individuals and companies alike qualify for programs they never claim. Whether it&apos;s personal benefits or business grants, there&apos;s only one way to find out.
          </p>
          <Link
            href="/get-started"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-500 px-7 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            Start Your Free Screening
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-gray-400 dark:text-zinc-500">
            Free. 5 minutes. No signup required. 100% private.
          </p>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-lg font-bold text-emerald-500">
                {t.common.appName}
              </span>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
                {t.landing.footerTagline}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {t.landing.footerProduct}
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/screening"
                    className="text-sm text-gray-500 dark:text-zinc-400 transition-colors hover:text-emerald-500"
                  >
                    {t.landing.footerScreening}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/screening/company"
                    className="text-sm text-gray-500 dark:text-zinc-400 transition-colors hover:text-emerald-500"
                  >
                    Company Grants
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-gray-500 dark:text-zinc-400 transition-colors hover:text-emerald-500"
                  >
                    {t.landing.footerHowItWorks}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {t.landing.footerLegal}
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-500 dark:text-zinc-400 transition-colors hover:text-emerald-500"
                  >
                    {t.landing.footerPrivacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-500 dark:text-zinc-400 transition-colors hover:text-emerald-500"
                  >
                    {t.landing.footerTerms}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {t.landing.footerLanguages}
              </h4>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-gray-500 dark:text-zinc-400">English</li>
                <li className="text-sm text-gray-500 dark:text-zinc-400">Español</li>
                <li className="text-sm text-gray-500 dark:text-zinc-400">中文</li>
                <li className="text-sm text-gray-500 dark:text-zinc-400">Tiếng Việt</li>
                <li className="text-sm text-gray-500 dark:text-zinc-400">العربية</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 dark:border-zinc-800 pt-6 text-center text-sm text-gray-400 dark:text-zinc-500">
            <p>
              &copy; {new Date().getFullYear()} {t.common.appName}.{' '}
              {t.common.free}
            </p>
            <p className="mt-1 text-gray-400 dark:text-zinc-600">
              Built by Smejkal Design
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
