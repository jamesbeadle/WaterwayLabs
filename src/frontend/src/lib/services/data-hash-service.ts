import { idlFactory } from "../../../../declarations/backend";
import { ActorFactory } from "../../utils/ActorFactory";
import { isError } from "$lib/utils/helpers";
import type { DataHashes } from "../../../../declarations/backend/backend.did";

export class DataHashService {
  private readonly actor: any;

  constructor() {
    const canisterId = process.env.BACKEND_CANISTER_ID;
    if (!canisterId) {
      throw new Error("Backend canister ID not found in environment variables");
    }

    this.actor = ActorFactory.createActor(idlFactory, canisterId);
  }

  async getDataHashes(): Promise<DataHashes> {
    const result = await this.actor.getDataHashes({});
    if (isError(result)) throw new Error("Failed to fetch data hashes");
    return result.ok;
  }
}
