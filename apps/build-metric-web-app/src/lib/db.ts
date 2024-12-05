import Dexie, { type EntityTable } from "dexie";
import { Project } from "./types";

const db = new Dexie("build-metric-web-app-db") as Dexie & {
  projects: EntityTable<Project, "id">;
};

db.version(1).stores({
  projects: "id, name*, description, createdAt, updatedAt",
});

export default db;
