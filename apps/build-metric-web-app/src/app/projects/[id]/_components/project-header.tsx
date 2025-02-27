"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/lib/db";
import { Project } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useRef,
  ChangeEvent,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { toast } from "sonner";

function ProjectHeader({
  setProject,
  project,
}: Readonly<{
  project: Project;
  setProject: Dispatch<SetStateAction<Project | undefined>>;
}>) {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const handleProjectNameChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newName = event.target.value;
    const trimmed = event.target.value.trim();

    if (project) {
      setProject({ ...project, name: newName });
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (trimmed.length === 0) {
          toast.warning("Project name cannot be empty", {
            position: "top-right",
          });
          return;
        }

        try {
          await db.projects.update(project.id, {
            name: trimmed,
            updatedAt: new Date(),
          });
        } catch {
          console.error("Failed to update project name");
        }
      }, 700);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);
  return (
    <div className="w-full p-6 flex gap-2 border-b">
      <Button
        variant="ghost"
        aria-label="Go back"
        className="hover:outline outline-primary/90 hover:bg-primary/90 hover:text-primary-foreground ease-in-out duration-300 transition-all group"
        onClick={() => router.push("/start")}
      >
        <ArrowLeft className="size-6 -rotate-90 group-hover:rotate-0 ease-linear duration-300 delay-75 transition-transform" />
        <span className="sr-only">Go back</span>
      </Button>
      <div className="flex-1">
        <Input
          className="font-semibold text-lg border-none shadow-none"
          value={project.name}
          onChange={handleProjectNameChange}
          placeholder="Project Name"
        />
        <span className="sr-only">{project.name}</span>
      </div>
    </div>
  );
}

export default ProjectHeader;
