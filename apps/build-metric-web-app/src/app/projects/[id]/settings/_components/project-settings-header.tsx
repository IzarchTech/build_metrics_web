"use client";

import { ProjectEntity } from "@/lib/types";
import BackButton from "@/app/projects/_components/back-button";

/**
 * The ProjectSettingsHeader component displays the header for the project settings page.
 * It includes a back button to go back to the project page.
 *
 * @param project - The project entity containing project details.
 */
function ProjectSettingsHeader({
  project,
}: Readonly<{ project: ProjectEntity }>) {
  return (
    <div className="w-full p-4 md:p-6 flex gap-2 border-b select-none">
      {/* A back button to go back to the project page */}
      <BackButton href={`/projects/${project.id}`} />
      {/* The title of the page */}
      <h3 className="uppercase">Settings</h3>
    </div>
  );
}

export default ProjectSettingsHeader;
