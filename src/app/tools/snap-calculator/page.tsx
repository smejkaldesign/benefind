import type { Metadata } from "next";
import { SNAPCalculator } from "./snap-calculator";

export const metadata: Metadata = {
  title:
    "SNAP Benefit Calculator 2026 | Estimate Your Food Stamp Benefits | Benefind",
  description:
    "Use our free SNAP calculator to estimate your 2026 monthly food stamp benefit. Enter household size, income, and shelter costs for an instant estimate. Start a full screening for exact results.",
  alternates: { canonical: "https://benefind.app/tools/snap-calculator" },
  openGraph: {
    title: "SNAP Benefit Calculator 2026 | Benefind",
    description:
      "Estimate your monthly food stamp benefit instantly. Enter household size, income, and state for a personalized estimate.",
    url: "https://benefind.app/tools/snap-calculator",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNAP Benefit Calculator 2026 | Benefind",
    description:
      "Estimate your monthly food stamp benefit instantly. No account required.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the income limit for SNAP in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most households, gross monthly income must be at or below 130% of the federal poverty level (FPL). For a household of 4, that is $3,381/month ($40,572/year) in 2026. Households with an elderly or disabled member only need to pass the net income test at 100% FPL.",
      },
    },
    {
      "@type": "Question",
      name: "How is my SNAP benefit amount calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SNAP uses a formula: start with the maximum benefit for your household size, then subtract 30% of your net income. Net income is your gross income minus standard deductions, earned income deductions (20%), and excess shelter costs.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as income for SNAP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SNAP counts most types of income including wages, self-employment, Social Security, and disability payments. It does not count Supplemental Security Income (SSI), child tax credits, or most educational assistance.",
      },
    },
    {
      "@type": "Question",
      name: "What deductions can reduce my SNAP countable income?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard deductions apply to all households. You also get a 20% earned income deduction if you work, a dependent care deduction for child or adult care costs, and a shelter deduction for housing costs that exceed half your net income.",
      },
    },
    {
      "@type": "Question",
      name: "How long does SNAP approval take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most states process regular SNAP applications within 30 days. If your household has very little money, you may qualify for expedited SNAP, which can be approved within 7 days.",
      },
    },
    {
      "@type": "Question",
      name: "Does SNAP vary by state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Federal rules set income and benefit levels, but each state administers its own program. Some states have higher shelter cost caps or additional deductions. Hawaii and Alaska have separate, higher benefit levels.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get SNAP if I am working?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Working households benefit from the 20% earned income deduction, which lowers countable income. Many working families, especially with children, receive SNAP benefits.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://benefind.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://benefind.app/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "SNAP Calculator",
      item: "https://benefind.app/tools/snap-calculator",
    },
  ],
};

export default function SNAPCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SNAPCalculator />
    </>
  );
}
