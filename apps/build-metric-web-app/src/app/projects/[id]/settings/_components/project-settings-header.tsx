import { useRouter } from "next/navigation";
import { ProjectEntity } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function ProjectSettingsHeader({
  project,
}: Readonly<{ project: ProjectEntity }>) {
  const router = useRouter();

  return (
    <div className="w-full p-4 md:p-6 flex gap-2 border-b select-none">
      <Button
        variant="ghost"
        aria-label="Go back"
        className="hover:outline outline-primary/90 hover:bg-primary/90 hover:text-primary-foreground ease-in-out duration-300 transition-all group"
        onClick={() => router.push(`/projects/${project.id}`)}
      >
        <ArrowLeft className="size-6 group-hover:rotate-90 ease-linear duration-300 delay-75 transition-transform" />
        <span className="sr-only">Go back</span>
      </Button>
      <h3 className="uppercase">Settings</h3>
    </div>
  );
}

export default ProjectSettingsHeader;
