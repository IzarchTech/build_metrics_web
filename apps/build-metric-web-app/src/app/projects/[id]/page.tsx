"use client";

import { buttonVariants } from "@/components/ui/button";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft, Loader, SearchX } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ProjectEntity } from "@/lib/types";
import ProjectHeader from "./_components/project-header";
import ProjectOverview from "./_components/project-overview";

function ProjectPage() {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState<ProjectEntity>();
  const [isLoading, setIsLoading] = useState(true);

  useLiveQuery(
    () =>
      db.projects
        .get(id as string)
        .then((p) => setProject(p))
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false)),
    [id],
  );

  if (isLoading)
    return (
      <div className="container flex mx-auto h-full items-center justify-center">
        <Loader className="animate-spin size-12" />
      </div>
    );

  if (project == undefined) {
    return (
      <div className="container flex mx-auto h-full items-center justify-center p-4">
        <div className="size-96 flex flex-col gap-2 justify-center items-center bg-secondary rounded-3xl text-secondary-foreground">
          <SearchX className="size-48 animate-pulse" />
          <p className="text-center text-sm w-[30ch]">
            Project with ID &quot;<span className="font-semibold">{id}</span>
            &quot; not found
          </p>
          <Link
            href="/start"
            className={cn(buttonVariants({ variant: "default" }))}
            replace
          >
            <ArrowLeft className="size-6" />
            <span>Go back</span>
          </Link>
        </div>
      </div>
    );
  }

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
