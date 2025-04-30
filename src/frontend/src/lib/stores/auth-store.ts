import {
  AUTH_MAX_TIME_TO_LIVE,
  AUTH_POPUP_HEIGHT,
  AUTH_POPUP_WIDTH,
} from "$lib/constants/app.constants";
import type { OptionIdentity } from "$lib/types/identity";
import { createAuthClient } from "$lib/utils/auth.utils";
import { popupCenter } from "$lib/utils/window.utils";
import type { AuthClient } from "@dfinity/auth-client";
import { writable, type Readable } from "svelte/store";
import { ActorFactory } from "../../utils/ActorFactory";
import { isError } from "$lib/utils/helpers";

export interface AuthStoreData {
  identity: OptionIdentity;
}

let authClient: AuthClient | undefined | null;
55;

const NNS_IC_ORG_ALTERNATIVE_ORIGIN = "https://waterwaylabs.xyz";
const NNS_IC_APP_DERIVATION_ORIGIN =
  "https://qm6x5-qqaaa-aaaal-qcnea-cai.icp0.io";

const isNnsAlternativeOrigin = () => {
  return window.location.origin === NNS_IC_ORG_ALTERNATIVE_ORIGIN;
};

export interface AuthSignInParams {
  domain?: "ic0.app" | "internetcomputer.org";
}

export interface AuthStore extends Readable<AuthStoreData> {
  sync: () => Promise<void>;
  signIn: (params: AuthSignInParams) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: () => Promise<boolean>;
}

const initAuthStore = (): AuthStore => {
  const { subscribe, set, update } = writable<AuthStoreData>({
    identity: undefined,
  });

  return {
    subscribe,

    sync: async () => {
      authClient = authClient ?? (await createAuthClient());
      const isAuthenticated: boolean = await authClient.isAuthenticated();

      set({
        identity: isAuthenticated ? authClient.getIdentity() : null,
      });
    },

    signIn: ({ domain }: AuthSignInParams) =>
      new Promise<void>(async (resolve, reject) => {
        authClient = authClient ?? (await createAuthClient());
        const identityProvider = domain;

        await authClient?.login({
          maxTimeToLive: AUTH_MAX_TIME_TO_LIVE,
          onSuccess: () => {
            update((state: AuthStoreData) => ({
              ...state,
              identity: authClient?.getIdentity(),
            }));

            resolve();
          },
          onError: reject,
          identityProvider,
          ...(isNnsAlternativeOrigin() && {
            derivationOrigin: NNS_IC_APP_DERIVATION_ORIGIN,
          }),
          windowOpenerFeatures: popupCenter({
            width: AUTH_POPUP_WIDTH,
            height: AUTH_POPUP_HEIGHT,
          }),
        });
      }),

    signOut: async () => {
      const client: AuthClient = authClient ?? (await createAuthClient());

      await client.logout();

      authClient = null;

      update((state: AuthStoreData) => ({
        ...state,
        identity: null,
      }));
      localStorage.removeItem("user_profile_data");
    },

    isAdmin: async (): Promise<boolean> => {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      const result = (await identityActor.isAdmin()) as boolean;
      if (isError(result)) return false;
      return result;
    },
  };
};

export const authStore = initAuthStore();

export const authRemainingTimeStore = writable<number | undefined>(undefined);
