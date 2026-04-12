"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { BorderGlow } from "@/components/border-glow";

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="px-6 pb-20 pt-[180px] sm:pb-28 sm:pt-[212px]">
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <BorderGlow
                backgroundColor={isDark ? "#1A1A1A" : "#F8F8F7"}
                borderRadius={16}
                glowColor="270 80 80"
                colors={
                  isDark
                    ? ["#CAB1F7", "#DEB0F7", "#B19EEF"]
                    : ["#9B7DD4", "#B794F6", "#7C5DB8"]
                }
              >
                <div className="relative p-8">
                  <Icon className="absolute right-6 top-6 h-5 w-5 text-accent opacity-50" />
                  <p className="font-display text-5xl font-semibold text-text">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
