import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { OfflineBanner } from "@/components/offline-banner";
import { AuthErrorRedirect } from "@/components/auth-error-redirect";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Benefind — Find Every Benefit You Deserve",
  description:
    "AI-powered navigator that helps you find and apply for every government benefit you qualify for. Plain language, multilingual, free.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3010",
  ),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Benefind",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${inter.className} min-h-dvh`}>
        <I18nProvider>
          <SmoothScroll />
          {children}
          <AuthErrorRedirect />
          <ServiceWorkerRegister />
          <OfflineBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
