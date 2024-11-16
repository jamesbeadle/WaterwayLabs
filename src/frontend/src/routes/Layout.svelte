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
  
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;

  const syncAuthStore = async () => {
    if (!browser) return;
    try {
      await authStore.sync();
    } catch (err) {
      console.error("Error syncing auth store:", err);
    }
  };

  const init = async () => {
    await syncAuthStore();
    await storeManager.syncStores();
  };

  onMount(async () => {
    if (browser) {
      worker = await initAuthWorker();
    }
  });

  $: worker, $authStore, worker?.syncAuthIdle($authStore);
  $: (() => {
    if (browser && $authStore) {
      console.log("D")
      const spinner = document.querySelector("body > #app-spinner");
      console.log("E")
      spinner?.remove();
      console.log("F")
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
    <div class="block lg:hidden">
      <MobileLayout>
        <slot />
      </MobileLayout>
    </div>

    <div class="hidden lg:block">
      <DesktopLayout>
        <slot />
      </DesktopLayout>
    </div>
  </div>
{/await}
