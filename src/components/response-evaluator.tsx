"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ClipboardCheck,
  ListChecks,
  AlertTriangle,
  ThumbsUp,
  Wrench,
  Gauge,
  Coins,
  Hash,
  DollarSign,
  Sparkles,
  Ruler,
  Target,
} from "lucide-react";
import { MODELS, DEFAULT_MODEL, type ModelId } from "@/lib/models";
import type { EvaluateApiResponse } from "@/lib/schema";
import { ui, type Locale } from "@/lib/i18n";

export function ResponseEvaluator({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EvaluateApiResponse | null>(null);

  async function handleEvaluate() {
    if (!prompt.trim() || !response.trim() || loading) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, response, model }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong");
      }
      setData(json as EvaluateApiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const scoreColor =
    data && data.result.score >= 80
      ? "text-green-500"
      : data && data.result.score >= 50
        ? "text-yellow-500"
        : "text-destructive";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">AI Prompt Optimizer</h1>
        <p className="text-muted-foreground">{t.evalSubtitle}</p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex flex-col gap-1.5">
            <Label className="text-muted-foreground">{t.originalPromptPlaceholder}</Label>
            <Textarea
              placeholder={t.originalPromptPlaceholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-28 resize-y text-base"
              maxLength={6000}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-muted-foreground">{t.responsePlaceholder}</Label>
            <Textarea
              placeholder={t.responsePlaceholder}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-36 resize-y text-base"
              maxLength={8000}
            />
          </div>
          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Select value={model} onValueChange={(v) => setModel(v as ModelId)}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue>
                  {(value: ModelId) => MODELS.find((m) => m.id === value)?.label ?? value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    <div className="flex flex-col py-0.5">
                      <span>{m.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {t.perMillionTokens(`$${m.pricePerMillion.prompt.toFixed(2)}`, `$${m.pricePerMillion.completion.toFixed(2)}`)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleEvaluate}
              disabled={!prompt.trim() || !response.trim() || loading}
              size="lg"
              className="gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardCheck className="h-4 w-4" />}
              {loading ? t.evaluatingButton : t.evaluateButton}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {data && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            {data.usage.costUsd != null && (
              <Badge variant="secondary" className="gap-1.5">
                <DollarSign className="h-3 w-3" />
                ${data.usage.costUsd.toFixed(4)} {t.thisCall}
              </Badge>
            )}
            <Badge variant="secondary" className="gap-1.5">
              <Hash className="h-3 w-3" />
              {t.tokens(data.usage.totalTokens, data.usage.promptTokens, data.usage.completionTokens)}
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Gauge className="h-3 w-3" />
              {(data.elapsedMs / 1000).toFixed(1)}s
            </Badge>
            {data.budget?.remaining != null && (
              <Badge variant="secondary" className="gap-1.5">
                <Coins className="h-3 w-3" />
                {t.left(`$${data.budget.remaining.toFixed(2)}`, data.budget.limit != null ? `$${data.budget.limit.toFixed(2)}` : null)}
              </Badge>
            )}
          </div>

          <Card>
            <CardContent className="flex flex-col items-center gap-1 pt-6 pb-5">
              <span className="text-sm text-muted-foreground">{t.scoreLabel}</span>
              <span className={`text-5xl font-semibold tracking-tight ${scoreColor}`}>{data.result.score}</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DimensionCard icon={<Target className="h-4 w-4" />} title={t.instructionComplianceTitle} text={data.result.instructionCompliance} />
            <DimensionCard icon={<Sparkles className="h-4 w-4" />} title={t.clarityTitle} text={data.result.clarity} />
            <DimensionCard icon={<ListChecks className="h-4 w-4" />} title={t.completenessTitle} text={data.result.completeness} />
            <DimensionCard icon={<Ruler className="h-4 w-4" />} title={t.relevanceTitle} text={data.result.relevance} />
            <DimensionCard
              icon={<AlertTriangle className="h-4 w-4" />}
              title={t.hallucinationsTitle}
              text={data.result.hallucinations}
              className="sm:col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ListCard icon={<ThumbsUp className="h-4 w-4" />} title={t.strengthsTitle} items={data.result.strengths} emptyText={t.nothingToReport} />
            <ListCard icon={<Wrench className="h-4 w-4" />} title={t.evalImprovementsTitle} items={data.result.improvements} emptyText={t.nothingToReport} />
          </div>
        </>
      )}
    </div>
  );
}

function DimensionCard({
  icon,
  title,
  text,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}

function ListCard({
  icon,
  title,
  items,
  emptyText,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        )}
      </CardContent>
    </Card>
  );
}
