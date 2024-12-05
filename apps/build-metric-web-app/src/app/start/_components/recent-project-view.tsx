"use client";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

function DeleteProjectButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleRemoveProject = async (id: string) => {
    try {
      setIsLoading(true);
      await db.projects.delete(id);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      return;
    }
  };
  return (
    <Button
      variant="link"
      size="icon"
      className="group"
      onClick={() => handleRemoveProject(id)}
      disabled={isLoading}
    >
      {isLoading && <Loader className="animate-spin size-6" />}

      {!isLoading && (
        <X className="size-6 group-hover:fill-red-500/90 group-hover:scale-110 group-hover:stroke-red-500 transition-all duration-300 ease-linear delay-150" />
      )}
    </Button>
  );
}

function RecentProjectView() {
  const projects = useLiveQuery(() =>
    db.projects.orderBy("updatedAt").reverse().limit(10).toArray(),
  );

  if (!projects) {
    return (
      <div className="w-full border p-2 pt-3 relative min-h-[100px] mt-6 md:mt-12 rounded-lg shadow-inner">
        <div className="absolute -top-3 bg-card left-4 font-bold text-sm uppercase">
          Recents
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Loader className="animate-spin size-6" />
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full border p-2 pt-3 relative min-h-[100px] mt-6 md:mt-12 rounded-lg shadow-inner flex items-center justify-center">
        <div className="absolute -top-3 bg-card left-4 font-bold text-sm uppercase">
          Recents
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm">No recent projects</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border p-2 pt-3 relative min-h-[100px] mt-6 md:mt-12 rounded-lg shadow-inner">
      <div className="absolute -top-3 bg-card left-4 font-bold text-sm uppercase">
        Recents
      </div>

      {projects && (
        <div className="w-full divide-y max-h-[300px] overflow-y-auto">
          {projects.map((project) => (
            <div
              className="w-full flex items-center justify-between"
              key={project.id}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/projects/${project.id}`}
                      className="w-full p-2 space-y hover:bg-muted transition-all ease-out duration-150 group cursor-pointer block"
                    >
                      <p className="font-semibold group-hover:tracking-widest duration-75 ease-out transition-all group-hover:animate-bounce line-clamp-1">
                        {project.name}
                      </p>
                      <p className="text-xs group-hover:text-[10px] italic group-hover:tracking-widest duration-75 ease-out transition-all">
                        last modified: {project.updatedAt.toLocaleString()}
                      </p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{project.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DeleteProjectButton id={project.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentProjectView;
