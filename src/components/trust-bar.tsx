"use client";

import { Shield, Map, DollarSign, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const statIcons = [DollarSign, Map, Shield, Lock];

export function TrustBar() {
  const { t } = useI18n();
  return (
    <div className="border-b border-border bg-surface-dim px-6 py-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 sm:gap-10">
        {t.marketing.trustBar.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <div key={i} className="flex items-center gap-2.5">
              <Icon
                className="h-4 w-4 shrink-0 text-brand"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-text">
                  {stat.value}
                </span>
                <span className="text-xs text-text-subtle">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
