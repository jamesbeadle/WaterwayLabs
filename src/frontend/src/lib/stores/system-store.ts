import { ActorFactory } from "../../utils/ActorFactory";
import type { GetCanistersDTO, CanisterType } from "../../types";
import { authStore } from "./auth-store";

export async function getCanisters(
  currentPage: number,
  itemsPerPage: number,
  filter: CanisterType,
): Promise<GetCanistersDTO | undefined> {
  try {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const limit = itemsPerPage;
    const offset = (currentPage - 1) * limit;

    let dto: GetCanistersDTO = {
      totalEntries: 0n,
      offset: BigInt(offset),
      limit: BigInt(limit),
      entries: [],
      canisterTypeFilter: filter,
    };

    let result = await identityActor.getCanisters(dto);

    if (isError(result)) {
      console.error("Error getting canisters:", result);
      return;
    }
    return result.ok;
  } catch (error) {
    console.error("Error getting canisters:", error);
    throw error;
  }
}

function isError(result: any): boolean {
  return result && result.err;
}
