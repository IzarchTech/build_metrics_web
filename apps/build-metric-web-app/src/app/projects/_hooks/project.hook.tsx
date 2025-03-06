"use client";

import { useState } from "react";
import { ProjectEntity } from "@/lib/types";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/lib/db";
import { toast } from "sonner";

/**
 * Custom hook to fetch and manage the state of a project by its ID.
 *
 * @param id - The ID of the project to be fetched.
 * @returns An object containing the project entity, a loading state, and a setter for the project.
 */
export function useProduct(id: string) {
  const [project, setProject] = useState<ProjectEntity>(); // State to store the project entity
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Use live query to fetch the project from the database when the ID changes
  useLiveQuery(
    () =>
      db.projects
        .get(id)
        .then((p) => setProject(p)) // Update the project state on successful fetch
        .catch((e) => {
          console.error(e); // Log any errors
          toast.error(`Error fetching project with ID ${id}`, {
            position: "top-right",
          }); // Display error notification
        })
        .finally(() => setIsLoading(false)), // Set loading to false once the operation completes
    [id], // Dependency array to re-run the query when ID changes
  );

  return { project, isLoading, setProject }; // Return the project state, loading status, and setter
}
