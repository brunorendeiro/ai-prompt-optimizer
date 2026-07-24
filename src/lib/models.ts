export const MODELS = [
  {
    id: "google/gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash Lite",
    pricePerMillion: { prompt: 0.1, completion: 0.4 },
  },
  {
    id: "openai/gpt-4.1-mini",
    label: "GPT-4.1 Mini",
    pricePerMillion: { prompt: 0.4, completion: 1.6 },
  },
  {
    id: "anthropic/claude-haiku-4.5",
    label: "Claude Haiku 4.5",
    pricePerMillion: { prompt: 1.0, completion: 5.0 },
  },
] as const;

export type ModelId = (typeof MODELS)[number]["id"];

export const MODEL_IDS = MODELS.map((m) => m.id) as [ModelId, ...ModelId[]];

export const DEFAULT_MODEL: ModelId = MODELS[0].id;
