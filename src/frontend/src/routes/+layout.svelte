<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";

  import { initAuthWorker } from "$lib/services/worker-auth-service";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import DesktopLayout from "./DesktopLayout.svelte";
  import MobileLayout from "./MobileLayout.svelte";
  import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

  import "../app.css";
  import Toasts from "$lib/components/toasts/toasts.svelte";
  import { displayAndCleanLogoutMsg } from "$lib/services/auth-services";
    import Sidebar from "$lib/components/shared/sidebar.svelte";

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
    
    <Sidebar {isMenuOpen} {toggleMenu} />
    {#if isMenuOpen}
        <button 
        class="fixed inset-0 z-30 pointer-events-none bg-black/40 sm:bg-black/20 sm:pointer-events-auto"
        onclick={toggleMenu}
        onkeydown={(e) => e.key === 'Enter' && toggleMenu()}
        aria-label="Close menu overlay"
        ></button>
    {/if}
               
{/await}