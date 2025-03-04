import Dexie, { type EntityTable } from "dexie";
import { ProjectEntity, BeamEntity } from "./types";

const db = new Dexie("build-metric-web-app-db") as Dexie & {
  projects: EntityTable<ProjectEntity, "id">;
  beams: EntityTable<BeamEntity, "id">;
};

db.version(1).stores({
  projects: "id, name*, description, createdAt, updatedAt",
  beams: "id, projectId*, name, parameters, type, quantity",
});

export default db;
