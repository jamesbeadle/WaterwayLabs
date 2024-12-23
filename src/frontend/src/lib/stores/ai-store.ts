import { isError } from "$lib/utils/helpers";
import type {
  ManagerSnapshotDTO,
  FixtureDTO,
  PlayerDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../../utils/ActorFactory";
import { authStore } from "./auth-store";

function createAIStore() {
  async function getOpenFPLFantasyTeamSnapshots(): Promise<
    ManagerSnapshotDTO[]
  > {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getOpenFPLFantasyTeamSnapshots();

      return result;
    } catch (error) {
      console.error("Error getting fantasy team snapshots:", error);
      throw error;
    }
  }

  async function getLivePlayers(): Promise<PlayerDTO[]> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getLivePlayers();

      return result;
    } catch (error) {
      console.error("Error getting live players:", error);
      throw error;
    }
  }

  async function getSeasonFixtures(): Promise<FixtureDTO[]> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getSeasonFixtures();

      return result;
    } catch (error) {
      console.error("Error getting season fixtures:", error);
      throw error;
    }
  }

  return {
    getOpenFPLFantasyTeamSnapshots,
    getLivePlayers,
    getSeasonFixtures,
  };
}

export const aiStore = createAIStore();
