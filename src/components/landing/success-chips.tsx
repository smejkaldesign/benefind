"use client";

const chips = [
  { emoji: "🍎", text: "Maria saved $340/mo on groceries" },
  { emoji: "🔥", text: "James got $2,400 in heating assistance" },
  { emoji: "🚀", text: "TechStart Inc. received $150K SBIR grant" },
  { emoji: "💊", text: "Sarah qualified for free healthcare" },
  { emoji: "🌱", text: "GreenBuild Co. saved $45K in clean energy credits" },
  { emoji: "💰", text: "David found $8,200 in annual benefits" },
  { emoji: "🎯", text: "Acme Logistics got $12K workforce training grant" },
  { emoji: "🎓", text: "Lin received a $6,500 Pell Grant" },
];

function ChipRow({ direction }: { direction: "left" | "right" }) {
  const doubled = [...chips, ...chips];

  return (
    <div className="relative overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface to-transparent" />

      <div
        className="flex w-max gap-3"
        style={{
          animation: `chip-scroll 30s linear infinite${direction === "right" ? " reverse" : ""}`,
        }}
      >
        {doubled.map((chip, i) => (
          <div
            key={`${chip.text}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-[50px] border border-border bg-surface-bright px-4 py-2"
          >
            <span className="text-base">{chip.emoji}</span>
            <span className="whitespace-nowrap text-sm text-text-muted">
              {chip.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuccessChips() {
  return (
    <section className="w-full py-12">
      <div className="flex flex-col gap-3">
        <ChipRow direction="left" />
        <ChipRow direction="right" />
      </div>
    </section>
  );
}
