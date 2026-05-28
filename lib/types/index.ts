// ===========================================
// WINER — Core Type Definitions
// ===========================================

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  skills: string[];
  goals: string[];
  createdAt: string;
};

export type Project = {
  id: string;
  userId: string;
  name: string;
  description: string;
  status: "idea" | "building" | "launched" | "scaling";
  stack: string[];
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
};

export type Milestone = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
};

export type ConversationMessage = {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
  emotion?: CofounderEmotion;
};

export type Conversation = {
  id: string;
  userId: string;
  projectId?: string;
  messages: ConversationMessage[];
  summary?: string;
  createdAt: string;
};

export type UserContext = {
  id: string;
  userId: string;
  source: "manual" | "notion" | "import" | "ai_generated";
  category: "background" | "project" | "preference" | "skill" | "goal";
  content: string;
  createdAt: string;
};

export type CofounderEmotion =
  | "excited"
  | "thoughtful"
  | "concerned"
  | "encouraging"
  | "challenging"
  | "celebratory"
  | "focused"
  | "empathetic";

export type CofounderMode =
  | "brainstorm"
  | "review"
  | "strategy"
  | "debug"
  | "motivate"
  | "research";

export type AgentCapability = {
  name: string;
  description: string;
  endpoint?: string;
  enabled: boolean;
};

export type VoiceSessionState =
  | "idle"
  | "connecting"
  | "connected"
  | "speaking"
  | "listening"
  | "thinking"
  | "error";
