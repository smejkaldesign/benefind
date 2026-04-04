import type { Metadata, Viewport } from 'next';
import { I18nProvider } from '@/lib/i18n/context';
import { ServiceWorkerRegister } from '@/components/service-worker-register';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benefind — Find Every Benefit You Deserve',
  description:
    'AI-powered navigator that helps you find and apply for every government benefit you qualify for. Plain language, multilingual, free.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3010'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Benefind',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <I18nProvider>
          {children}
          <ServiceWorkerRegister />
        </I18nProvider>
      </body>
    </html>
  );
}
