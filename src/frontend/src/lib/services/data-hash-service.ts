import { idlFactory } from "../../../../declarations/backend";
import { ActorFactory } from "../../utils/ActorFactory";
import type { DataHashDTO } from "../../../../declarations/backend/backend.did";
import { isError } from "$lib/utils/Helpers";

export class DataHashService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.OPENFPL_BACKEND_CANISTER_ID,
    );
  }

  async getDataHashes(): Promise<DataHashDTO[]> {
    const result = await this.actor.getDataHashes();
    if (isError(result)) throw new Error("Failed to fetch data hashes");
    return result.ok;
  }
}