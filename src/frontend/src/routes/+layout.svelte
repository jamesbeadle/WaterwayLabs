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
    import { get } from "svelte/store";
    import { initUserProfile } from "$lib/services/user-profile-service";
    import { displayAndCleanLogoutMsg } from "$lib/services/auth-services";

  interface Props {
    children: Snippet
  }

  let { children } : Props = $props();
  
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let isLoading = $state(true);

  onMount(async () => {
    if (browser) {
      document.querySelector('#app-spinner')?.remove();
    }
    await init();
    const identity = get(authStore).identity;
    if (identity) {
      try {
        await initUserProfile({ identity });
      } catch (err) {
        console.error('Error mounting Football God:', err);
      }
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
{/await}