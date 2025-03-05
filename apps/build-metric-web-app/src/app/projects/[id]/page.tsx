"use client";

import db from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Loader } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { ProjectEntity } from "@/lib/types";
import ProjectHeader from "./_components/project-header";
import ProjectOverview from "./_components/project-overview";

/**
 * The ProjectPage component displays the page for a single project.
 * It fetches the project with the given ID from the database and displays the
 * project details. If the project is not found, it displays a 404 page.
 *
 * @returns The project page component.
 */
function ProjectPage() {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState<ProjectEntity>();
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

  // If the project is found, display the project details
  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr]">
      <ProjectHeader project={project} setProject={setProject} />
      <div className="flex flex-col overflow-y-auto">
        <ProjectOverview project={project} />
      </div>
    </div>
  );
}

export default ProjectPage;
