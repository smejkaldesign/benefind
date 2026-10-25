"use client";

import { motion } from "framer-motion";
import { User, Building2, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();
  const m = t.marketing.getStartedCta;
  const cards = [
    {
      icon: User,
      headline: t.marketing.forIndividuals,
      bullets: m.individuals.bullets,
      cta: m.individuals.cta,
      href: "/screening",
      iconBg: "bg-brand/10",
      iconColor: "text-brand",
      buttonVariant: "brand" as const,
    },
    {
      icon: Building2,
      headline: t.marketing.forBusinesses,
      bullets: m.businesses.bullets,
      cta: m.businesses.cta,
      href: "/screening/company",
      iconBg: "bg-brand/10",
      iconColor: "text-brand",
      buttonVariant: "brand" as const,
    },
    {
      icon: HelpCircle,
      headline: m.help.headline,
      bullets: m.help.bullets,
      cta: m.help.cta,
      href: "/contact",
      iconBg: "bg-brand/10",
      iconColor: "text-brand",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-[1520px]">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl text-text sm:text-5xl">
            {m.title}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{m.subtitle}</p>
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
              <motion.div key={card.href} variants={cardVariants}>
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
                      nativeButton={false}
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
