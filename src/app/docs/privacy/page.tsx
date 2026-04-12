import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Benefind",
  description:
    "How Benefind handles your data: what we collect, what we don't, how screening works without an account, and your rights under CCPA and GDPR.",
  alternates: { canonical: "https://benefind.app/docs/privacy" },
};

interface PolicySection {
  title: string;
  paragraphs: string[];
}

const LAST_UPDATED = "April 11, 2026";

const SECTIONS: PolicySection[] = [
  {
    title: "The short version",
    paragraphs: [
      "Benefind is built around a simple principle: you should be able to find out what government programs you qualify for without giving up your privacy. The screener works without an account, without an email address, and without uploading anything to our servers. Your answers stay in your browser unless you explicitly choose otherwise.",
      "We do not sell your data. We do not show ads. We do not share your personal information with third-party marketers, data brokers, or government agencies.",
    ],
  },
  {
    title: "What we collect when you use the screener",
    paragraphs: [
      "When you run the Benefind screener without creating an account, your answers are stored in your browser's local storage. They never leave your device. We cannot see them, and we cannot recover them if you clear your browser data.",
      "We collect anonymous, aggregate analytics: how many people run the screener, which programs come up most often, and where people drop off. This data contains no personal identifiers and cannot be linked back to any individual.",
    ],
  },
  {
    title: "What we collect when you create an account",
    paragraphs: [
      "If you choose to create a Benefind account, we store your email address, your screening results, and any documents you upload (like paystubs or utility bills for application prep). This data is encrypted at rest and in transit.",
      "We use your email to send account-related communications: password resets, screening result updates, and (if you opt in) periodic notifications about new programs you may qualify for. You can delete your account and all associated data at any time from your account settings.",
    ],
  },
  {
    title: "Cookies and tracking",
    paragraphs: [
      "Benefind uses essential cookies for authentication (if you have an account) and session management. We use privacy-respecting analytics (no cross-site tracking, no fingerprinting, no ad pixels).",
      "We do not use Google Analytics, Facebook Pixel, or any third-party tracking scripts that follow you across the web.",
    ],
  },
  {
    title: "Third-party services",
    paragraphs: [
      "Benefind uses Supabase for authentication and database services, Anthropic for AI-powered screening, and Vercel for hosting. Each of these providers has their own privacy policies and processes data according to our data processing agreements.",
      "We do not send your screening answers to any third party in a way that identifies you. When we use AI to evaluate eligibility, the data sent to the model contains your answers but no name, email, IP address, or other identifier.",
    ],
  },
  {
    title: "Data for undocumented and immigration-cautious users",
    paragraphs: [
      "We built Benefind knowing that many people who need government benefits are cautious about sharing information with any system connected to the government. The no-account screener exists specifically for this reason.",
      "Benefind is not a government service. We do not report screening results to any government agency. Running the screener does not constitute an application for benefits, and no government entity is notified when you use it.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      "If you are a California resident, you have rights under the CCPA to know what data we collect, request deletion, and opt out of data sales (we don't sell data, so this is already satisfied). If you are in the EU/EEA, you have rights under the GDPR including access, rectification, erasure, and data portability.",
      "To exercise any of these rights, contact us at privacy@benefind.app. We respond to all requests within 30 days.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We will update this policy as Benefind evolves. Material changes will be announced via email (for account holders) and a banner on the site. The \"last updated\" date at the top of this page always reflects the most recent revision.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Privacy policy" },
        ]}
      />

      <header className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
          [Privacy]
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Privacy policy
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          How Benefind handles your data, in plain language. Last updated{" "}
          <time dateTime="2026-04-11" className="text-text">{LAST_UPDATED}</time>.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 font-display text-xl font-semibold tracking-tight text-text">
              {section.title}
            </h2>
            <div className="flex flex-col gap-3 text-base leading-relaxed text-text-muted">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-xl border border-border bg-surface-dim p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-text">
          Questions about your data?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          Reach out at{" "}
          <a
            href="mailto:privacy@benefind.app"
            className="text-brand hover:underline"
          >
            privacy@benefind.app
          </a>{" "}
          or{" "}
          <Link href="/contact" className="text-brand hover:underline">
            use our contact form
          </Link>
          . We respond within 30 days.
        </p>
      </section>
    </>
  );
}
