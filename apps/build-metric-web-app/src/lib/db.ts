import Dexie, { type EntityTable } from "dexie";
import { Project, BeamEntity } from "./types";

const db = new Dexie("build-metric-web-app-db") as Dexie & {
  projects: EntityTable<Project, "id">;
  beams: EntityTable<BeamEntity, "id">;
};

db.version(1).stores({
  projects: "id, name*, description, createdAt, updatedAt",
  beams: "id, projectId*, name, parameters, type, quantity",
});

export default db;
