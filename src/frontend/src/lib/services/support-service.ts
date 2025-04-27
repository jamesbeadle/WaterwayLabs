import { authStore } from "$lib/stores/auth-store";
import { isError, type ErrorResponse } from "$lib/utils/helpers";
import type {
  CreateSupportQuery,
  GetSupportQueries,
  SupportQueries,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../../utils/ActorFactory";
import { idlFactory } from "../../../../declarations/backend";

export class SupportService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async createSupportQuery(
    dto: CreateSupportQuery,
  ): Promise<any | ErrorResponse> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.createSupportQuery(dto)) as any;
    if (isError(result)) throw new Error("Failed to topup canister");
    return result.ok;
  }

  async getSupportQueries(
    dto: GetSupportQueries,
  ): Promise<SupportQueries | undefined> {
    await authStore.sync();
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getSupportQueries(dto);
    if (isError(result)) throw new Error("Failed to fetch support queries");
    return result.ok;
  }
}
