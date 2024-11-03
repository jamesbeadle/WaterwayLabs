import { writable } from "svelte/store";
import type { ProjectDTO } from "../../../../declarations/backend/backend.did";
import { ProjectService } from "$lib/services/project-service";

function createProjectStore() {
  const { subscribe, set } = writable<ProjectDTO[]>([]);

  return {
    subscribe,
    setProjects: (projects: ProjectDTO[]) => set(projects),
  };
}

export const projectStore = createProjectStore();
