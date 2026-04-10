"use client";

/**
 * Oz-style scrolling chip cards — fewer, larger, loosely placed.
 * Chips sit INSIDE the hero so Vanta clouds render over them.
 * Only ~5-6 visible at a time across 2 staggered rows.
 */

const ROW_1 = [
  { emoji: "🍎", text: "Maria saved $340/mo on groceries" },
  { emoji: "🚀", text: "TechStart Inc. received $150K SBIR grant" },
  { emoji: "🌱", text: "GreenBuild Co. saved $45K in clean energy credits" },
  { emoji: "🎓", text: "Lin received a $6,500 Pell Grant" },
];

const ROW_2 = [
  { emoji: "💊", text: "Sarah qualified for free healthcare" },
  { emoji: "🎯", text: "Acme Logistics got $12K workforce training grant" },
  { emoji: "💰", text: "David found $8,200 in annual benefits" },
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
  const tripled = [...chips, ...chips, ...chips];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "200%",
        maxWidth: "2200px",
        height: "60px",
        gap: "48px",
        mask: "linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)",
        WebkitMask:
          "linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)",
        overflow: "visible",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
          animation: `chip-scroll ${duration}s linear infinite${reverse ? " reverse" : ""}`,
          flexShrink: 0,
        }}
      >
        {tripled.map((chip, i) => (
          <div
            key={`${chip.text}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px 24px",
              backgroundColor: "rgb(236, 222, 255)",
              borderRadius: "16px",
              border: "0.6px solid rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              boxShadow:
                "0px 0.6px 0.6px -1.25px rgba(0,0,0,0.18), 0px 2.3px 2.3px -2.5px rgba(0,0,0,0.16), 0px 10px 10px -3.75px rgba(0,0,0,0.06)",
              flexShrink: 0,
              whiteSpace: "nowrap" as const,
            }}
          >
            <span style={{ fontSize: "22px", lineHeight: 1 }}>
              {chip.emoji}
            </span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#121212",
                letterSpacing: "-0.01em",
              }}
            >
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
    <div
      className="pointer-events-none absolute inset-x-0 z-[5]"
      style={{ bottom: "15%" }}
    >
      <div className="flex flex-col items-center gap-8">
        <ChipRow chips={ROW_1} duration={80} />
        <ChipRow chips={ROW_2} duration={90} reverse />
      </div>
    </div>
  );
}
