interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
}

export function HowToJsonLd({
  name,
  description,
  totalTime,
  steps,
}: HowToJsonLdProps) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
  if (totalTime) {
    ld.totalTime = totalTime;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ld).replace(/</g, "\\u003c"),
      }}
    />
  );
}
