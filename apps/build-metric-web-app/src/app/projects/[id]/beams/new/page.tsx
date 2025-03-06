"use client";

import NavigationHeader from "@/app/projects/_components/navigation-header";
import { Fragment } from "react";
import CreateNewRectangularBeamForm from "../_components/create-new-rectangular-beam-form";
import { useParams } from "next/navigation";

function CreateNewBeamPage() {
  const params = useParams<{ id: string }>();

  const { id } = params;

  return (
    <Fragment>
      <NavigationHeader
        title="Create New Beam"
        path={`/projects/${id}/beams`}
      />
      <CreateNewRectangularBeamForm projectId={id} />
    </Fragment>
  );
}

export default CreateNewBeamPage;
