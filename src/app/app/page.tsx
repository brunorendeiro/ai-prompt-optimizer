"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { SignOutButton } from "@/components/sign-out-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Optimizer } from "@/components/optimizer";
import { ResponseEvaluator } from "@/components/response-evaluator";
import { useLocale, ui } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tab = "optimize" | "evaluate";

export default function AppPage() {
  const { data: session } = useSession();
  const { locale, setLocale } = useLocale();
  const t = ui[locale];
  const [tab, setTab] = useState<Tab>("optimize");

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <a href="/" className="font-heading text-lg">
          AI Prompt Optimizer
        </a>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} setLocale={setLocale} />
          <a href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            {t.admin}
          </a>
          <span className="hidden text-sm text-muted-foreground sm:inline">{session?.user?.email}</span>
          <SignOutButton label={t.signOut} />
        </div>
      </header>

      <div className="flex justify-center border-b px-4 pt-4">
        <div className="flex gap-1 rounded-lg border p-1">
          <button
            type="button"
            onClick={() => setTab("optimize")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              tab === "optimize" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.tabOptimize}
          </button>
          <button
            type="button"
            onClick={() => setTab("evaluate")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              tab === "evaluate" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.tabEvaluate}
          </button>
        </div>
      </div>

      <main className="flex-1">
        {tab === "optimize" ? <Optimizer locale={locale} /> : <ResponseEvaluator locale={locale} />}
      </main>

      <footer className="flex flex-col items-center gap-1 border-t px-4 py-6 text-sm text-muted-foreground">
        <a href="https://vibe-portfolio-one.vercel.app/">Created by Bruno Rendeiro</a>
        <span>⚡ Powered by AI</span>
      </footer>
    </>
  );
}
