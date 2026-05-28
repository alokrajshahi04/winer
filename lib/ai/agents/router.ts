import { llmClient, MODELS, selectModel, type ModelTier } from "../config";
import { buildCofounderSystemPrompt } from "../prompts/cofounder";
import type {
  UserProfile,
  Project,
  CofounderMode,
  UserContext,
  ConversationMessage,
} from "@/lib/types";

type AgentContext = {
  user?: UserProfile | null;
  projects?: Project[];
  contexts?: UserContext[];
  mode?: CofounderMode;
  conversationHistory?: ConversationMessage[];
};

export async function generateCofounderResponse(
  transcript: Array<{ role: "user" | "assistant"; content: string }>,
  context: AgentContext,
  options?: { forceModel?: ModelTier; signal?: AbortSignal }
) {
  const lastUserMessage =
    transcript.filter((m) => m.role === "user").pop()?.content || "";
  const modelTier = options?.forceModel || selectModel(lastUserMessage);

  const systemPrompt = buildCofounderSystemPrompt(
    context.user,
    context.projects,
    context.contexts,
    context.mode
  );

  const response = await llmClient.chat.completions.create(
    {
      model: MODELS[modelTier],
      messages: [
        { role: "system", content: systemPrompt },
        ...transcript.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.8,
    },
    { signal: options?.signal }
  );

  return response;
}

export async function generateAgentAction(
  prompt: string,
  context: string
): Promise<string> {
  const response = await llmClient.chat.completions.create({
    model: MODELS.fast,
    messages: [
      {
        role: "system",
        content: `You are an AI agent router. Based on the user's request and context, determine what action to take. Respond with a brief action plan. Context: ${context}`,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 200,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content || "";
}
