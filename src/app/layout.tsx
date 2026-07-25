import type { Metadata } from "next";
import { Geist, Kalam, Courier_Prime } from "next/font/google";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-heading",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-plex-mono",
  weight: ["400", "700"],
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
      className={`${geistSans.variable} ${kalam.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
