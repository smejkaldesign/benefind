"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { BorderGlow } from "@/components/border-glow";
import { useI18n } from "@/lib/i18n/context";

const statIcons: LucideIcon[] = [TrendingUp, Clock, DollarSign];

export function StatsStrip() {
  const { t } = useI18n();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Default to dark on SSR to match defaultTheme="dark" and avoid hydration mismatch
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section className="px-6 pb-20 pt-[180px] sm:pb-28 sm:pt-[212px]">
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-6 sm:grid-cols-3">
        {t.marketing.stats.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <motion.div
              key={i}
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
                  <Icon className="absolute end-6 top-6 h-5 w-5 text-accent opacity-50" />
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
