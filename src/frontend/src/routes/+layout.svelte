<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { page } from '$app/state';

  import { initAuthWorker } from "$lib/services/worker-auth-service";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import { displayAndCleanLogoutMsg } from "$lib/services/auth-services";

  import LocalSpinner from "$lib/components/shared/global/local-spinner.svelte";
  import Toasts from "$lib/components/toasts/toasts.svelte";
  import Sidebar from "$lib/components/shared/sidebar.svelte";
  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";
  import "../app.css";

  interface Props {
    children: Snippet
  }

  let { children } : Props = $props();
  
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let isLoading = $state(true);
  let isMenuOpen = $state(false);

  function toggleMenu() {
      isMenuOpen = !isMenuOpen;
  }

  onMount(async () => {
    if (browser) {
      document.querySelector('#app-spinner')?.remove();
    }
    worker = await initAuthWorker();
    
    isLoading = false;
  });

  const init = async () => {
    if (!browser) return;
    await authStore.sync();
    displayAndCleanLogoutMsg();
  };

</script>

<svelte:window on:storage={authStore.sync} />
{#await init()}
  <div in:fade>
    <LocalSpinner />
  </div>
{:then _}
  {#if isLoading}
    <LocalSpinner />
  {:else}
    <div class="flex flex-col min-h-screen">
      <Toasts />
      {#if page.url.pathname !== "/"}
        <Header {toggleMenu}></Header>
        <Sidebar {isMenuOpen} {toggleMenu} />
      {/if}
      <main class="flex-grow px-4 lg:px-8">
        {@render children()}
      </main>
      {#if page.url.pathname !== "/"}
        <Footer></Footer>
      {/if}
    </div>
  {/if}
{/await}