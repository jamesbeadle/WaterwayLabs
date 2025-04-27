import { writable } from "svelte/store";
import type {
  CanisterInfo,
  GetCanisterInfo,
  GetProjectCanisters,
  Project,
  ProjectCanisters,
} from "../../../../declarations/backend/backend.did";
import { ProjectService } from "$lib/services/project-service";

function createProjectStore() {
  const { subscribe, set } = writable<Project[]>([]);

  async function getProjectCanisters(
    dto: GetProjectCanisters,
  ): Promise<ProjectCanisters | undefined> {
    return new ProjectService().getProjectCanisters(dto);
  }

  async function getCanisterInfo(
    dto: GetCanisterInfo,
  ): Promise<CanisterInfo | undefined> {
    return new ProjectService().getCanisterInfo(dto);
  }

  async function topupCanister(
    canisterId: string,
    cycles: bigint,
  ): Promise<any> {
    return new ProjectService().topupCanister(canisterId, cycles);
  }

  return {
    subscribe,
    setProjects: (projects: Project[]) => set(projects),
    getProjectCanisters,
    getCanisterInfo,
    topupCanister,
  };
}

export const projectStore = createProjectStore();
