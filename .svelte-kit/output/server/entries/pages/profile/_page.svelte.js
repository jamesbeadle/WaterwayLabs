import { c as create_ssr_component, e as escape, n as null_to_empty, b as add_attribute, a as subscribe, o as onDestroy, v as validate_component } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
import { A as AUTH_MAX_TIME_TO_LIVE, a as AUTH_POPUP_WIDTH, b as AUTH_POPUP_HEIGHT, c as LoadingIcon, t as toastStore, L as Layout } from "../../../chunks/Layout.js";
import { AuthClient } from "@dfinity/auth-client";
import "@dfinity/utils";
import { A as ActorFactory } from "../../../chunks/system-store.js";
import "@dfinity/agent";
const createAuthClient = () => AuthClient.create({
  idleOptions: {
    disableIdle: true,
    disableDefaultIdleCallback: true
  }
});
const popupCenter = ({
  width,
  height
}) => {
  {
    return void 0;
  }
};
let authClient;
const NNS_IC_ORG_ALTERNATIVE_ORIGIN = "https://waterwaylabs.xyz";
const NNS_IC_APP_DERIVATION_ORIGIN = "https://bgpwv-eqaaa-aaaal-qb6eq-cai.icp0.io";
const isNnsAlternativeOrigin = () => {
  return window.location.origin === NNS_IC_ORG_ALTERNATIVE_ORIGIN;
};
const initAuthStore = () => {
  const { subscribe: subscribe2, set, update } = writable({
    identity: void 0
  });
  return {
    subscribe: subscribe2,
    sync: async () => {
      authClient = authClient ?? await createAuthClient();
      const isAuthenticated = await authClient.isAuthenticated();
      set({
        identity: isAuthenticated ? authClient.getIdentity() : null
      });
    },
    signIn: ({ domain }) => new Promise(async (resolve, reject) => {
      authClient = authClient ?? await createAuthClient();
      const identityProvider = "https://identity.ic0.app";
      await authClient?.login({
        maxTimeToLive: AUTH_MAX_TIME_TO_LIVE,
        onSuccess: () => {
          update((state) => ({
            ...state,
            identity: authClient?.getIdentity()
          }));
          resolve();
        },
        onError: reject,
        identityProvider,
        ...isNnsAlternativeOrigin() && {
          derivationOrigin: NNS_IC_APP_DERIVATION_ORIGIN
        },
        windowOpenerFeatures: popupCenter({
          width: AUTH_POPUP_WIDTH,
          height: AUTH_POPUP_HEIGHT
        })
      });
    }),
    signOut: async () => {
      const client = authClient ?? await createAuthClient();
      await client.logout();
      authClient = null;
      update((state) => ({
        ...state,
        identity: null
      }));
    }
  };
};
const authStore = initAuthStore();
function createUserStore() {
  const { subscribe: subscribe2, set, update } = writable(null);
  async function updateUsername(username) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        { "BACKEND_CANISTER_ID": "rbqtt-7yaaa-aaaal-qcndq-cai", "FRONTEND_CANISTER_ID": "qm6x5-qqaaa-aaaal-qcnea-cai", "DFX_NETWORK": "ic" }.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.updateDisplayName(username);
      return result;
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }
  async function updateFavouriteTeam(favouriteTeamId) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        { "BACKEND_CANISTER_ID": "rbqtt-7yaaa-aaaal-qcndq-cai", "FRONTEND_CANISTER_ID": "qm6x5-qqaaa-aaaal-qcnea-cai", "DFX_NETWORK": "ic" }.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.updateFavouriteTeam(favouriteTeamId);
      return result;
    } catch (error) {
      console.error("Error updating favourite team:", error);
      throw error;
    }
  }
  async function getProfile() {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        { "BACKEND_CANISTER_ID": "rbqtt-7yaaa-aaaal-qcndq-cai", "FRONTEND_CANISTER_ID": "qm6x5-qqaaa-aaaal-qcnea-cai", "DFX_NETWORK": "ic" }.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.getProfileDTO();
      set(result);
      return result;
    } catch (error) {
      console.error("Error getting profile:", error);
      throw error;
    }
  }
  async function updateProfilePicture(picture) {
    try {
      const maxPictureSize = 1e3;
      if (picture.size > maxPictureSize * 1024) {
        return null;
      }
      const reader = new FileReader();
      reader.readAsArrayBuffer(picture);
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        try {
          const identityActor = await ActorFactory.createIdentityActor(
            authStore,
            { "BACKEND_CANISTER_ID": "rbqtt-7yaaa-aaaal-qcndq-cai", "FRONTEND_CANISTER_ID": "qm6x5-qqaaa-aaaal-qcnea-cai", "DFX_NETWORK": "ic" }.BACKEND_CANISTER_ID ?? ""
          );
          const result = await identityActor.updateProfilePicture(uint8Array);
          return result;
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }
  return {
    subscribe: subscribe2,
    updateUsername,
    updateFavouriteTeam,
    getProfile,
    updateProfilePicture
  };
}
const userStore = createUserStore();
const CopyIcon_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".icon.svelte-1qbujws:hover{fill:var(--hover-color)}",
  map: null
};
const CopyIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { principalId = "" } = $$props;
  let { onClick } = $$props;
  let { hoverColor = "red" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.principalId === void 0 && $$bindings.principalId && principalId !== void 0)
    $$bindings.principalId(principalId);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  if ($$props.hoverColor === void 0 && $$bindings.hoverColor && hoverColor !== void 0)
    $$bindings.hoverColor(hoverColor);
  $$result.css.add(css$2);
  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${escape(null_to_empty(className), true) + " svelte-1qbujws"}" fill="currentColor" viewBox="0 0 16 16" style="${"--hover-color: " + escape(hoverColor, true) + "; cursor: 'pointer'"}"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"></path><path d="M3.5 2a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-9zM2 2.5A1.5 1.5 0 0 1 3.5 1h9A1.5 1.5 0 0 1 14 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-10zm9.5 3A1.5 1.5 0 0 1 13 7h1.5V3.5a1.5 1.5 0 0 0-1.5-1.5H9V4a1.5 1.5 0 0 1 1.5 1.5v1zm0 1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1z"></path></svg>`;
});
const updateUsernameModal_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".modal-backdrop.svelte-1fl295u{z-index:1000}",
  map: null
};
function isDisplayNameValid(displayName) {
  if (displayName.length < 3 || displayName.length > 20) {
    return false;
  }
  return /^[a-zA-Z0-9 ]+$/.test(displayName);
}
const Update_username_modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSubmitDisabled;
  let { showModal } = $$props;
  let { closeModal } = $$props;
  let { cancelModal } = $$props;
  let { newUsername = "" } = $$props;
  let { isLoading } = $$props;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  if ($$props.closeModal === void 0 && $$bindings.closeModal && closeModal !== void 0)
    $$bindings.closeModal(closeModal);
  if ($$props.cancelModal === void 0 && $$bindings.cancelModal && cancelModal !== void 0)
    $$bindings.cancelModal(cancelModal);
  if ($$props.newUsername === void 0 && $$bindings.newUsername && newUsername !== void 0)
    $$bindings.newUsername(newUsername);
  if ($$props.isLoading === void 0 && $$bindings.isLoading && isLoading !== void 0)
    $$bindings.isLoading(isLoading);
  $$result.css.add(css$1);
  isSubmitDisabled = !isDisplayNameValid(newUsername);
  return `${showModal ? `<div class="fixed inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full modal-backdrop svelte-1fl295u"><div class="relative top-20 mx-auto p-5 border border-gray-700 w-96 shadow-lg rounded-md bg-panel text-white"><div class="mt-3 text-center"><h3 class="text-lg leading-6 font-medium mb-2">Update Display Name</h3>
        <form><div class="mt-4"><input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" placeholder="New Username"${add_attribute("value", newUsername, 0)}></div>
          <div class="items-center py-3 flex space-x-4"><button class="px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">Cancel
            </button>
            <button class="${escape(
    null_to_empty(`px-4 py-2 ${isSubmitDisabled ? "bg-gray-500" : ""} 
              text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`),
    true
  ) + " svelte-1fl295u"}" type="submit" ${isSubmitDisabled ? "disabled" : ""}>Use
            </button></div></form></div></div></div>` : ``}`;
});
const profileDetail_svelte_svelte_type_style_lang = "";
const css = {
  code: '.file-upload-wrapper.svelte-e6um5o{position:relative;overflow:hidden;display:inline-block;width:100%}.btn-file-upload.svelte-e6um5o{width:100%;border:none;padding:10px 20px;border-radius:5px;font-size:1em;cursor:pointer;text-align:center;display:block}input[type="file"].svelte-e6um5o{font-size:100px;position:absolute;left:0;top:0;opacity:0;width:100%;height:100%;cursor:pointer}',
  map: null
};
const Profile_detail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoading, $$unsubscribe_isLoading;
  let $profile, $$unsubscribe_profile;
  let $profileSrc, $$unsubscribe_profileSrc;
  let profile = writable(null);
  $$unsubscribe_profile = subscribe(profile, (value) => $profile = value);
  let profileSrc = writable("profile_placeholder.png");
  $$unsubscribe_profileSrc = subscribe(profileSrc, (value) => $profileSrc = value);
  let showUsernameModal = false;
  let isLoading = writable(false);
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  onDestroy(() => {
  });
  async function closeUsernameModal() {
    const profileData = await userStore.getProfile();
    profile.set(profileData);
    showUsernameModal = false;
  }
  function cancelUsernameModal() {
    showUsernameModal = false;
  }
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      toastStore.show("Copied!", "success");
    });
  }
  $$result.css.add(css);
  $$unsubscribe_isLoading();
  $$unsubscribe_profile();
  $$unsubscribe_profileSrc();
  return `${$isLoading ? `${validate_component(LoadingIcon, "LoadingIcon").$$render($$result, {}, {}, {})}` : `${validate_component(Update_username_modal, "UpdateUsernameModal").$$render(
    $$result,
    {
      newUsername: $profile ? $profile.displayName : "",
      showModal: showUsernameModal,
      closeModal: closeUsernameModal,
      cancelModal: cancelUsernameModal,
      isLoading
    },
    {},
    {}
  )}
  <div class="container mx-auto p-4">${$profile ? `<div class="flex flex-wrap"><div class="w-full md:w-auto px-2 ml-4 md:ml-0"><div class="group"><img${add_attribute("src", $profileSrc, 0)} alt="Profile" class="w-48 md:w-80 mb-1 rounded-lg">

            <div class="file-upload-wrapper mt-4 svelte-e6um5o"><button class="btn-file-upload svelte-e6um5o">Upload Photo</button>
              <input type="file" id="profile-image" accept="image/*" style="opacity: 0; position: absolute; left: 0; top: 0;" class="svelte-e6um5o"></div></div></div>

        <div class="w-full md:w-3/4 px-2 mb-4"><div class="ml-4 p-4 rounded-lg"><p class="text-xs mb-2">Display Name:</p>
            <h2 class="text-2xl font-bold mb-2">${escape($profile?.displayName)}</h2>
            <button class="p-2 px-4 rounded">Update</button>

            <p class="text-xs mb-2 mt-4">Joined:</p>
            <h2 class="text-2xl font-bold mb-2">August 2023</h2>

            <p class="text-xs mb-2 mt-4">Principal:</p>
            <div class="flex items-center"><h2 class="text-xs font-bold">${escape($profile?.principalId)}</h2>
              ${validate_component(CopyIcon, "CopyIcon").$$render(
    $$result,
    {
      onClick: copyToClipboard,
      principalId: $profile?.principalId,
      className: "ml-2 w-4 h-4"
    },
    {},
    {}
  )}</div></div></div></div>` : ``}
    <div class="flex flex-wrap -mx-2 mt-4"><div class="w-full px-2 mb-4"><div class="mt-4 px-2"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="flex items-center p-4 rounded-lg shadow-md border border-gray-700"><img src="ICPCoin.png" alt="ICP" class="h-12 w-12">
              <div class="ml-4"><p class="font-bold">ICP</p>
                <p>0.00 ICP</p></div></div>
            <div class="flex items-center p-4 rounded-lg shadow-md border border-gray-700"><img src="ckBTCCoin.png" alt="ICP" class="h-12 w-12">
              <div class="ml-4"><p class="font-bold">ckBTC</p>
                <p>0.00 ckBTC</p></div></div>
            <div class="flex items-center p-4 rounded-lg shadow-md border border-gray-700"><img src="ckETHCoin.png" alt="ICP" class="h-12 w-12">
              <div class="ml-4"><p class="font-bold">ckETH</p>
                <p>0.00 ckETH</p></div></div></div></div></div></div></div>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="m-4"><div class="bg-panel rounded-lg m-4"><ul class="flex rounded-t-lg bg-light-gray px-4 pt-2"><li${add_attribute("class", `mr-4 text-xs md:text-base ${"active-tab"}`, 0)}><button${add_attribute("class", `p-2 ${"text-white"}`, 0)}>Details</button></li>
        <li${add_attribute("class", `mr-4 text-xs md:text-base ${""}`, 0)}><button${add_attribute(
        "class",
        `p-2 ${"text-gray-400"}`,
        0
      )}>Gameweeks</button></li></ul>

      ${`${validate_component(Profile_detail, "ProfileDetail").$$render($$result, {}, {}, {})}`}</div></div>`;
    }
  })}`;
});
export {
  Page as default
};
