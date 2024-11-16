import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type { TeamMemberDTO } from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../../utils/ActorFactory";

export class TeamService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getTeamMembers(): Promise<TeamMemberDTO[]> {
    const result = await this.actor.getTeamMembers();
    if (isError(result)) throw new Error("Failed to fetch team members");
    return result.ok;
  }
}
