import { authStore } from "$lib/stores/auth-store";
import { isError, type ErrorResponse } from "$lib/utils/helpers";
import { ActorFactory } from "../../utils/ActorFactory";
import type {
  AddSupportQueryComment,
  CreateSupportQuery,
  GetArchivedSupportQueries,
  GetSupportQueries,
  GetUserSupportQueries,
  RemoveSupportQueryComment,
  SupportQueries,
} from "../../../../declarations/backend/backend.did";

export class SupportService {

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

  async getArchivedSupportQueries(
    dto: GetArchivedSupportQueries,
  ): Promise<SupportQueries | undefined> {
    await authStore.sync();
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getArchivedSupportQueries(dto);
    if (isError(result)) throw new Error("Failed to fetch archived support queries");
    return result.ok;
  }

  async getUserSupportQueries(
    dto: GetUserSupportQueries,
  ): Promise<SupportQueries | undefined> {
    await authStore.sync();
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getArchivedSupportQueries(dto);
    if (isError(result)) throw new Error("Failed to fetch user support queries");
    return result.ok;
  }

  async getArchivedUserSupportQueries(
    dto: GetArchivedSupportQueries,
  ): Promise<SupportQueries | undefined> {
    await authStore.sync();
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getArchivedUserSupportQueries(dto);
    if (isError(result)) throw new Error("Failed to fetch archived user support queries");
    return result.ok;
  }

  async createSupportQuery(
    dto: CreateSupportQuery,
  ): Promise<any | ErrorResponse> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.createSupportQuery(dto)) as any;
    if (isError(result)) throw new Error("Failed to create support query");
    return result.ok;
  }

  async addSupportQueryComment(
    dto: AddSupportQueryComment,
  ): Promise<any | ErrorResponse> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.addSupportQueryComment(dto)) as any;
    if (isError(result)) throw new Error("Failed to add support query comment");
    return result.ok;
  }

  async removeSupportQueryComment(
    dto: RemoveSupportQueryComment,
  ): Promise<any | ErrorResponse> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result = (await identityActor.removeSupportQueryComment(dto)) as any;
    if (isError(result)) throw new Error("Failed to remove support query comment");
    return result.ok;
  }
}
