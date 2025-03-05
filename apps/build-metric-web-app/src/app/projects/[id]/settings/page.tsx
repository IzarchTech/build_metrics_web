"use client";

import db from "@/lib/db";
import { ProjectEntity } from "@/lib/types";
import { useLiveQuery } from "dexie-react-hooks";
import { Loader } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import ProjectSettingsHeader from "./_components/project-settings-header";
import UpdateProjectForm from "./_components/update-project-form";

/**
 * The ProjectSettingsPage component displays the settings for a project.
 *
 * It fetches the project with the given ID from the database and displays the
 * project settings. If the project is not found, it displays a 404 page.
 *
 * @returns The project settings page component.
 */
function ProjectSettingsPage() {
  const params = useParams();
  const { id } = params;

  // The state of the project
  const [project, setProject] = useState<ProjectEntity>();
  // The loading state
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the project from the database
  useLiveQuery(
    () =>
      db.projects
        .get(id as string)
        .then((p) => setProject(p))
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false)),
    [id],
  );

  // If the project is loading, display a loading animation
  if (isLoading)
    return (
      <div className="container flex mx-auto h-full items-center justify-center">
        <Loader className="animate-spin size-12" />
      </div>
    );

  // If the project is not found, display a 404 page
  if (project == undefined) {
    notFound();
  }

  // Display the project settings
  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr]">
      <ProjectSettingsHeader project={project} />
      <div className="flex px-4">
        <UpdateProjectForm project={project} />
      </div>
    </div>
  );
}

export default ProjectSettingsPage;
