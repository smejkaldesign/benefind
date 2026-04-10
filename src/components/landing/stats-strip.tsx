"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  {
    value: "80+",
    label: "Government programs scanned",
    icon: TrendingUp,
  },
  {
    value: "5 min",
    label: "Average screening time",
    icon: Clock,
  },
  {
    value: "$4,200",
    label: "Average annual benefits found",
    icon: DollarSign,
  },
];

export function StatsStrip() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-[16px] border border-border bg-surface-bright p-8 transition hover:border-accent/30"
            >
              <Icon className="absolute right-6 top-6 h-5 w-5 text-accent opacity-50" />
              <p className="font-display text-5xl font-semibold text-text">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
