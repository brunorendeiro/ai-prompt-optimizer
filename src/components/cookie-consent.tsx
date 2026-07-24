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
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center justify-between gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur sm:flex-row">
      <p className="text-sm text-muted-foreground">{t.cookieBody}</p>
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
