"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageSelector } from "@/components/language-selector";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [notifyOnChange, setNotifyOnChange] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pre-fill name from email and check if already onboarded
  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      // Already onboarded? Go to dashboard
      if (user.user_metadata?.onboarding_completed) {
        router.replace("/dashboard");
        return;
      }

      // Pre-fill name from metadata or email prefix
      const existing =
        user.user_metadata?.display_name ?? user.user_metadata?.full_name;
      if (existing) {
        setName(existing);
      } else if (user.email) {
        const prefix = user.email.split("@")[0] ?? "";
        // Capitalize and clean up common email name patterns
        const cleaned = prefix
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        setName(cleaned);
      }

      setLoading(false);
    }
    init();
  }, [supabase, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Save name + onboarding flag to user metadata
      await supabase.auth.updateUser({
        data: {
          display_name: name.trim() || undefined,
          onboarding_completed: true,
          notify_on_eligibility_change: notifyOnChange,
        },
      });

      router.replace("/dashboard");
    } catch {
      // If update fails, still let them through
      router.replace("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <Card className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] bg-brand/15">
              <Sparkles className="h-6 w-6 text-brand" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-text">
              Welcome to Benefind!
            </h1>
            <p className="text-sm text-text-muted">
              Just a few quick preferences before we show your results.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Your name (optional)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we address you?"
                className="rounded-lg border-border bg-surface-dim"
              />
            </div>

            {/* Notifications */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="notify"
                checked={notifyOnChange}
                onCheckedChange={(checked) =>
                  setNotifyOnChange(checked === true)
                }
                className="mt-0.5"
              />
              <Label
                htmlFor="notify"
                className="text-sm text-text-muted leading-snug cursor-pointer"
              >
                Email me when my eligible programs change
              </Label>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label>Language</Label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-dim px-3 py-2">
                <LanguageSelector />
                <span className="text-sm text-text-muted">
                  Change your preferred language
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Continue to Results"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
