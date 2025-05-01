import { writable } from "svelte/store";
import type {
  ApplicationLogs,
  CanisterInfo,
  CreateProject,
  GetApplicationLogs,
  GetCanisterInfo,
  GetProjectCanisters,
  Project,
  ProjectCanisters,
  UpdateProject,
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

  async function getApplicationLogs(
    dto: GetApplicationLogs,
  ): Promise<ApplicationLogs | undefined> {
    return new ProjectService().getApplicationLogs(dto);
  }

  async function topupCanister(
    canisterId: string,
    cycles: bigint,
  ): Promise<any> {
    return new ProjectService().topupCanister(canisterId, cycles);
  }

  async function createProject(dto: CreateProject): Promise<any> {
    return new ProjectService().createProject(dto);
  }

  async function updateProject(dto: UpdateProject): Promise<any> {
    return new ProjectService().updateProject(dto);
  }

  return {
    subscribe,
    setProjects: (projects: Project[]) => set(projects),
    getProjectCanisters,
    getCanisterInfo,
    topupCanister,
    getApplicationLogs,
    createProject,
    updateProject,
  };
}

export const projectStore = createProjectStore();
