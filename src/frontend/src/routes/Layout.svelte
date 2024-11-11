<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  import { initAuthWorker } from "$lib/services/worker-auth-service";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import { storeManager } from "$lib/manager/store-manager.js";

  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";
  import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
  import "../app.css";
  
  export let isMenuOpen = false;
  export let overrideBackground = false;

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
  };

  onMount(async () => {
    if (browser) {
      worker = await initAuthWorker();
      await storeManager.syncStores();
    }
  });

  $: worker, $authStore, worker?.syncAuthIdle($authStore);
  $: isHomePage = $page.url.pathname === '/';  
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
  <div class="flex flex-col min-h-screen" class:override-bg={overrideBackground}>
    <div class="px-4 lg:flex">
      <div class="w-full lg:w-1/2">
        <Header />
      </div>
      <div class="w-full lg:w-1/2">
        <slot></slot>
      </div>
    </div>
    {#if !isHomePage}
      <Footer />
    {/if}
  </div>
{/await}
