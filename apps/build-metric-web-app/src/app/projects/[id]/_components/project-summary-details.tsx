import { BeamEntity, ProjectEntity } from "@/lib/types";
import { formatDateTime, formatNumber, parseParams } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { Fragment } from "react";
import { ProjectDescription } from "./project-description";
import { ProjectSummaryDetail } from "./project-summary-detail";
import RectangularBeam from "@repo/core/beam/rectangular-beam";
import db from "@/lib/db";

type BeamCalculations = {
  concreteVolume: number;
  areaOfFormwork: number;
};

/**
 * Calculates and returns the total concrete volume and total area of formwork of beams for the given project.
 *
 * @param projectId - The ID of the project for which to calculate the metrics.
 * @returns An object containing the total concrete volume and total area of formwork of beams for the project.
 */
async function calculateBeamMetrics(
  projectId: string,
): Promise<BeamCalculations> {
  // Fetch all beams for the project
  const beams = await db.beams.where("projectId").equals(projectId).toArray();

  // If the project has no beams, return 0s
  if (!beams.length)
    return {
      concreteVolume: 0,
      areaOfFormwork: 0,
    };

  /**
   * Calculates the sum of a given property of all beams in the project.
   *
   * @param beams - An array of BeamEntity objects.
   * @param calcFn - A callback function that takes a RectangularBeam object and returns the property to be summed.
   */
  const sumBeamProperty = (
    beams: BeamEntity[],
    calcFn: (beam: RectangularBeam) => number,
  ): number =>
    beams.reduce((acc, beam) => {
      // Unpack the parameters of the beam
      const [width, depth, span] = parseParams<[number, number, number]>(
        beam.parameters,
      );
      // Create a new instance of the beam
      const beamInstance = new RectangularBeam(width, depth, span);
      // Calculate the sum of the property
      return acc + (beam.quantity || 1) * calcFn(beamInstance);
    }, 0);

  // Calculate the total concrete volume
  const concreteVolume = sumBeamProperty(beams, (beam) =>
    beam.getVolumeOfConcrete(),
  );

  // Calculate the total area of formwork
  const areaOfFormwork = sumBeamProperty(beams, (beam) =>
    beam.getAreaofFormwork(),
  );

  // Return the results
  return { concreteVolume, areaOfFormwork };
}

/**
 * Component to display detailed summary of the project including description,
 * date modified, estimated concrete volume, and estimated area of formwork.
 *
 * @param project - The project entity containing details about the project.
 */
export function ProjectSummaryDetails({
  project,
}: Readonly<{ project: ProjectEntity }>) {
  // Use live query to fetch beam calculations for the project
  const beamCalculations = useLiveQuery(
    () => calculateBeamMetrics(project.id),
    [project.id],
  );

  // Handle the case where result might be undefined initially
  const { concreteVolume, areaOfFormwork } = beamCalculations ?? {
    concreteVolume: 0,
    areaOfFormwork: 0,
  };

  return (
    <div className="w-full grid grid-cols-2 grid-rows-2 border-y bg-secondary text-secondary-foreground divide-y divide-x select-none">
      {/* Display project description */}
      <ProjectSummaryDetail
        title="Project Description"
        value={<ProjectDescription description={project.description} />}
      />
      {/* Display date when the project was last modified */}
      <ProjectSummaryDetail
        title="Date modified"
        value={formatDateTime(project.updatedAt)}
      />
      {/* Display estimated concrete volume */}
      <ProjectSummaryDetail
        title="Est. Concrete Volume"
        value={
          <Fragment>
            {formatNumber(concreteVolume)}
            <span className="select-none">
              m<sup>3</sup>
            </span>
          </Fragment>
        }
      />
      {/* Display estimated area of formwork */}
      <ProjectSummaryDetail
        title="Est. Area of Formwork"
        value={
          <Fragment>
            {formatNumber(areaOfFormwork)}
            <span className="select-none">
              m<sup>2</sup>
            </span>
          </Fragment>
        }
      />
    </div>
  );
}
