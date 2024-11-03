import { isError } from "$lib/utils/Helpers";
import { idlFactory } from "../../../../declarations/backend";
import type { ProjectDTO } from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../../utils/ActorFactory";

export class ProjectService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getProjects(): Promise<ProjectDTO[]> {
    const result = await this.actor.getProjects();
    if (isError(result)) throw new Error("Failed to fetch projects.");
    return result.ok;
  }
}
