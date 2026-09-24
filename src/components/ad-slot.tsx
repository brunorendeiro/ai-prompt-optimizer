"use client";

import { useEffect, useState } from "react";
import { getStoredConsent } from "@/lib/analytics";
import { ui, type Locale } from "@/lib/i18n";

const AD_CLIENT = "ca-pub-4561414438757131";
const AD_SLOT = "7475469175";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Manual, responsive ad unit. Unlike Auto ads (deliberately not used — see
 * loadAds() in lib/analytics.ts), this component must only be rendered on
 * screens with substantial real content (e.g. a generated result with actual
 * text), never on mostly-empty or purely interactive screens, to respect
 * AdSense's policy on ads served on screens with no publisher content.
 *
 * Also only renders once the user has granted analytics/advertising consent.
 */
export function AdSlot({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    setGranted(getStoredConsent() === "granted");
  }, []);

  useEffect(() => {
    if (!granted) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad script not loaded yet, or blocked by an ad blocker.
    }
  }, [granted]);

  if (!granted) return null;

  return (
    <div className="rounded-lg border border-dashed p-3">
      <span className="mb-2 block text-center text-[10px] tracking-wider text-muted-foreground uppercase">
        {t.adLabel}
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
