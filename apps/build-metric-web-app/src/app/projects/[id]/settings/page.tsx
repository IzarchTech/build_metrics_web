"use client";

import { Loader } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import ProjectSettingsHeader from "./_components/project-settings-header";
import UpdateProjectForm from "./_components/update-project-form";
import { useProduct } from "@/app/projects/_hooks/project.hook";
import { Fragment } from "react";

/**
 * The ProjectSettingsPage component displays the settings for a project.
 *
 * It fetches the project with the given ID from the database and displays the
 * project settings. If the project is not found, it displays a 404 page.
 *
 * @returns The project settings page component.
 */
function ProjectSettingsPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { project, isLoading } = useProduct(id);

  // If the project is loading, display a loading animation
  if (isLoading)
    return (
      <div className="container flex mx-auto h-full items-center justify-center row-start-2">
        <Loader className="animate-spin size-12" />
      </div>
    );

  // If the project is not found, display a 404 page
  if (project == undefined) {
    notFound();
  }

  // Display the project settings
  return (
    <Fragment>
      <ProjectSettingsHeader project={project} />
      <div className="flex px-4">
        <UpdateProjectForm project={project} />
      </div>
    </Fragment>
  );
}

export default ProjectSettingsPage;
