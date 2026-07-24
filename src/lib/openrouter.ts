import { optimizeResultSchema, evaluateResultSchema, type OptimizeResult, type EvaluateResult } from "./schema";
import type { ModelId } from "./models";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const OPTIMIZE_SYSTEM_PROMPT = `You are an expert prompt engineer. Given a user's draft prompt for an LLM, rewrite it into a clear, professional, ready-to-use prompt.

Respond with ONLY a JSON object matching this exact shape, no markdown fences, no extra text:
{
  "improvedPrompt": string,   // the rewritten, professional prompt
  "improvements": string[],   // concrete changes you made and why
  "missingContext": string[], // ambiguities or missing context in the original prompt
  "tips": string[]            // general tips for writing better prompts, relevant to this case
}`;

const EVALUATE_SYSTEM_PROMPT = `You are an expert AI response evaluator. Given the original prompt and the response a model produced for it, evaluate the response critically and fairly.

Respond with ONLY a JSON object matching this exact shape, no markdown fences, no extra text:
{
  "score": number,                  // overall quality score from 0 to 100
  "instructionCompliance": string,  // how well the response followed the prompt's instructions
  "clarity": string,                // how clear and well-structured the response is
  "completeness": string,           // whether the response fully addresses the prompt, and what's missing if not
  "relevance": string,              // how relevant the response is to what was actually asked
  "hallucinations": string,         // any fabricated, unsupported, or inaccurate claims found, or "None detected"
  "strengths": string[],            // what the response did well
  "improvements": string[]          // concrete ways the response could be improved
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

type Usage = { promptTokens: number; completionTokens: number; totalTokens: number; costUsd: number | null };

async function callOpenRouter(model: ModelId, systemPrompt: string, userContent: string) {
  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
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

  const usageRaw = data?.usage ?? {};
  const usage: Usage = {
    promptTokens: usageRaw.prompt_tokens ?? 0,
    completionTokens: usageRaw.completion_tokens ?? 0,
    totalTokens: usageRaw.total_tokens ?? 0,
    costUsd: typeof usageRaw.cost === "number" ? usageRaw.cost : null,
  };

  return { parsedJson, usage };
}

export async function optimizePrompt(
  prompt: string,
  model: ModelId,
): Promise<{ result: OptimizeResult; usage: Usage }> {
  const { parsedJson, usage } = await callOpenRouter(model, OPTIMIZE_SYSTEM_PROMPT, prompt);
  const result = optimizeResultSchema.parse(parsedJson);
  return { result, usage };
}

export async function evaluateResponse(
  prompt: string,
  response: string,
  model: ModelId,
): Promise<{ result: EvaluateResult; usage: Usage }> {
  const userContent = `Original prompt:\n${prompt}\n\nResponse to evaluate:\n${response}`;
  const { parsedJson, usage } = await callOpenRouter(model, EVALUATE_SYSTEM_PROMPT, userContent);
  const result = evaluateResultSchema.parse(parsedJson);
  return { result, usage };
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
