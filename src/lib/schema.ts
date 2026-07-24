import { z } from "zod";
import { MODEL_IDS } from "./models";

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
  usage: z.object({
    promptTokens: z.number(),
    completionTokens: z.number(),
    totalTokens: z.number(),
    costUsd: z.number().nullable(),
  }),
  elapsedMs: z.number(),
  budget: z
    .object({
      limit: z.number().nullable(),
      remaining: z.number().nullable(),
    })
    .nullable(),
});

export type OptimizeResponse = z.infer<typeof optimizeResponseSchema>;
