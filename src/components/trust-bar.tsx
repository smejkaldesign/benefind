import { Shield, Map, DollarSign, Lock } from "lucide-react";

interface TrustStat {
  icon: React.ElementType;
  value: string;
  label: string;
}

const stats: TrustStat[] = [
  { icon: DollarSign, value: "80+ Programs", label: "Federal and state" },
  { icon: Map, value: "50 States", label: "All US coverage" },
  { icon: Shield, value: "100% Free", label: "No fees, ever" },
  { icon: Lock, value: "Private by Design", label: "No tracking" },
];

export function TrustBar() {
  return (
    <div className="border-b border-border bg-surface-dim px-6 py-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 sm:gap-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.value} className="flex items-center gap-2.5">
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
