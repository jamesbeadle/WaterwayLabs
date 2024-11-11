<script lang="ts">
  import DotsIcon from '$lib/icons/DotsIcon.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import type { AuthSignInParams } from '$lib/stores/auth-store';
  export let isMenuOpen = false;

  let isLoggedIn = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  function handleLogin() {
    let params: AuthSignInParams = {
      domain: import.meta.env.VITE_AUTH_PROVIDER_URLS,
    };
    authStore.signIn(params);
    isLoggedIn = true;
  }

  function handleLogout() {
    authStore.signOut();
    isLoggedIn = false;
  }
</script>

<header class="bg-WaterwayGray py-2">
  <div class="flex justify-between items-center w-full lg:max-w-1/2">
    <div class="flex items-center space-x-2">
      <img src="logo.png" class="h-4" alt="Waterway Labs Logo" />
      <span class="text-base">WATERWAY <span class="exLight">LABS</span></span>      
    </div>

    <nav class="hidden sm:flex space-x-4 text-sm lg:mr-4">
      <a href="#about" class="hover:underline">ABOUT</a>
      <a href="#team" class="hover:underline">TEAM</a>
    </nav>

    <div class="sm:hidden">
      <DotsIcon className="w-4" />
    </div>
  </div>
</header>
