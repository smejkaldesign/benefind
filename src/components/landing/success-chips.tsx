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

export function SuccessChips() {
  // Duplicate for seamless infinite scroll
  const doubled = [...chips, ...chips];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 overflow-hidden sm:bottom-24">
      {/* Left/right fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#8b9fd4]/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#8b9fd4]/80 to-transparent" />

      <div
        className="flex w-max gap-4"
        style={{
          animation: "chip-scroll 40s linear infinite",
        }}
      >
        {doubled.map((chip, i) => (
          <div
            key={`${chip.text}-${i}`}
            className="flex shrink-0 items-center gap-2.5 rounded-[16px] border border-white/30 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm"
          >
            <span className="text-base">{chip.emoji}</span>
            <span className="whitespace-nowrap text-sm font-medium text-surface">
              {chip.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
