"use client";

import { buttonVariants } from "@/components/ui/button";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft, Loader, SearchX } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ElementMenu from "./_components/element-menu";
import { useState } from "react";
import { Project } from "@/lib/types";

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
        <Loader className="animate-spin h-20" />
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
          >
            <ArrowLeft className="size-6" />
            <span>Go back</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex mx-auto h-full">
      <ElementMenu />
    </div>
  );
}

export default ProjectPage;
