"use client";

const MEASUREMENT_ID = "G-8PWRSDS62T";
const AD_CLIENT = "ca-pub-4561414438757131";
const STORAGE_KEY = "ai-prompt-optimizer-analytics-consent";

export type Consent = "granted" | "denied";

export function getStoredConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(value: Consent) {
  window.localStorage.setItem(STORAGE_KEY, value);
}

export function loadAnalytics() {
  if (typeof window === "undefined" || (window as unknown as Record<string, unknown>).__gaLoaded) return;
  (window as unknown as Record<string, unknown>).__gaLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js expects the native Arguments object, not a rest-parameter array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;
  w.gtag("js", new Date());
  w.gtag("config", MEASUREMENT_ID);
}

export function loadAds() {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  if (w.__adsLoaded) return;
  w.__adsLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
  document.head.appendChild(script);

  const adsbygoogle = ((w.adsbygoogle as unknown[]) = (w.adsbygoogle as unknown[]) || []);
  adsbygoogle.push({ google_ad_client: AD_CLIENT, enable_page_level_ads: true });
}
