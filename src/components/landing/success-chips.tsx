"use client";

/**
 * Oz-style scrolling callout cards.
 * - Each chip has a random Y offset within its row for a scattered feel
 * - Chips fade to 20% opacity at edges, 100% when inside hero container
 * - Full viewport width, dark edge gradients handled by parent
 */

import { useI18n } from "@/lib/i18n/context";

const ROW_1: Chip[] = [
  { emoji: "🍎", gap: 180, y: -18 },
  {
    emoji: "🚀",
    gap: 280,
    y: 12,
  },
  {
    emoji: "🌱",
    gap: 140,
    y: -8,
  },
  { emoji: "🎓", gap: 320, y: 22 },
  {
    emoji: "💊",
    gap: 200,
    y: -14,
  },
];

const ROW_2: Chip[] = [
  {
    emoji: "🔥",
    gap: 260,
    y: 16,
  },
  {
    emoji: "🎯",
    gap: 160,
    y: -20,
  },
  {
    emoji: "💰",
    gap: 300,
    y: 8,
  },
  {
    emoji: "🏠",
    gap: 220,
    y: -12,
  },
];

type Chip = { emoji: string; gap: number; y: number };

function ChipRow({
  chips,
  texts,
  dir,
  duration,
}: {
  chips: Chip[];
  texts: string[];
  dir: "ltr" | "rtl";
  duration: number;
}) {
  const withText = chips.map((chip, i) => ({ ...chip, text: texts[i] }));
  const tripled = [...withText, ...withText, ...withText];

  return (
    <div
      dir="ltr"
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
          /* GPU acceleration */
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        {tripled.map((chip, i) => (
          <div
            key={`${chip.text}-${i}`}
            dir={dir}
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
  const { t, dir } = useI18n();
  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{
        left: "50%",
        right: 0,
        width: "100vw",
        marginLeft: "-50vw",
        bottom: "8%",
        top: "60%",
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
      <div className="relative flex h-full flex-col items-start justify-center gap-[30px] overflow-hidden">
        <ChipRow
          chips={ROW_1}
          texts={t.marketing.chips.row1}
          dir={dir}
          duration={104}
        />
        <ChipRow
          chips={ROW_2}
          texts={t.marketing.chips.row2}
          dir={dir}
          duration={124}
        />
      </div>
    </div>
  );
}
