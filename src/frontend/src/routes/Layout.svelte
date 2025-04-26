<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  import { initAuthWorker } from "$lib/services/worker-auth-service";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import { storeManager } from "$lib/manager/store-manager.js";
  import DesktopLayout from "./DesktopLayout.svelte";
  import MobileLayout from "./MobileLayout.svelte";
  import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

  import "../app.css";
    import { appStore } from "$lib/stores/app-store";
    import Toasts from "$lib/components/toasts/toasts.svelte";
  
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;

  const syncAuthStore = async () => {
    if (!browser) return;
    try {
      await authStore.sync();
      console.log($authStore.identity?.getPrincipal().toString() ?? "Not found")
    } catch (err) {
      console.error("Error syncing auth store:", err);
    }
  };

  const init = async () => {
    await syncAuthStore();
    await storeManager.syncStores();
    await appStore.checkServerVersion();
  };

  onMount(async () => {
    if (browser) {
      worker = await initAuthWorker();
    }
  });

  $: worker, $authStore, worker?.syncAuthIdle($authStore);
  $: (() => {
    if (browser && $authStore) {
      const spinner = document.querySelector("body > #app-spinner");
      spinner?.remove();
    }
  })();

</script>

<svelte:window on:storage={syncAuthStore} />

{#await init()}
  <div in:fade>
    <LocalSpinner />
  </div>
{:then _}
  <div>
    <Toasts />
    <div class="block lg:hidden">
      <MobileLayout>
        {@render children()}
      </MobileLayout>
    </div>

    <div class="hidden lg:block">
      <DesktopLayout>
        {@render children()}
      </DesktopLayout>
    </div>
  </div>
{/await}
