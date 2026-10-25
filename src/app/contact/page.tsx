"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { LandingNav } from "@/components/landing-nav";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export default function ContactPage() {
  const { t } = useI18n();
  const c = t.marketing.contact;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    form.reset();
    const msg = document.getElementById("success-msg");
    if (msg) msg.classList.remove("hidden");
  }

  return (
    <>
      <LandingNav />
      <div className="min-h-screen bg-surface px-4 pb-16 pt-32">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-text-subtle hover:text-text-muted transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
            <span>{t.common.back}</span>
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/brand/logo-light.svg"
              alt={t.common.appName}
              width={100}
              height={18}
            />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl text-text mb-3">
            {c.title}
          </h1>
          <p className="text-text-muted text-lg mb-12">{c.subtitle}</p>

          {/* Contact form */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="rounded-[20px] border border-border bg-surface-bright p-8 sm:p-12 mb-10"
          >
            <div className="space-y-6">
              {/* Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-text-muted mb-1.5"
                >
                  {c.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={c.namePlaceholder}
                  required
                  className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-text-muted mb-1.5"
                >
                  {c.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={c.emailPlaceholder}
                  required
                  className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-text-muted mb-1.5"
                >
                  {c.subject}
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full appearance-none rounded-[10px] border border-border bg-surface-dim py-3 pe-10 ps-4 text-text focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">{c.selectTopic}</option>
                    <option value="general">{c.topics.general}</option>
                    <option value="individual">{c.topics.individual}</option>
                    <option value="company">{c.topics.company}</option>
                    <option value="partnership">{c.topics.partnership}</option>
                    <option value="bug">{c.topics.bug}</option>
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 end-4 h-4 w-4 -translate-y-1/2 text-text-muted"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-text-muted mb-1.5"
                >
                  {c.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={c.messagePlaceholder}
                  required
                  className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-brand text-stone-900 rounded-lg px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
              >
                {c.send}
              </button>
            </div>

            <div
              id="success-msg"
              className="hidden mt-4 rounded-[10px] bg-brand/10 border border-brand/30 px-4 py-3 text-sm text-brand"
            >
              {c.sent}
            </div>
          </form>

          {/* Alternative contact */}
          <div className="text-center mb-8">
            <p className="text-text-muted mb-1">
              {c.emailDirect}{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-accent hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p className="text-text-subtle text-sm">{c.responseTime}</p>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-text-subtle text-center">{c.privacy}</p>
        </div>
      </div>
    </>
  );
}
