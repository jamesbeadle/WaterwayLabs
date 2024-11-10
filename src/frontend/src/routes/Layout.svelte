<script lang="ts">
	import { authStore, type AuthStoreData } from './../lib/stores/auth-store';
  import { onMount, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import Header from "$lib/shared/Header.svelte";
  import "../app.css";
  import { page } from "$app/stores";
  import { toastsError } from "$lib/stores/toast-store";
  import Footer from "$lib/shared/Footer.svelte";
  import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

  import { initAuthWorker } from "$lib/services/worker-auth-service";
  import { storeManager } from '$lib/manager/store-manager.js';
  
  interface $$Slots {
    default: {
      isMenuOpen: boolean;
    };
  }
  
  export let isMenuOpen = false;
  
  export let overrideBackground = false;

  const init = async () => await Promise.all([syncAuthStore()]);

  const syncAuthStore = async () => {
    if (!browser) {
      return;
    }

    try {
      await authStore.sync();
    } catch (err: unknown) {
      toastsError({
        msg: {
          text: "Unexpected issue while syncing the status of your authentication.",
        },
        err,
      });
    }
  };

  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;

  onMount(async () => (worker = await initAuthWorker()));

  onMount(async () => {
    try {
      await storeManager.syncStores();
    } catch (error) {
      toastsError({
        msg: { text: "Error mounting application data." },
        err: error,
      });
      console.error("Error mounting application data:", error);
    } finally {
    }
  });

  $: worker, $authStore, (() => worker?.syncAuthIdle($authStore))();
  $: isHomePage = $page.url.pathname === '/';
  $: (() => {
    if (!browser) {
      return;
    }

    if ($authStore === undefined) {
      return;
    }

    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();
  
  afterUpdate(() => {
    if (browser) {
      document.body.style.height = '100%';
      setTimeout(() => {
        document.body.style.height = 'auto';
      }, 0);
    }
  });
</script>

<svelte:window on:storage={syncAuthStore} />
{#await init()}
  <div in:fade>
    <LocalSpinner />
  </div>
{:then _}
  <div class="flex flex-col min-h-screen" class:override-bg={overrideBackground}>
    <Header bind:isMenuOpen />
    <main class="flex-1">
      <slot {isMenuOpen} />
    </main>
    {#if !isHomePage}
      <Footer/>
    {/if}
  </div>
{/await}

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .override-bg {
    background-color: #272727;
  }
</style>
