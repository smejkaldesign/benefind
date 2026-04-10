"use client";

/**
 * Oz-style scrolling callout cards.
 * - All rows scroll LEFT
 * - Rows at staggered vertical positions
 * - Randomized gaps between cards
 * - Emoji in square icon container
 * - Taller cards with more padding
 */

const ROW_1 = [
  { emoji: "🍎", text: "Maria saved $340/mo on groceries", gap: 48 },
  { emoji: "🚀", text: "TechStart Inc. received $150K SBIR grant", gap: 72 },
  { emoji: "🌱", text: "GreenBuild Co. saved $45K in energy credits", gap: 36 },
  { emoji: "🎓", text: "Lin received a $6,500 Pell Grant", gap: 64 },
  { emoji: "💊", text: "Sarah qualified for free healthcare", gap: 52 },
];

const ROW_2 = [
  { emoji: "🔥", text: "James got $2,400 in heating assistance", gap: 80 },
  { emoji: "🎯", text: "Acme Logistics got $12K workforce grant", gap: 44 },
  { emoji: "💰", text: "David found $8,200 in annual benefits", gap: 68 },
  { emoji: "🏠", text: "Rosa found Section 8 housing assistance", gap: 56 },
];

function ChipRow({
  chips,
  duration,
  offsetY,
}: {
  chips: { emoji: string; text: string; gap: number }[];
  duration: number;
  offsetY: string;
}) {
  const tripled = [...chips, ...chips, ...chips];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "200%",
        maxWidth: "2400px",
        mask: "linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)",
        WebkitMask:
          "linear-gradient(270deg, transparent 0%, black 20.38% 78.23%, transparent 100%)",
        overflow: "visible",
        transform: `translateY(${offsetY})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          animation: `chip-scroll ${duration}s linear infinite`,
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
              padding: "18px 24px",
              marginRight: `${chip.gap}px`,
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
            {/* Emoji in square icon container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                border: "0.6px solid rgba(0, 0, 0, 0.08)",
                flexShrink: 0,
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              {chip.emoji}
            </div>
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
      style={{ bottom: "12%", top: "52%" }}
    >
      <div className="relative flex h-full flex-col justify-around">
        <ChipRow chips={ROW_1} duration={80} offsetY="-10px" />
        <ChipRow chips={ROW_2} duration={95} offsetY="20px" />
      </div>
    </div>
  );
}
