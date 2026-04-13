"use client";

import { motion } from "framer-motion";
import { User, Building2, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  {
    icon: User,
    headline: "For Individuals",
    bullets: [
      "Answer simple questions about your household",
      "Get matched with 80+ federal and state programs",
      "See estimated amounts and how to apply",
    ],
    cta: "Start Screening",
    href: "/screening",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    buttonVariant: "brand" as const,
  },
  {
    icon: Building2,
    headline: "For Businesses",
    bullets: [
      "3-minute company profile",
      "Scan grants, tax credits, and incentives",
      "Get match scores and application links",
    ],
    cta: "Company Screening",
    href: "/screening/company",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    buttonVariant: "brand" as const,
  },
  {
    icon: HelpCircle,
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
    buttonVariant: "outline" as const,
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function GetStartedCTA() {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-[1520px]">
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
              <motion.div key={card.cta} variants={cardVariants}>
                <Card className="flex h-full flex-col rounded-[20px] border-border bg-surface-dim p-0 shadow-none transition-colors hover:border-accent/20">
                  <CardContent className="flex flex-1 flex-col p-8">
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
                          <span className="text-sm text-text-muted">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={card.buttonVariant}
                      className="mt-6 w-full justify-center text-center"
                      size="lg"
                      render={<Link href={card.href} />}
                    >
                      {card.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
