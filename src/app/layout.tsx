import type { Metadata } from "next";
import { Geist, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Prompt Optimizer",
  description: "Turn a rough prompt into a clear, professional, ready-to-use LLM prompt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${instrumentSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
