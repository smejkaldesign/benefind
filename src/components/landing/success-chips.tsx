"use client";

/**
 * Oz-style scrolling callout cards.
 * - Each chip has a random Y offset within its row for a scattered feel
 * - Chips fade to 20% opacity at edges, 100% when inside hero container
 * - Full viewport width, dark edge gradients handled by parent
 */

const ROW_1 = [
  { emoji: "🍎", text: "Maria saved $340/mo on groceries", gap: 180, y: -18 },
  { emoji: "🚀", text: "TechStart Inc. received $150K SBIR grant", gap: 280, y: 12 },
  { emoji: "🌱", text: "GreenBuild Co. saved $45K in energy credits", gap: 140, y: -8 },
  { emoji: "🎓", text: "Lin received a $6,500 Pell Grant", gap: 320, y: 22 },
  { emoji: "💊", text: "Sarah qualified for free healthcare", gap: 200, y: -14 },
];

const ROW_2 = [
  { emoji: "🔥", text: "James got $2,400 in heating assistance", gap: 260, y: 16 },
  { emoji: "🎯", text: "Acme Logistics got $12K workforce grant", gap: 160, y: -20 },
  { emoji: "💰", text: "David found $8,200 in annual benefits", gap: 300, y: 8 },
  { emoji: "🏠", text: "Rosa found Section 8 housing assistance", gap: 220, y: -12 },
];

function ChipRow({
  chips,
  duration,
}: {
  chips: { emoji: string; text: string; gap: number; y: number }[];
  duration: number;
}) {
  const tripled = [...chips, ...chips, ...chips];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        overflow: "visible",
        /* Row height is 1.8x the card height (~76px card → ~137px row) */
        height: "137px",
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
              /* Random vertical shift within the row */
              transform: `translateY(${chip.y}px)`,
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
      className="pointer-events-none absolute z-20"
      style={{
        left: "50%",
        right: 0,
        width: "100vw",
        marginLeft: "-50vw",
        bottom: "8%",
        top: "50%",
        /*
         * Opacity mask: 20% at edges → 100% in the center (hero container area).
         * The hero container is ~1400px centered, so roughly the middle 70% of viewport.
         * Edges (0-15% and 85-100%) stay at 20% opacity.
         */
        mask: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.2) 100%)",
        WebkitMask:
          "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.2) 100%)",
      }}
    >
      <div className="relative flex h-full flex-col items-start justify-center gap-[60px] overflow-hidden">
        <ChipRow chips={ROW_1} duration={104} />
        <ChipRow chips={ROW_2} duration={124} />
      </div>
    </div>
  );
}
