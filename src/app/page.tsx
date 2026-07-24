import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, ListChecks, HelpCircle, Lightbulb, Lock, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Showcase() {
  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-medium">AI Prompt Optimizer</span>
        <a href="/sign-in" className={cn(buttonVariants({ size: "sm" }))}>
          Sign in with Google
        </a>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">AI Prompt Optimizer</h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Paste a rough prompt. Get back a clearer, professional, ready-to-use version — plus what
            changed, what was missing, and how to write better prompts next time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a href="/sign-in" className={cn(buttonVariants({ size: "lg" }))}>
              Sign in with Google
            </a>
          </div>
          <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Private app — access limited to authorized accounts.
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-12">
          <div className="overflow-hidden rounded-xl border">
            <Image
              src="/demo-prompt.jpg"
              alt="AI Prompt Optimizer: a rough prompt turned into a clear, professional one, with token usage, response time and remaining budget shown above the result"
              width={1568}
              height={691}
              className="w-full"
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Wand2 className="h-4 w-4" />
                Improved Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A rewritten, professional version of your prompt, ready to copy and paste anywhere.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ListChecks className="h-4 w-4" />
                Improvements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A plain-English list of exactly what changed and why, so you learn as you go.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <HelpCircle className="h-4 w-4" />
                Missing Context
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The ambiguities and gaps in your original prompt that were worth flagging.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              General pointers for writing sharper prompts, tailored to your specific case.
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="overflow-hidden rounded-xl border">
            <Image
              src="/demo-results.jpg"
              alt="The four result cards: Improved Prompt, Improvements, Missing Context and Tips"
              width={1568}
              height={691}
              className="w-full"
            />
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" />
            Choose between Gemini, GPT and Claude models via OpenRouter — with live token count, response time and remaining budget.
          </p>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-1 border-t px-4 py-6 text-sm text-muted-foreground">
        <a href="https://vibe-portfolio-one.vercel.app/">Created by Bruno Rendeiro</a>
        <span>⚡ Powered by AI</span>
      </footer>
    </>
  );
}
