import { optimizeResultSchema, type OptimizeResult } from "./schema";
import type { ModelId } from "./models";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const SYSTEM_PROMPT = `You are an expert prompt engineer. Given a user's draft prompt for an LLM, rewrite it into a clear, professional, ready-to-use prompt.

Respond with ONLY a JSON object matching this exact shape, no markdown fences, no extra text:
{
  "improvedPrompt": string,   // the rewritten, professional prompt
  "improvements": string[],   // concrete changes you made and why
  "missingContext": string[], // ambiguities or missing context in the original prompt
  "tips": string[]            // general tips for writing better prompts, relevant to this case
}`;

function authHeaders() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY is not configured");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.NEXTAUTH_URL ?? "https://vibe-portfolio-one.vercel.app",
    "X-Title": "AI Prompt Optimizer",
  };
}

export async function optimizePrompt(
  prompt: string,
  model: ModelId,
): Promise<{
  result: OptimizeResult;
  usage: { promptTokens: number; completionTokens: number; totalTokens: number; costUsd: number | null };
}> {
  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenRouter request failed (${res.status}): ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  const rawContent: string | undefined = data?.choices?.[0]?.message?.content;
  if (!rawContent) throw new Error("OpenRouter returned no content");

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawContent);
  } catch {
    throw new Error("Model did not return valid JSON");
  }

  const result = optimizeResultSchema.parse(parsedJson);

  const usage = data?.usage ?? {};
  return {
    result,
    usage: {
      promptTokens: usage.prompt_tokens ?? 0,
      completionTokens: usage.completion_tokens ?? 0,
      totalTokens: usage.total_tokens ?? 0,
      costUsd: typeof usage.cost === "number" ? usage.cost : null,
    },
  };
}

export async function getKeyBudget(): Promise<{ limit: number | null; remaining: number | null } | null> {
  try {
    const res = await fetch(`${OPENROUTER_BASE_URL}/key`, {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const info = data?.data ?? {};
    return {
      limit: typeof info.limit === "number" ? info.limit : null,
      remaining: typeof info.limit_remaining === "number" ? info.limit_remaining : null,
    };
  } catch {
    return null;
  }
}
