"use client";

/**
 * Oz-style scrolling chip cards.
 *
 * Key details from warp.dev/oz source:
 * - Each row: width 200%, max-width 2000px, height ~175px, gap 36px
 * - Edge fade via CSS mask: linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)
 * - Card bg: rgb(236, 222, 255) (light lilac), border-radius 16px
 * - Layered box-shadow, border 0.6px solid rgba(255,255,255,0.5)
 * - backdrop-filter: blur(5px)
 * - 3 rows at staggered vertical positions
 */

const ROW_1 = [
  { emoji: "🍎", text: "Maria saved $340/mo on groceries" },
  { emoji: "🚀", text: "TechStart Inc. received $150K SBIR grant" },
  { emoji: "🌱", text: "GreenBuild Co. saved $45K in clean energy credits" },
  { emoji: "🎓", text: "Lin received a $6,500 Pell Grant" },
  { emoji: "💊", text: "Sarah qualified for free healthcare" },
];

const ROW_2 = [
  { emoji: "🔥", text: "James got $2,400 in heating assistance" },
  { emoji: "🎯", text: "Acme Logistics got $12K workforce training grant" },
  { emoji: "💰", text: "David found $8,200 in annual benefits" },
  { emoji: "🏠", text: "Rosa found Section 8 housing assistance" },
];

const ROW_3 = [
  { emoji: "🚀", text: "Nova Labs received $200K R&D tax credit" },
  { emoji: "🎯", text: "Bright Path got $18K workforce grant" },
  { emoji: "💊", text: "Maria qualified for Medicaid coverage" },
  { emoji: "🍎", text: "Carlos enrolled in SNAP benefits" },
  { emoji: "🌱", text: "SolarCo saved $60K in clean energy credits" },
];

function ChipRow({
  chips,
  duration,
  reverse,
}: {
  chips: { emoji: string; text: string }[];
  duration: number;
  reverse?: boolean;
}) {
  // Triple the items for seamless infinite loop (no gaps)
  const tripled = [...chips, ...chips, ...chips];

  return (
    <div
      className="flex items-center"
      style={{
        width: "200%",
        maxWidth: "2200px",
        height: "70px",
        gap: "36px",
        /* Oz-exact edge fade mask */
        mask: "linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)",
        WebkitMask:
          "linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)",
        overflow: "visible",
      }}
    >
      <div
        className="flex shrink-0 items-center"
        style={{
          gap: "36px",
          animation: `chip-scroll ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {tripled.map((chip, i) => (
          <div
            key={`${chip.text}-${i}`}
            className="flex shrink-0 items-center gap-3 px-5 py-3"
            style={{
              backgroundColor: "rgb(236, 222, 255)",
              borderRadius: "16px",
              border: "0.6px solid rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              boxShadow:
                "0px 0.6px 0.6px -1.25px rgba(0,0,0,0.18), 0px 2.3px 2.3px -2.5px rgba(0,0,0,0.16), 0px 10px 10px -3.75px rgba(0,0,0,0.06)",
            }}
          >
            <span className="text-lg leading-none">{chip.emoji}</span>
            <span className="whitespace-nowrap text-sm font-medium text-[#121212]">
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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 pb-8 sm:gap-6 sm:pb-12">
      <ChipRow chips={ROW_1} duration={70} />
      <ChipRow chips={ROW_2} duration={80} reverse />
      <ChipRow chips={ROW_3} duration={75} />
    </div>
  );
}
