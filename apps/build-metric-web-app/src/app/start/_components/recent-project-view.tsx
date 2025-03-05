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

/**
 * A button to delete a project.
 * @param id The ID of the project to delete.
 */
function DeleteProjectButton({ id }: Readonly<{ id: string }>): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the deletion of a project.
   * @param id The ID of the project to delete.
   */
  const handleRemoveProject = (id: string) => {
    setIsLoading(true);
    // Delete the project from the database
    db.transaction("rw", db.projects, db.beams, async () => {
      await db.beams.where("projectId").equals(id).delete();
      await db.projects.delete(id);
    })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
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

      {/* If the project is not being deleted, show a red X */}
      {!isLoading && (
        <X
          className="size-6 group-hover:fill-red-500/90 group-hover:scale-110 group-hover:stroke-red-500 transition-all duration-300 ease-linear delay-150"
          aria-label="Delete project"
        />
      )}
    </Button>
  );
}

/**
 * The RecentWrapper component wraps a list of recent projects and adds a
 * background color and border to it.
 *
 * @param children - React node
 */
function RecentWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full border p-2 pt-3 relative min-h-[100px] mt-6 md:mt-12 rounded-lg shadow-inner">
      {/* An absolute positioned div that contains the label "Recents" */}
      <div className="absolute -top-3 bg-card left-4 font-bold text-sm uppercase">
        Recents
      </div>
      {children}
    </div>
  );
}

/**
 * The RecentProjectView component displays a list of the 10 most recently
 * modified projects in the database.
 */
function RecentProjectView() {
  /**
   * Fetches the 10 most recently modified projects from the database.
   */
  const projects = useLiveQuery(() =>
    db.projects.orderBy("updatedAt").reverse().limit(10).toArray(),
  );

  /**
   * If the projects list is loading, display a loading animation.
   */
  if (!projects) {
    return (
      <RecentWrapper>
        <div className="w-full h-full flex items-center justify-center">
          <Loader className="animate-spin size-6" />
        </div>
      </RecentWrapper>
    );
  }

  /**
   * If there are no projects, display a message.
   */
  if (projects.length === 0) {
    return (
      <RecentWrapper>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm">No recent projects</p>
        </div>
      </RecentWrapper>
    );
  }

  /**
   * Displays the list of projects.
   */
  return (
    <RecentWrapper>
      <div className="w-full divide-y h-[300px] overflow-y-auto">
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
        <div className="flex-1" />
      </div>
    </RecentWrapper>
  );
}

export default RecentProjectView;
