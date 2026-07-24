import { z } from "zod";
import { MODEL_IDS } from "./models";

const usageSchema = z.object({
  promptTokens: z.number(),
  completionTokens: z.number(),
  totalTokens: z.number(),
  costUsd: z.number().nullable(),
});

const budgetSchema = z
  .object({
    limit: z.number().nullable(),
    remaining: z.number().nullable(),
  })
  .nullable();

export const optimizeRequestSchema = z.object({
  prompt: z.string().trim().min(1, "Prompt is empty").max(6000, "Prompt is too long (max 6000 characters)"),
  model: z.enum(MODEL_IDS),
});

export type OptimizeRequest = z.infer<typeof optimizeRequestSchema>;

export const optimizeResultSchema = z.object({
  improvedPrompt: z.string(),
  improvements: z.array(z.string()),
  missingContext: z.array(z.string()),
  tips: z.array(z.string()),
});

export type OptimizeResult = z.infer<typeof optimizeResultSchema>;

export const optimizeResponseSchema = z.object({
  result: optimizeResultSchema,
  usage: usageSchema,
  elapsedMs: z.number(),
  budget: budgetSchema,
});

export type OptimizeResponse = z.infer<typeof optimizeResponseSchema>;

export const evaluateRequestSchema = z.object({
  prompt: z.string().trim().min(1, "Original prompt is empty").max(6000, "Prompt is too long (max 6000 characters)"),
  response: z.string().trim().min(1, "Response is empty").max(8000, "Response is too long (max 8000 characters)"),
  model: z.enum(MODEL_IDS),
});

export type EvaluateRequest = z.infer<typeof evaluateRequestSchema>;

export const evaluateResultSchema = z.object({
  score: z.number().min(0).max(100),
  instructionCompliance: z.string(),
  clarity: z.string(),
  completeness: z.string(),
  relevance: z.string(),
  hallucinations: z.string(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
});

export type EvaluateResult = z.infer<typeof evaluateResultSchema>;

export const evaluateResponseSchema = z.object({
  result: evaluateResultSchema,
  usage: usageSchema,
  elapsedMs: z.number(),
  budget: budgetSchema,
});

export type EvaluateApiResponse = z.infer<typeof evaluateResponseSchema>;
