"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "@/components/landing-nav";
import { GradientBlinds } from "@/components/gradient-blinds";

const RATE_LIMIT_SECONDS = 60;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err === "link_expired") {
      setError(
        "That sign-in link has expired or already been used. Request a new one below.",
      );
    } else if (err === "auth_failed") {
      setError("Sign-in failed. Please try again.");
    }
  }, []);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!cooldownEnd) {
      setCooldown(0);
      return;
    }

    function tick() {
      const remaining = Math.ceil((cooldownEnd! - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldown(0);
        setCooldownEnd(null);
        setError(null);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        setCooldown(remaining);
      }
    }

    tick();
    timerRef.current = setInterval(tick, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [cooldownEnd]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      const msg =
        error.message.charAt(0).toUpperCase() + error.message.slice(1);
      setError(msg);
      if (error.message.toLowerCase().includes("rate limit")) {
        setCooldownEnd(Date.now() + RATE_LIMIT_SECONDS * 1000);
      }
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <LandingNav />
      <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pt-20">
        {/* GradientBlinds background — full bleed, full vibrance */}
        <div className="pointer-events-none absolute inset-0">
          <GradientBlinds />
        </div>

        {/* Sign-in container — Celune style */}
        <div className="relative z-10 flex w-full max-w-[534px] flex-col items-center rounded-xl border border-white/[0.05] bg-black/80 px-8 py-16 shadow-2xl shadow-black/50 backdrop-blur-sm sm:px-12 sm:py-20">
          {/* Favicon — 64px square at top */}
          <Image
            src="/images/brand/favilight.png"
            alt="Benefind"
            width={64}
            height={64}
            className="mb-8 h-16 w-16"
            priority
          />
          {sent ? (
            <div className="w-full space-y-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
                <CheckCircle className="h-7 w-7 text-brand" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-text">
                Check your email
              </h1>
              <p className="text-text-muted">
                We sent a magic link to{" "}
                <strong className="text-text">{email}</strong>. Click the link
                to sign in.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="font-display text-3xl font-semibold text-text">
                  Sign in to Benefind
                </h1>
                <p className="text-sm text-text-muted">
                  No password needed — we&apos;ll email you a magic link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-text-muted"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      disabled={loading}
                      placeholder="you@example.com"
                      className="block h-11 w-full rounded-lg border border-white/10 bg-black pl-10 pr-3 text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {error && (
                  <p
                    className="rounded-lg bg-error/10 px-3 py-2 text-sm font-medium text-error"
                    role="alert"
                  >
                    {error}
                    {cooldown > 0 && (
                      <span className="ml-1 tabular-nums">({cooldown}s)</span>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email || cooldown > 0}
                  className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-surface transition-colors hover:bg-brand-dark disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending link...
                    </>
                  ) : cooldown > 0 ? (
                    `Try again in ${cooldown}s`
                  ) : (
                    "Send magic link"
                  )}
                </button>
              </form>

              <div className="text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-brand"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to home
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
