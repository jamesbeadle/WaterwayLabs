import { idlFactory } from "../../../../declarations/backend";
import { ActorFactory } from "../../utils/ActorFactory";
import { isError } from "$lib/utils/helpers";
import type { DataHashes } from "../../../../declarations/backend/backend.did";

export class DataHashService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getDataHashes(): Promise<DataHashes | undefined> {
    const result = await this.actor.getDataHashes({});
    if (isError(result)) throw new Error("Failed to fetch data hashes");
    return result.ok;
  }
}
