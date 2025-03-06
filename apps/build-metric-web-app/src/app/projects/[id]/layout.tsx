"use client";

import { ReactNode } from "react";
import { useProduct } from "@/app/projects/_hooks/project.hook";
import { notFound, useParams } from "next/navigation";
import { Loader } from "lucide-react";

function ProjectLayout({ children }: Readonly<{ children: ReactNode }>) {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { project, isLoading } = useProduct(id);

  // If the project is loading, display a loading animation
  if (isLoading)
    return (
      <div className="w-full flex mx-auto h-full items-center justify-center">
        <Loader className="animate-spin size-12" />
      </div>
    );

  // If the project is not found, display a 404 page
  if (project == undefined) {
    notFound();
  }

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr]">{children}</div>
  );
}

export default ProjectLayout;
