"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Wand2, ListChecks, HelpCircle, Lightbulb, Lock, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, ui } from "@/lib/i18n";

export default function Showcase() {
  const { locale, setLocale } = useLocale();
  const t = ui[locale];

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-medium">AI Prompt Optimizer</span>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} setLocale={setLocale} />
          <a href="/sign-in" className={cn(buttonVariants({ size: "sm" }))}>
            {t.signIn}
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">{t.heroTitle}</h1>
          <p className="max-w-xl text-lg text-muted-foreground">{t.heroSubtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a href="/sign-in" className={cn(buttonVariants({ size: "lg" }))}>
              {t.signIn}
            </a>
          </div>
          <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            {t.privateNote}
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-12">
          <div className="overflow-hidden rounded-xl border">
            <Image
              src="/demo-prompt.png"
              alt="AI Prompt Optimizer: a rough prompt turned into a clear, professional one, with cost, token usage, response time and remaining budget shown above the result"
              width={1176}
              height={1023}
              className="w-full"
            />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-12">
          <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight">{t.featuresTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-border bg-muted/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wand2 className="h-4 w-4" />
                  {t.cardImprovedPromptTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.cardImprovedPromptDesc}</CardContent>
            </Card>
            <Card className="border-border bg-muted/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ListChecks className="h-4 w-4" />
                  {t.cardImprovementsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.cardImprovementsDesc}</CardContent>
            </Card>
            <Card className="border-border bg-muted/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <HelpCircle className="h-4 w-4" />
                  {t.cardMissingContextTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.cardMissingContextDesc}</CardContent>
            </Card>
            <Card className="border-border bg-muted/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="h-4 w-4" />
                  {t.cardTipsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.cardTipsDesc}</CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="overflow-hidden rounded-xl border">
            <Image
              src="/demo-results.png"
              alt="The four result cards: Improved Prompt, Improvements, Missing Context and Tips"
              width={1206}
              height={980}
              className="w-full"
            />
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" />
            {t.modelsCaption}
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="mb-4 text-center text-2xl font-semibold tracking-tight">{t.evalSectionTitle}</h2>
          <p className="mx-auto mb-6 max-w-xl text-center text-muted-foreground">{t.evalSubtitle}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border">
              <Image
                src="/demo-eval-form.png"
                alt="AI Response Evaluator: paste the original prompt and the AI's response to get a critical evaluation"
                width={1352}
                height={896}
                className="w-full"
              />
            </div>
            <div className="overflow-hidden rounded-xl border">
              <Image
                src="/demo-eval-score.png"
                alt="Evaluation result: a 0-100 score plus instruction compliance, clarity, completeness and relevance breakdowns"
                width={1456}
                height={825}
                className="w-full"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-1 border-t px-4 py-6 text-sm text-muted-foreground">
        <a href="https://vibe-portfolio-one.vercel.app/">Created by Bruno Rendeiro</a>
        <span>⚡ Powered by AI</span>
      </footer>
    </>
  );
}
