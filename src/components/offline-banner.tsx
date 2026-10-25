"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    function handleOffline() {
      setIsOffline(true);
    }
    function handleOnline() {
      setIsOffline(false);
    }

    // Check initial state
    if (!navigator.onLine) setIsOffline(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-warning/95 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur-sm">
      <WifiOff className="me-1.5 inline h-4 w-4" />
      {t.app.shell.offline}
    </div>
  );
}
