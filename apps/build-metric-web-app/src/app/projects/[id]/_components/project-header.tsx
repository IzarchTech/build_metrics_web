"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/lib/db";
import { ProjectEntity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, Cog, Printer, Trash } from "lucide-react";
import Link from "next/link";
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
  project: ProjectEntity;
  setProject: Dispatch<SetStateAction<ProjectEntity | undefined>>;
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
    <div className="w-full p-4 md:p-6 flex gap-2 border-b">
      <Button
        variant="ghost"
        aria-label="Go back"
        className="hover:outline outline-primary/90 hover:bg-primary/90 hover:text-primary-foreground ease-in-out duration-300 transition-all group"
        onClick={() => router.push("/start")}
      >
        <ArrowLeft className="size-6 group-hover:rotate-90 ease-linear duration-300 delay-75 transition-transform" />
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
      <Link
        href={`${project.id}/settings`}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "group",
        )}
      >
        <Cog className="group-hover:animate-spin" />
        <span className="sr-only">Settings</span>
      </Link>
      <Button variant="outline" size="icon" disabled>
        <Printer />
        <span className="sr-only">Print</span>
      </Button>
      <Button variant="destructive" size="icon">
        <Trash />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default ProjectHeader;
