"use client";

const ROW_1 = [
  { emoji: "🍎", text: "Maria saved $340/mo on groceries" },
  { emoji: "🚀", text: "TechStart Inc. received $150K SBIR grant" },
  { emoji: "🌱", text: "GreenBuild Co. saved $45K in clean energy credits" },
  { emoji: "🎓", text: "Lin received a $6,500 Pell Grant" },
];

const ROW_2 = [
  { emoji: "💊", text: "Sarah qualified for free healthcare" },
  { emoji: "🎯", text: "Acme Logistics got $12K workforce training grant" },
  { emoji: "🔥", text: "James got $2,400 in heating assistance" },
];

const ROW_3 = [
  { emoji: "💰", text: "David found $8,200 in annual benefits" },
  { emoji: "🚀", text: "Nova Labs received $200K R&D tax credit" },
  { emoji: "🏠", text: "Rosa found Section 8 housing assistance" },
  { emoji: "🎯", text: "Bright Path got $18K workforce grant" },
];

function ChipRow({
  chips,
  speed,
  offset,
}: {
  chips: { emoji: string; text: string }[];
  speed: number;
  offset?: string;
}) {
  const doubled = [...chips, ...chips];

  return (
    <div
      className="flex w-max gap-4"
      style={{
        animation: `chip-scroll ${speed}s linear infinite`,
        marginLeft: offset,
      }}
    >
      {doubled.map((chip, i) => (
        <div
          key={`${chip.text}-${i}`}
          className="flex shrink-0 items-center gap-2.5 rounded-[16px] border border-white/30 bg-white/75 px-4 py-2.5 shadow-sm backdrop-blur-sm"
        >
          <span className="text-base">{chip.emoji}</span>
          <span className="whitespace-nowrap text-sm font-medium text-surface">
            {chip.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SuccessChips() {
  return (
    <div className="pointer-events-none absolute bottom-[100px] left-0 right-0 z-10 overflow-hidden sm:bottom-[140px]">
      {/* Left/right viewport edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface to-transparent sm:w-32" />

      <div className="flex flex-col gap-4">
        <ChipRow chips={ROW_1} speed={35} />
        <ChipRow chips={ROW_2} speed={42} offset="-120px" />
        <ChipRow chips={ROW_3} speed={38} offset="-240px" />
      </div>
    </div>
  );
}
