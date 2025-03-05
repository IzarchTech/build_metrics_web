"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/lib/db";
import { ProjectEntity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Cog, Printer, Trash } from "lucide-react";
import Link from "next/link";
import {
  useRef,
  ChangeEvent,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { toast } from "sonner";
import BackButton from "@/app/projects/_components/back-button";

/**
 * The ProjectHeader component displays the header for a project.
 * It includes functionality to update the project name, navigate to the settings page, and more.
 *
 * @param setProject - Function to update the project state.
 * @param project - The project entity containing project details.
 */
function ProjectHeader({
  setProject,
  project,
}: Readonly<{
  project: ProjectEntity;
  setProject: Dispatch<SetStateAction<ProjectEntity | undefined>>;
}>) {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handles the change of the project name input field.
   * It updates the project name and debounces the update to the database.
   *
   * @param event - The change event of the input field.
   */
  const handleProjectNameChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newName = event.target.value;
    const trimmed = newName.trim();

    if (project) {
      // Update the project state with the new name
      setProject({ ...project, name: newName });
      // Clear the previous debounce timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Set a new debounce timeout to update the project name in the database
      debounceTimeout.current = setTimeout(async () => {
        // Check if the trimmed name is not empty
        if (trimmed.length === 0) {
          // If it is, show a toast message and return
          toast.warning("Project name cannot be empty", {
            position: "top-right",
          });
          return;
        }

        // Try to update the project name in the database
        try {
          await db.projects.update(project.id, {
            name: trimmed,
            updatedAt: new Date(),
          });
        } catch {
          // If it fails, log the error
          console.error("Failed to update project name");
        }
      }, 700);
    }
  };

  useEffect(() => {
    // Clean up the debounce timeout when the component is unmounted
    return () => {
      // If there is a current debounce timeout, clear it
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="w-full p-4 md:p-6 flex gap-2 border-b">
      {/* Button to navigate back to the start page */}
      <BackButton href="/start" />

      {/* Input field for the project name */}
      <div className="flex-1">
        <Input
          className="font-semibold text-lg border-none shadow-none"
          value={project.name}
          id="projectName"
          onChange={handleProjectNameChange}
          placeholder="Project Name"
        />
        <span className="sr-only">{project.name}</span>
      </div>

      {/* Link to navigate to the project settings */}
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

      {/* Button for print functionality (disabled) */}
      <Button variant="outline" size="icon" disabled>
        <Printer />
        <span className="sr-only">Print</span>
      </Button>

      {/* Button to delete the project */}
      <Button variant="destructive" size="icon">
        <Trash />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default ProjectHeader;
