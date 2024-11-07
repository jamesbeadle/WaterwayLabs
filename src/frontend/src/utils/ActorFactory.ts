// src/utils/ActorFactory.ts
import type { AuthStore } from "$lib/stores/auth-store";
import type { OptionIdentity } from "$lib/types/identity";
import { Actor, HttpAgent } from "@dfinity/agent";
import type { Unsubscriber } from "svelte/store";
import { idlFactory } from "../../../declarations/backend";

export class ActorFactory {
  static async createActor(
    idlFactory: any,
    canisterId: string,
    identity: any = null,
    options: any = {},
  ) {
    const agentOptions = {
      host: "http://localhost:4943",
      identity,
      ...options.agentOptions,
    };

    const agent = new HttpAgent(agentOptions);

    // Fetch root key in development
    if (import.meta.env.DEV) {
      try {
        await agent.fetchRootKey();
      } catch (err) {
        console.error("Error fetching root key:", err);
        throw err;
      }
    }

    try {
      return Actor.createActor(idlFactory, {
        agent,
        canisterId,
      });
    } catch (error) {
      console.error("Error creating actor:", error);
      throw error;
    }
  }

  static createIdentityActor(authStore: AuthStore, canisterId: string) {
    let unsubscribe: Unsubscriber;

    return new Promise<OptionIdentity>((resolve, reject) => {
      unsubscribe = authStore.subscribe((store) => {});

      setTimeout(() => {
        unsubscribe?.();
        reject(new Error("Identity not set in authStore after timeout"));
      }, 5000);
    })
      .then((identity) => {
        unsubscribe?.();
        return ActorFactory.createActor(idlFactory, canisterId, identity);
      })
      .catch((error) => {
        unsubscribe?.();
        throw error;
      });
  }
}
