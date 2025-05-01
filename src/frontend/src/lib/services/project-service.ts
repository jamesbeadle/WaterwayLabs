import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  ApplicationLogs,
  CanisterInfo,
  CreateProject,
  GetApplicationLogs,
  GetCanisterInfo,
  GetProjectCanisters,
  ProjectCanisters,
  Projects,
  UpdateProject,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../../utils/ActorFactory";

export class ProjectService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getProjects(): Promise<Projects | undefined> {
    const result = await this.actor.getProjects({});
    if (isError(result)) throw new Error("Failed to fetch projects");
    return result.ok;
  }

  async getProjectCanisters(
    dto: GetProjectCanisters,
  ): Promise<ProjectCanisters | undefined> {
    const result = await this.actor.getProjectCanisters(dto);
    if (isError(result)) throw new Error("Failed to fetch project canisters");
    return result.ok;
  }

  async getCanisterInfo(
    dto: GetCanisterInfo,
  ): Promise<CanisterInfo | undefined> {
    const result = await this.actor.getCanisterInfo(dto);
    if (isError(result))
      throw new Error("Failed to fetch project canister info");
    return result.ok;
  }

  async getApplicationLogs(
    dto: GetApplicationLogs,
  ): Promise<ApplicationLogs | undefined> {
    const result = await this.actor.getApplicationLogs(dto);
    if (isError(result)) throw new Error("Failed to fetch application logs");
    return result.ok;
  }

  async topupCanister(canisterId: string, cycles: bigint): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.topupCanister(
      canisterId,
      cycles,
    )) as any;
    if (isError(result)) throw new Error("Failed to topup canister");
    return result.ok;
  }

  async createProject(dto: CreateProject): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.createProject(dto)) as any;
    if (isError(result)) throw new Error("Failed to create project");
    return result.ok;
  }

  async updateProject(dto: UpdateProject): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.updateProject(dto)) as any;
    if (isError(result)) throw new Error("Failed to update project");
    return result.ok;
  }
}
