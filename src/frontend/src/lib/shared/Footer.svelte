<script lang="ts">
  import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
  import { onMount } from "svelte";

  let isLoggedIn = false;

  onMount(async () => {
    try {
      authStore.subscribe((store) => {
        isLoggedIn = store.identity !== null && store.identity !== undefined;
      });
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
    }
  });

  function handleLogin() {
    let params: AuthSignInParams = {
      domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
    };
    authStore.signIn(params);
  }
  function handleLogout() {
    authStore.signOut();
  }

</script>

<footer class="relative py-8 overflow-hidden bg-WaterwayGray">
  <div class="absolute ellipse-1"></div>
  <div class="absolute ellipse-2"></div>
  <div class="relative z-10">

    <div class="flex flex-col px-6 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center mb-6 lg:mb-0">
        <a href="/" class="flex items-center">
          <img src="logo.png" class="h-5 lg:h-4" alt="Waterway Labs Logo" />
          <span class="ml-2 tracking-wide">
            <span class="text-white">WATERWAY</span>
            <span class="text-white exLight">LABS</span>
          </span>
        </a>
      </div>

      <div class="flex flex-col text-sm  exLight uppercase lg:mb-0 lg:flex-row">
        <a href="/" class="mb-4 lg:mb-0 lg:mx-4 hover:text-blue-400">Products</a>
        <a href="/about" class="mb-4 lg:mb-0 lg:mx-4 hover:text-blue-400">About Us</a>
        <a href="/team" class="mb-4 lg:mb-0 lg:mx-4 hover:text-blue-400">The Team</a>
      </div>
    </div>

    <hr class="my-6 border-t-2 border-[#4E4E4E] mx-6 lg:mx-auto lg:w-[1450px]" />
    
    <div class="flex flex-col px-6 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
      <div class="mb-4 lg:mb-0">
        {#if isLoggedIn}
          <button on:click={handleLogout}>LET'S CONNECT</button>
        {:else}
          <button on:click={handleLogin}>LET'S CONNECT</button>
        {/if}
      </div>
      <div class="flex flex-col text-sm  exLight uppercase lg:flex-row ">
        <a href="https://github.com" target="_blank" class="mb-4 lg:mb-0 lg:mx-2 hover:text-blue-400">GitHub</a>
        <a href="https://twitter.com" target="_blank" class="mb-4 lg:mb-0 lg:mx-2 hover:text-blue-400">Twitter</a>
      </div>
    </div>
    
  </div>
</footer>
