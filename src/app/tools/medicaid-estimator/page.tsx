import type { Metadata } from "next";
import { MedicaidEstimator } from "./medicaid-estimator";

export const metadata: Metadata = {
  title:
    "Medicaid Eligibility Estimator 2026 | Check Your State Coverage | Benefind",
  description:
    "Find out if you qualify for Medicaid in your state. Our free estimator checks income against 2026 FPL thresholds for expansion and non-expansion states. Get an instant eligibility estimate.",
  alternates: { canonical: "https://benefind.app/tools/medicaid-estimator" },
  openGraph: {
    title: "Medicaid Eligibility Estimator 2026 | Benefind",
    description:
      "Check your Medicaid eligibility based on income, household size, and state. Instant estimate, no account required.",
    url: "https://benefind.app/tools/medicaid-estimator",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicaid Eligibility Estimator 2026 | Benefind",
    description:
      "Check your Medicaid eligibility instantly. Expansion and non-expansion states handled separately.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the income limit for Medicaid in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In states that expanded Medicaid, adults qualify with incomes up to 138% of the federal poverty level, which is about $20,783 per year for an individual in 2026. Non-expansion states set their own, often lower, income thresholds.",
      },
    },
    {
      "@type": "Question",
      name: "Which states expanded Medicaid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of 2026, 41 states and Washington DC have expanded Medicaid under the ACA. States that have not expanded include Alabama, Florida, Georgia, Mississippi, South Carolina, Tennessee, Texas, Wisconsin, and Wyoming.",
      },
    },
    {
      "@type": "Question",
      name: "How do I apply for Medicaid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can apply through your state Medicaid agency, through Healthcare.gov during open enrollment, or year-round if you have a qualifying life event. Many states allow online applications. A full Benefind screening can guide you to your state's application portal.",
      },
    },
    {
      "@type": "Question",
      name: "Does pregnancy affect Medicaid eligibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pregnant individuals typically qualify at higher income thresholds, usually 185% to 250% FPL depending on the state. In many states, pregnancy Medicaid provides coverage regardless of immigration status.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get Medicaid if I have Medicare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you qualify for both, you are considered dual-eligible. Medicaid can cover premiums, copays, and services that Medicare does not, such as long-term care and dental coverage.",
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
      name: "Medicaid Estimator",
      item: "https://benefind.app/tools/medicaid-estimator",
    },
  ],
};

export default function MedicaidEstimatorPage() {
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
      <MedicaidEstimator />
    </>
  );
}
