"use client";

import db from "@/lib/db";
import { useRouter } from "next/navigation";
import { v7 as uuid } from "uuid";
import { useState } from "react";
import MenuButton from "@/components/ui/menu-button";
import { File } from "lucide-react";

/**
 * The NewProjectButton component renders a button that, when clicked,
 * creates a new project and navigates to that project's page.
 */
function NewProjectButton() {
  const [isLoading, setIsLoading] = useState(false); // State to indicate if the project is being created

  const router = useRouter(); // Hook for navigation

  /**
   * Asynchronously creates a new project in the database and navigates to its page.
   */
  const createNewProject = async () => {
    setIsLoading(true);
    try {
      // Record the current time for timestamps
      const createTime = new Date();

      // Create a new project with a unique ID and current timestamps
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
        description: null, // Initial description is null
      });

      // Navigate to the newly created project page
      router.push(`/projects/${id}`);
    } catch (e) {
      console.error(e); // Log any errors that occur
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <MenuButton
      text="New"
      onClick={createNewProject}
      renderIcon={() => (
        <File className="size-6 group-hover:fill-[#E2E2E2] group-hover:dark:fill-yellow-200 group-hover:dark:stroke-yellow-200 group-hover:stroke-[#E2E2E2] transition-all duration-300 ease-linear delay-150" />
      )}
      disabled={isLoading}
    />
  );
}

export default NewProjectButton;
