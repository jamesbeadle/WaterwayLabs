import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type { Projects } from "../../../../declarations/backend/backend.did";
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
    console.log(result);
    if (isError(result)) throw new Error("Failed to fetch projects");
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
}
