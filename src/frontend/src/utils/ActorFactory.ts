// src/utils/ActorFactory.ts
import type { AuthStore } from "$lib/stores/auth-store";
import type { OptionIdentity } from "$lib/types/identity";
import { Actor, HttpAgent } from "@dfinity/agent";
import type { Unsubscriber } from "svelte/store";
import { idlFactory } from "../../../declarations/backend";

export class ActorFactory {
  static createActor(
    idlFactory: any,
    canisterId: string = "",
    identity: OptionIdentity = null,
    options: any = null,
  ) {
    const hostOptions = {
      host:
        process.env.DFX_NETWORK === "local"
          ? `https://${canisterId}.icp-api.io`
          : "http://127.0.0.1:8080",
      identity: identity,
    };

    if (!options) {
      options = {
        agentOptions: hostOptions,
      };
    } else if (!options.agentOptions) {
      options.agentOptions = hostOptions;
    } else {
      options.agentOptions.host = hostOptions.host;
    }

    const agent = new HttpAgent({ ...options.agentOptions });

    if (process.env.NODE_ENV !== "production") {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Ensure your local replica is running",
        );
        console.error(err);
      });
    }

    return Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
      ...options?.actorOptions,
    });
  }

  static createIdentityActor(authStore: AuthStore, canisterId: string) {
    let unsubscribe: Unsubscriber;
    console.log("Unsubscribed");
    return new Promise<OptionIdentity>((resolve, reject) => {
      console.log("Unsubscribe = authstore.subscribe");
      unsubscribe = authStore.subscribe((store) => {
        if (store.identity) {
          resolve(store.identity);
          console.log("resolving store identity");
        } else {
          console.log("WAITING FOR IDENTITY TO BE SET");
        }
      });
      setTimeout(() => {
        reject(new Error("Identity not set in authStore after timeout"));
      }, 5000);
    }).then((identity) => {
      unsubscribe();
      console.log("Unsubscribed and returning");
      return ActorFactory.createActor(idlFactory, canisterId, identity);
    });
  }
}
