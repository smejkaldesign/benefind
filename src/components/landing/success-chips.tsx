"use client";

/**
 * Oz-style scrolling callout cards.
 * - Positioned absolutely over the hero section (outside container)
 * - Full viewport width, extending off right edge, fading into left
 * - All rows scroll LEFT
 * - On top of dither overlay (z-20)
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
        /* Full viewport width — break out of container */
        left: "50%",
        right: 0,
        width: "100vw",
        marginLeft: "-50vw",
        /* Positioned over bottom portion of hero */
        bottom: "8%",
        top: "50%",
      }}
    >
      {/* Left edge fade — chips dissolve into nothing on the left */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: "15vw",
          background: "linear-gradient(to right, #121212 0%, transparent 100%)",
        }}
      />
      {/* Right edge — no fade, chips come in from the right cleanly */}

      <div className="relative flex h-full flex-col justify-around overflow-hidden">
        <ChipRow chips={ROW_1} duration={80} offsetY="-10px" />
        <ChipRow chips={ROW_2} duration={95} offsetY="20px" />
      </div>
    </div>
  );
}
