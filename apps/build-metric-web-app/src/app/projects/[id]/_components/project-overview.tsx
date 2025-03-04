import db from "@/lib/db";
import { BeamEntity, ProjectEntity } from "@/lib/types";
import { formatDateTime, formatNumber, parseParams } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React, { Fragment, ReactNode } from "react";
import RectangularBeam from "@repo/core/beam/rectangular-beam";

type BeamCalculations = {
  concreteVolume: number;
  areaOfFormwork: number;
};

async function calculateBeamMetrics(
  projectId: string,
): Promise<BeamCalculations> {
  const beams = await db.beams.where("projectId").equals(projectId).toArray();

  if (!beams.length)
    return {
      concreteVolume: 0,
      areaOfFormwork: 0,
    };

  const sumBeamProperty = (
    beams: BeamEntity[],
    calcFn: (beam: RectangularBeam) => number,
  ): number =>
    beams.reduce((acc, beam) => {
      const [width, depth, span] = parseParams<[number, number, number]>(
        beam.parameters,
      );
      const beamInstance = new RectangularBeam(width, depth, span);
      return acc + (beam.quantity || 1) * calcFn(beamInstance);
    }, 0);

  const concreteVolume = sumBeamProperty(beams, (beam) =>
    beam.getVolumeOfConcrete(),
  );
  const areaOfFormwork = sumBeamProperty(beams, (beam) =>
    beam.getAreaofFormwork(),
  );

  return { concreteVolume, areaOfFormwork };
}

function ProjectSummaryDetail({
  title,
  value,
}: Readonly<{ title: string; value: ReactNode }>) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <span className="font-black text-[10px] uppercase">{title}</span>
      <p className="text-lg select-text">{value}</p>
    </div>
  );
}

function ProjectSummaryDetails({
  project,
}: Readonly<{ project: ProjectEntity }>) {
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
      <ProjectSummaryDetail
        title="Project Description"
        value={project.description ?? "-"}
      />
      <ProjectSummaryDetail
        title="Date modified"
        value={formatDateTime(project.updatedAt)}
      />
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

function ProjectOverview({ project }: Readonly<{ project: ProjectEntity }>) {
  return (
    <div className="w-full">
      <ProjectSummaryDetails project={project} />
    </div>
  );
}

export default ProjectOverview;
