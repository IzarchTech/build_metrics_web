export type ProjectEntity = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BeamEntity = {
  id: string;
  projectId: string;
  name: string | null;
  type: "rectangular";
  parameters: string;
  quantity: number;
};
