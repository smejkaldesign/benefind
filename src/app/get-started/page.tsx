"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Building2, ArrowLeft } from "lucide-react";
import { LandingNav } from "@/components/landing-nav";
import { useI18n } from "@/lib/i18n/context";

const trackMeta = [
  { id: "individual", href: "/screening", icon: User },
  { id: "company", href: "/screening/company", icon: Building2 },
] as const;

export default function GetStartedPage() {
  const { t } = useI18n();
  const g = t.marketing.getStarted;
  const tracks = trackMeta.map((meta) => ({ ...meta, ...g[meta.id] }));
  return (
    <>
      <LandingNav />
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-surface px-4 pt-32 pb-16">
        <div className="relative z-10 mx-auto w-full max-w-2xl">
          {/* Back link */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-subtle hover:text-text-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
            {t.common.back}
          </Link>

          {/* Header */}
          <div className="mb-10">
            <Image
              src="/images/brand/logo-light.svg"
              alt={t.common.appName}
              width={100}
              height={18}
              className="mb-4"
            />
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {g.title}
            </h1>
            <p className="mt-2 text-base text-text-muted">{g.subtitle}</p>
          </div>

          {/* Track cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <Link
                  key={track.id}
                  href={track.href}
                  className="group relative rounded-[16px] border border-border bg-surface-bright p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand/10 transition-colors group-hover:bg-brand/20">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-text">
                    {track.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-text-muted">
                    {track.description}
                  </p>
                  <p className="mt-3 text-xs text-text-subtle">
                    {track.examples}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    {g.cta}
                    <ArrowLeft className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Privacy note */}
          <p className="mt-8 text-center text-xs text-text-subtle">
            {g.privacy}
          </p>
        </div>
      </div>
    </>
  );
}
