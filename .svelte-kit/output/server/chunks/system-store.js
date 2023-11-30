import { w as writable } from "./index.js";
import { HttpAgent, Actor } from "@dfinity/agent";
const idlFactory = ({ IDL }) => {
  const DataCache = IDL.Record({ hash: IDL.Text, category: IDL.Text });
  const ProfileDTO = IDL.Record({
    displayName: IDL.Text,
    createDate: IDL.Int,
    profilePicture: IDL.Vec(IDL.Nat8),
    principalId: IDL.Text
  });
  const SystemState = IDL.Record({});
  const Error = IDL.Variant({
    DecodeError: IDL.Null,
    NotAllowed: IDL.Null,
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    InvalidData: IDL.Null,
    AlreadyExists: IDL.Null
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  return IDL.Service({
    getDataHashes: IDL.Func([], [IDL.Vec(DataCache)], ["query"]),
    getProfileDTO: IDL.Func([], [ProfileDTO], []),
    getSystemState: IDL.Func([], [SystemState], ["query"]),
    isDisplayNameValid: IDL.Func([IDL.Text], [IDL.Bool], ["query"]),
    updateDisplayName: IDL.Func([IDL.Text], [Result], []),
    updateProfilePicture: IDL.Func([IDL.Vec(IDL.Nat8)], [Result], [])
  });
};
class ActorFactory {
  static createActor(idlFactory2, canisterId = "", identity = null, options = null) {
    const hostOptions = {
      host: `https://${canisterId}.icp-api.io`,
      identity
    };
    if (!options) {
      options = {
        agentOptions: hostOptions
      };
    } else if (!options.agentOptions) {
      options.agentOptions = hostOptions;
    } else {
      options.agentOptions.host = hostOptions.host;
    }
    const agent = new HttpAgent({ ...options.agentOptions });
    if ({ "BACKEND_CANISTER_ID": "rbqtt-7yaaa-aaaal-qcndq-cai", "FRONTEND_CANISTER_ID": "qm6x5-qqaaa-aaaal-qcnea-cai", "DFX_NETWORK": "ic" }.NODE_ENV !== "production") {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Ensure your local replica is running"
        );
        console.error(err);
      });
    }
    return Actor.createActor(idlFactory2, {
      agent,
      canisterId,
      ...options?.actorOptions
    });
  }
  static createIdentityActor(authStore, canisterId) {
    let unsubscribe;
    return new Promise((resolve, reject) => {
      unsubscribe = authStore.subscribe((store) => {
        if (store.identity) {
          resolve(store.identity);
        }
      });
    }).then((identity) => {
      unsubscribe();
      return ActorFactory.createActor(idlFactory, canisterId, identity);
    });
  }
}
function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  } else {
    return value;
  }
}
function createSystemStore() {
  const { subscribe, set } = writable(null);
  let actor = ActorFactory.createActor(
    idlFactory,
    { "BACKEND_CANISTER_ID": "rbqtt-7yaaa-aaaal-qcndq-cai", "FRONTEND_CANISTER_ID": "qm6x5-qqaaa-aaaal-qcnea-cai", "DFX_NETWORK": "ic" }.BACKEND_CANISTER_ID
  );
  async function sync() {
    let category = "system_state";
    const newHashValues = await actor.getDataHashes();
    let liveHash = newHashValues.find((x) => x.category === category) ?? null;
    const localHash = localStorage.getItem(category);
    if (liveHash?.hash != localHash) {
      let updatedSystemStateData = await actor.getSystemState();
      localStorage.setItem(
        "system_state_data",
        JSON.stringify(updatedSystemStateData, replacer)
      );
      localStorage.setItem(category, liveHash?.hash ?? "");
      set(updatedSystemStateData);
    } else {
      const cachedSystemStateData = localStorage.getItem("system_state_data");
      let cachedSystemState = null;
      try {
        cachedSystemState = JSON.parse(cachedSystemStateData || "{}");
      } catch (e) {
        cachedSystemState = null;
      }
      set(cachedSystemState);
    }
  }
  async function getSystemState() {
    let systemState;
    subscribe((value) => {
      systemState = value;
    })();
    return systemState;
  }
  return {
    subscribe,
    sync,
    getSystemState
  };
}
createSystemStore();
export {
  ActorFactory as A
};
