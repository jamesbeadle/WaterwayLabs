import { isError } from "$lib/utils/Helpers";
import { createActor } from "../../../../declarations/backend";
import type { TeamMemberDTO } from "../../../../declarations/backend/backend.did";

export class TeamService {
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

  async getTeamMembers(): Promise<TeamMemberDTO[]> {
    try {
      if (!this.actor) {
        throw new Error("Actor not initialized");
      }

      const result = await this.actor.getTeamMembers();

      if (isError(result)) {
        throw new Error("Failed to fetch team members");
      }

      return result.ok;
    } catch (error) {
      console.error("Error in getTeamMembers:", error);
      throw error;
    }
  }
}
