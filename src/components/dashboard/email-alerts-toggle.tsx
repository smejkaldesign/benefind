"use client";

import { useEffect, useState, useTransition } from "react";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { getNewMatchEmails, setNewMatchEmails } from "./email-alerts-actions";

/**
 * Opt-in/opt-out for "new benefit match" emails. Loads its own state so the
 * dashboard only needs to render <EmailAlertsToggle />.
 */
export function EmailAlertsToggle() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    getNewMatchEmails()
      .then(setEnabled)
      .catch(() => setEnabled(null));
  }, []);

  if (enabled === null) return null;

  function onChange(next: boolean) {
    const previous = enabled;
    setEnabled(next);
    setFailed(false);
    startTransition(async () => {
      const saved = await setNewMatchEmails(next).catch(() => null);
      if (saved === null) {
        setEnabled(previous);
        setFailed(true);
      }
    });
  }

  return (
    <Card className="flex-row items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <Mail className="mt-0.5 h-5 w-5 text-brand" aria-hidden="true" />
        <div>
          <label
            htmlFor="new-match-emails"
            className="font-semibold text-text cursor-pointer"
          >
            Email me about new benefits
          </label>
          <p className="mt-1 text-xs text-text-muted">
            We check your last screening when we add or update programs. If you
            may qualify for something new, we send you one email.
          </p>
          {failed && (
            <p role="alert" className="mt-1 text-xs text-error">
              We could not save this setting. Please try again.
            </p>
          )}
        </div>
      </div>
      <Switch
        id="new-match-emails"
        checked={enabled}
        disabled={pending}
        onCheckedChange={onChange}
        aria-label="Email me about new benefits"
      />
    </Card>
  );
}
