"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { doSignIn } from "@/actions";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Sparkles } from "lucide-react";
import { useLocale, ui } from "@/lib/i18n";

function SignInContent() {
  const { locale, setLocale } = useLocale();
  const t = ui[locale];
  const error = useSearchParams().get("error");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="absolute top-4 right-4">
        <LocaleSwitcher locale={locale} setLocale={setLocale} />
      </div>
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <Sparkles className="h-6 w-6 text-primary" />
        AI Prompt Optimizer
      </div>
      <p className="max-w-sm text-sm text-muted-foreground">{t.signInPrivateNote}</p>
      {error === "AccessDenied" && (
        <p className="max-w-sm rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {t.accessDenied}
        </p>
      )}
      <form action={doSignIn}>
        <Button type="submit" size="lg">
          {t.signIn}
        </Button>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
