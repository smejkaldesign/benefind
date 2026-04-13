import type { Metadata } from "next";
import { LandingNav } from "@/components/landing-nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": "https://benefind.app/feed.xml",
    },
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        {children}
      </main>
      <Footer />
    </>
  );
}
