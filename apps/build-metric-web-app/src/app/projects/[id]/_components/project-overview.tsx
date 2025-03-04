import { ProjectEntity } from "@/lib/types";
import { ProjectSummaryDetails } from "./project-summary-details";

/**
 * The ProjectOverview component displays an overview of the project.
 *
 * @param project - The project entity.
 */
function ProjectOverview({
  project,
}: Readonly<{ project: ProjectEntity }>): JSX.Element {
  return (
    <div className="w-full">
      {/* The ProjectSummaryDetails component will display a summary of the project. */}
      <ProjectSummaryDetails project={project} />
    </div>
  );
}

export default ProjectOverview;
