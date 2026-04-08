import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme';
import { I18nProvider } from '@/lib/i18n/context';
import { ServiceWorkerRegister } from '@/components/service-worker-register';
import { OfflineBanner } from '@/components/offline-banner';
import './globals.css';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

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
  themeColor: '#10B981',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('benefind-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${font.className} min-h-dvh`}>
        <ThemeProvider>
          <I18nProvider>
            {children}
            <ServiceWorkerRegister />
            <OfflineBanner />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
