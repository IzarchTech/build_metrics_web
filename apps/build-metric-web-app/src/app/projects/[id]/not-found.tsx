"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectNotFound() {
  const { id } = useParams();
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
