"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/features/ProjectCard";
import type { Project } from "@/lib/types";

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    userId: "user-1",
    name: "Winer",
    description: "AI Co-founder — voice-first startup partner powered by ElevenLabs Speech Engine",
    status: "building",
    stack: ["Next.js", "ElevenLabs", "Nebius", "Appwrite"],
    milestones: [
      { id: "m1", title: "MVP voice conversation", completed: true },
      { id: "m2", title: "Context import system", completed: true },
      { id: "m3", title: "Agent routing", completed: false },
      { id: "m4", title: "Hackathon submission", completed: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", stack: "" });

  const handleAddProject = () => {
    if (!newProject.name) return;
    const project: Project = {
      id: Date.now().toString(),
      userId: "user-1",
      name: newProject.name,
      description: newProject.description,
      status: "idea",
      stack: newProject.stack.split(",").map((s) => s.trim()).filter(Boolean),
      milestones: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([...projects, project]);
    setNewProject({ name: "", description: "", stack: "" });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">Your co-founder knows these. Add more for better context.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant={showAddForm ? "ghost" : "primary"}>
          {showAddForm ? "Cancel" : "+ Add project"}
        </Button>
      </div>
      {showAddForm && (
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Project name</label>
              <input value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="My awesome startup" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[80px]" placeholder="What are you building?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Tech stack (comma-separated)</label>
              <input value={newProject.stack} onChange={(e) => setNewProject({ ...newProject, stack: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="React, Node.js, PostgreSQL" />
            </div>
            <Button onClick={handleAddProject}>Add project</Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {projects.length === 0 && (
        <div className="text-center py-16">
          <span className="text-4xl">\ud83d\udcc1</span>
          <p className="text-gray-400 mt-4">No projects yet. Add one so your co-founder can help!</p>
        </div>
      )}
    </div>
  );
}
