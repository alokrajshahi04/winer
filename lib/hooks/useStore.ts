"use client";

import { create } from "zustand";
import type { UserProfile, Project, CofounderMode, VoiceSessionState } from "@/lib/types";

type AppStore = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  voiceState: VoiceSessionState;
  setVoiceState: (state: VoiceSessionState) => void;
  cofounderMode: CofounderMode | undefined;
  setCofounderMode: (mode: CofounderMode | undefined) => void;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
};

export const useStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((s) => ({ projects: [...s.projects, project] })),
  voiceState: "idle",
  setVoiceState: (voiceState) => set({ voiceState }),
  cofounderMode: undefined,
  setCofounderMode: (cofounderMode) => set({ cofounderMode }),
  isAuthenticated: false,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
