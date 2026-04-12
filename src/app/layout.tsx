import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import { ThemeProvider } from "@/lib/theme";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { OfflineBanner } from "@/components/offline-banner";
import { AuthErrorRedirect } from "@/components/auth-error-redirect";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className={`${inter.variable} ${inter.className} min-h-dvh`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Benefind",
              url: "https://benefind.app",
              logo: "https://benefind.app/images/brand/logo-dark.png",
              description:
                "Free benefits eligibility screener for government programs.",
              foundingDate: "2026",
            }).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <I18nProvider>
            <SmoothScroll />
            {children}
            <AuthErrorRedirect />
            <ServiceWorkerRegister />
            <OfflineBanner />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
