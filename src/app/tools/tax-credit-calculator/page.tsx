import type { Metadata } from "next";
import { RDTaxCreditCalculator } from "./tax-credit-calculator";

export const metadata: Metadata = {
  title:
    "R&D Tax Credit Calculator 2026 | Estimate Your Research Credit | Benefind",
  description:
    "Calculate your federal R&D tax credit using the ASC method. Find out if your startup qualifies for the payroll tax offset. Free instant estimate, no account required.",
  alternates: { canonical: "https://benefind.app/tools/tax-credit-calculator" },
  openGraph: {
    title: "R&D Tax Credit Calculator 2026 | Benefind",
    description:
      "Estimate your federal research and development tax credit. Startups with under $5M in gross receipts may offset payroll taxes.",
    url: "https://benefind.app/tools/tax-credit-calculator",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "R&D Tax Credit Calculator 2026 | Benefind",
    description:
      "Free R&D tax credit estimator. ASC method + payroll offset for qualifying startups.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the R&D tax credit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The federal Research and Development (R&D) tax credit, also called the Research Credit or Section 41 credit, allows businesses to receive a tax credit for qualified research expenses (QREs). The credit equals a percentage of QREs above a base amount. The most common calculation method is the Alternative Simplified Credit (ASC), which equals 14% of QREs above 50% of the average QREs from the prior three years.",
      },
    },
    {
      "@type": "Question",
      name: "Who qualifies for the R&D tax credit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any US company that incurs qualified research expenses may be eligible. Qualifying activities must meet a four-part test: they must be undertaken for a permitted purpose (developing new or improved business components), be technological in nature, eliminate uncertainty, and involve experimentation. Software development, engineering, and scientific research commonly qualify.",
      },
    },
    {
      "@type": "Question",
      name: "What is the payroll tax offset for startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualified small businesses with less than $5 million in gross receipts and no gross receipts in the five years before the current tax year can elect to apply up to $500,000 of their R&D credit against payroll taxes (specifically the employer portion of Social Security taxes). This is critical for pre-revenue startups that have no income tax liability to offset.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as a qualified research expense (QRE)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QREs include wages paid to employees engaged in qualified research, costs of supplies used in research, and 65% of contract research payments to third parties. Cloud computing costs may qualify if used for experimentation. Capital expenditures, management activities, and market research do not qualify.",
      },
    },
    {
      "@type": "Question",
      name: "What is the ASC method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Alternative Simplified Credit (ASC) method calculates the credit as 14% of QREs that exceed 50% of the average QREs for the three preceding tax years. If you have no prior QREs, the rate drops to 6% of current year QREs. Most companies prefer the ASC because it requires less historical documentation than the Regular Credit method.",
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
      name: "R&D Tax Credit Calculator",
      item: "https://benefind.app/tools/tax-credit-calculator",
    },
  ],
};

export default function TaxCreditCalculatorPage() {
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
      <RDTaxCreditCalculator />
    </>
  );
}
