<script lang="ts">
  import { page } from '$app/stores';
    import DotsIcon from '$lib/icons/DotsIcon.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import type { AuthSignInParams } from '$lib/stores/auth-store';
  export let isMenuOpen = false;

  $: isHomePage = $page.url.pathname === '/';
  $: isDesktop = window?.innerWidth >= 768; 

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      isDesktop = window.innerWidth >= 768;
    });
  }

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

<header class="bg-WaterwayGray p-4">
  <div class="flex justify-between items-center w-full mx-auto lg:max-w-1/2">
    <div class="flex items-center space-x-2">
      <img src="logo.png" class="h-4  " alt="Waterway Labs Logo" />
      <span class="text-base">WATERWAY <span class="exLight">LABS</span></span>      
    </div>

    <nav class="hidden md:flex space-x-4 text-sm">
      <a href="#about" class="hover:underline">ABOUT</a>
      <a href="#team" class="hover:underline">TEAM</a>
    </nav>

    <div class="md:hidden">
      <DotsIcon className="w-4" />
    </div>
  </div>
</header>
