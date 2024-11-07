import { isError } from "$lib/utils/Helpers";
import { createActor } from "../../../../declarations/backend";
import type { ProjectDTO } from "../../../../declarations/backend/backend.did";

export class ProjectService {
  private actor: any;

  constructor() {
    try {
      const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

      this.actor = createActor(canisterId, {
        agentOptions: {
          host: "http://127.0.0.1:4943",
        },
      });
    } catch (error) {
      console.error("Error in ProjectService constructor:", error);
      throw error;
    }
  }

  async getProjects(): Promise<ProjectDTO[]> {
    try {
      if (!this.actor) {
        throw new Error("Actor not initialized");
      }

      const result = await this.actor.getProjects();

      if (isError(result)) {
        throw new Error("Failed to fetch projects");
      }

      return result.ok;
    } catch (error) {
      console.error("Error in getProjects:", error);
      throw error;
    }
  }
}
