"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getStoredConsent, setConsent, loadAnalytics } from "@/lib/analytics";
import { useLocale, ui } from "@/lib/i18n";

export function CookieConsent() {
  const { locale } = useLocale();
  const t = ui[locale];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === "granted") {
      loadAnalytics();
    } else if (stored === null) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function handleAccept() {
    setConsent("granted");
    loadAnalytics();
    setVisible(false);
  }

  function handleReject() {
    setConsent("denied");
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-2 bottom-2 z-50 mx-auto flex w-auto max-w-3xl flex-col items-stretch justify-between gap-2 rounded-lg border bg-background/95 px-3 py-2 shadow-lg backdrop-blur sm:inset-x-4 sm:bottom-4 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3">
      <p className="text-xs leading-5 text-muted-foreground sm:text-sm">{t.cookieBody}</p>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" size="sm" onClick={handleReject}>
          {t.cookieReject}
        </Button>
        <Button size="sm" onClick={handleAccept}>
          {t.cookieAccept}
        </Button>
      </div>
    </div>
  );
}
