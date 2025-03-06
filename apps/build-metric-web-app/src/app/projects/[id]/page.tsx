"use client";

import { Loader } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import ProjectHeader from "./_components/project-header";
import ProjectOverview from "./_components/project-overview";
import { useProduct } from "@/app/projects/_hooks/project.hook";
import { Fragment } from "react";

/**
 * The ProjectPage component displays the page for a single project.
 * It fetches the project with the given ID from the database and displays the
 * project details. If the project is not found, it displays a 404 page.
 *
 * @returns The project page component.
 */
function ProjectPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { isLoading, project, setProject } = useProduct(id);

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

  // If the project is found, display the project details
  return (
    <Fragment>
      <ProjectHeader project={project} setProject={setProject} />
      <div className="flex flex-col overflow-y-auto">
        <ProjectOverview project={project} />
      </div>
    </Fragment>
  );
}

export default ProjectPage;
