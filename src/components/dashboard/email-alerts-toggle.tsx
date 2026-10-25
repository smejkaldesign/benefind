"use client";

import { useEffect, useState, useTransition } from "react";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/lib/i18n/context";
import { PremiumGate } from "@/components/premium-gate";
import { getNewMatchEmails, setNewMatchEmails } from "./email-alerts-actions";

/**
 * Opt-in/opt-out for "new benefit match" emails. Loads its own state so the
 * dashboard only needs to render <EmailAlertsToggle />. Workspaces without
 * the alerts entitlement see an upgrade prompt; the daily job also skips them.
 */
export function EmailAlertsToggle({ allowed }: { allowed: boolean }) {
  if (!allowed) {
    return <PremiumGate allowed={false} feature="alerts" compact />;
  }
  return <AlertsSwitch />;
}

function AlertsSwitch() {
  const m = useI18n().t.app.emailAlerts;
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
            {m.label}
          </label>
          <p className="mt-1 text-xs text-text-muted">{m.description}</p>
          {failed && (
            <p role="alert" className="mt-1 text-xs text-error">
              {m.saveFailed}
            </p>
          )}
        </div>
      </div>
      <Switch
        id="new-match-emails"
        checked={enabled}
        disabled={pending}
        onCheckedChange={onChange}
        aria-label={m.label}
      />
    </Card>
  );
}
