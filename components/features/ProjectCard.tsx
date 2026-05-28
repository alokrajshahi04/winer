"use client";

import { cn } from "@/lib/utils/cn";
import type { Project } from "@/lib/types";

const STATUS_STYLES: Record<Project["status"], { label: string; color: string }> = {
  idea: { label: "\ud83d\udca1 Idea", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  building: { label: "\ud83d\udee0\ufe0f Building", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  launched: { label: "\ud83d\ude80 Launched", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  scaling: { label: "\ud83d\udcc8 Scaling", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status = STATUS_STYLES[project.status];
  const completedMilestones = project.milestones.filter((m) => m.completed).length;

  return (
    <div className={cn("glass rounded-2xl p-5 glass-hover transition-all duration-200", className)}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-white">{project.name}</h3>
        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", status.color)}>
          {status.label}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded-md bg-surface-subtle text-xs text-gray-300">
            {tech}
          </span>
        ))}
      </div>
      {project.milestones.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-surface-subtle overflow-hidden">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${(completedMilestones / project.milestones.length) * 100}%` }} />
          </div>
          <span className="text-xs text-gray-500">{completedMilestones}/{project.milestones.length}</span>
        </div>
      )}
    </div>
  );
}
