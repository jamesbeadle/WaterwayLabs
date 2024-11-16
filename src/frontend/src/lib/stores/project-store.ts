import { writable } from "svelte/store";
import type {
  CanisterDTO,
  ProjectDTO,
} from "../../../../declarations/backend/backend.did";
import { ProjectService } from "$lib/services/project-service";

function createProjectStore() {
  const { subscribe, set } = writable<ProjectDTO[]>([]);

  async function getProjectCanisterInfo(
    projectId: number,
  ): Promise<CanisterDTO[]> {
    return new ProjectService().getProjectCanisterInfo(projectId);
  }

  async function topupCanister(
    canisterId: string,
    cycles: bigint,
  ): Promise<any> {
    return new ProjectService().topupCanister(canisterId, cycles);
  }

  return {
    subscribe,
    setProjects: (projects: ProjectDTO[]) => set(projects),
    getProjectCanisterInfo,
    topupCanister,
  };
}

export const projectStore = createProjectStore();
