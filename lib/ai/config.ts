import OpenAI from "openai";

export const llmClient = new OpenAI({
  apiKey: process.env.LLM_API_KEY || "",
  baseURL: process.env.LLM_BASE_URL || "https://api.studio.nebius.com/v1",
});

export const MODELS = {
  fast: process.env.LLM_MODEL_FAST || "meta-llama/Meta-Llama-3.1-8B-Instruct",
  smart: process.env.LLM_MODEL || "meta-llama/Meta-Llama-3.1-70B-Instruct",
} as const;

export type ModelTier = keyof typeof MODELS;

export function selectModel(query: string): ModelTier {
  const complexPatterns = [
    /strategy/i,
    /architecture/i,
    /business model/i,
    /fundrais/i,
    /pitch/i,
    /legal/i,
    /financial/i,
    /compete/i,
    /market analysis/i,
    /pivot/i,
    /valuation/i,
    /term sheet/i,
    /equity/i,
  ];

  const isComplex = complexPatterns.some((p) => p.test(query));
  return isComplex ? "smart" : "fast";
}
