"use client";

import { motion } from "framer-motion";
import { User, Building2, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    icon: User,
    headline: "Find Your Benefits",
    bullets: [
      "Answer simple questions about your household",
      "Get matched with 80+ federal and state programs",
      "See estimated amounts and how to apply",
    ],
    cta: "Start Screening",
    href: "/screening",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    buttonClass: "bg-brand text-white hover:bg-brand/90",
  },
  {
    icon: Building2,
    headline: "Find Grants & Credits",
    bullets: [
      "3-minute company profile",
      "Scan grants, tax credits, and incentives",
      "Get match scores and application links",
    ],
    cta: "Company Screening",
    href: "/screening/company",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    buttonClass: "bg-brand text-white hover:bg-brand/90",
  },
  {
    icon: MessageCircle,
    headline: "Need Help?",
    bullets: [
      "Not sure which path is right?",
      "Have questions about a specific program?",
      "Want to integrate Benefind for your community?",
    ],
    cta: "Contact Us",
    href: "/contact",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    buttonClass:
      "border border-border text-text hover:border-accent bg-transparent",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function GetStartedCTA() {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl text-text sm:text-5xl">
            Get Started
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Choose the path that fits you
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.cta}
                variants={cardVariants}
                className="flex flex-col rounded-[20px] border border-border bg-surface-bright p-8 transition-colors hover:border-accent/20"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] ${card.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>

                <h3 className="font-display text-xl text-text">
                  {card.headline}
                </h3>

                <ul className="mt-5 space-y-3">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span className="text-sm text-text-muted">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.href}
                  className={`mt-auto inline-flex items-center justify-center rounded-[50px] px-6 py-3 text-sm font-medium transition-colors ${card.buttonClass} mt-8`}
                >
                  {card.cta}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
