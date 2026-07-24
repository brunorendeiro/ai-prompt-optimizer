"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  Wand2,
  Copy,
  Check,
  ListChecks,
  HelpCircle,
  Lightbulb,
  Gauge,
  Coins,
  Hash,
} from "lucide-react";
import { MODELS, DEFAULT_MODEL, type ModelId } from "@/lib/models";
import type { OptimizeResponse } from "@/lib/schema";

export function Optimizer() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OptimizeResponse | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleOptimize() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong");
      }
      setData(json as OptimizeResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!data) return;
    await navigator.clipboard.writeText(data.result.improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">AI Prompt Optimizer</h1>
        <p className="text-muted-foreground">
          Paste a rough prompt and get a clearer, professional, ready-to-use version.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <Textarea
            placeholder="Paste your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-48 resize-y text-base"
            maxLength={6000}
          />
          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Select value={model} onValueChange={(v) => setModel(v as ModelId)}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue>
                  {(value: ModelId) => MODELS.find((m) => m.id === value)?.label ?? value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleOptimize} disabled={!prompt.trim() || loading} size="lg" className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {loading ? "Optimizing..." : "Optimize Prompt"}
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
            <Badge variant="secondary" className="gap-1.5">
              <Hash className="h-3 w-3" />
              {data.usage.totalTokens} tokens ({data.usage.promptTokens} in / {data.usage.completionTokens} out)
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Gauge className="h-3 w-3" />
              {(data.elapsedMs / 1000).toFixed(1)}s
            </Badge>
            {data.budget?.remaining != null && (
              <Badge variant="secondary" className="gap-1.5">
                <Coins className="h-3 w-3" />
                ${data.budget.remaining.toFixed(2)} left{data.budget.limit != null ? ` of $${data.budget.limit.toFixed(2)}` : ""}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wand2 className="h-4 w-4" />
                  Improved Prompt
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{data.result.improvedPrompt}</p>
              </CardContent>
            </Card>

            <ResultCard icon={<ListChecks className="h-4 w-4" />} title="Improvements" items={data.result.improvements} />
            <ResultCard icon={<HelpCircle className="h-4 w-4" />} title="Missing Context" items={data.result.missingContext} />
            <ResultCard
              icon={<Lightbulb className="h-4 w-4" />}
              title="Tips"
              items={data.result.tips}
              className="md:col-span-2"
            />
          </div>
        </>
      )}
    </div>
  );
}

function ResultCard({
  icon,
  title,
  items,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
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
        {items.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nothing to report.</p>
        )}
      </CardContent>
    </Card>
  );
}
