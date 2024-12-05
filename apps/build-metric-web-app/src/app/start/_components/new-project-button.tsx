"use client";

import db from "@/lib/db";
import { useRouter } from "next/navigation";
import { v7 as uuid } from "uuid";
import { useState } from "react";
import MenuButton from "./menu-button";
import { File } from "lucide-react";

/**
 * New project button
 */
function NewProjectButton() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  /**
   * Creates a new project and navigates to it.
   */
  const createNewProject = async () => {
    setIsLoading(true);
    try {
      // Create a new project with a unique id
      const createTime = new Date();
      const id = await db.projects.add({
        id: uuid(),
        name: `Untitled Project ${createTime.toLocaleString(undefined, {
          day: "2-digit",
          year: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          formatMatcher: "best fit",
        })}`.replaceAll("/", "-"),
        createdAt: createTime,
        updatedAt: createTime,
        description: null,
      });

      // Navigate to the new project
      router.push(`/projects/${id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MenuButton
      text="New Project"
      onClick={createNewProject}
      render={() => (
        <File className="size-6 group-hover:fill-[#E2E2E2] group-hover:dark:fill-yellow-200 group-hover:dark:stroke-yellow-200 group-hover:stroke-[#E2E2E2] transition-all duration-300 ease-linear delay-150" />
      )}
      disabled={isLoading}
    />
  );
}

export default NewProjectButton;
