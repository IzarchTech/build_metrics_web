"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft, Loader, Plus, SearchX } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ElementMenu from "./_components/element-menu";
import { useState } from "react";
import { Project } from "@/lib/types";
import ProjectHeader from "./_components/project-header";

function ProjectPage() {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState<Project>();
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
    <div className="w-full h-full grid grid-rows-[auto_1fr] relative">
      <ProjectHeader project={project} setProject={setProject} />
      <div className="container flex flex-col">
        <ElementMenu />
      </div>

      <Button className="fixed bottom-12 right-10 p-0 size-12 bg-primary/80 text-primary-foreground flex items-center justify-center rounded-full shadow-lg hover:bg-primary/90 [&_svg]:size-6 group z-30">
        <Plus className="group-hover:scale-105 group-hover:rotate-45 duration-300 delay-75 transition-transform ease-linear" />
      </Button>
    </div>
  );
}

export default ProjectPage;
