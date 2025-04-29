<script lang="ts">
  import { page } from '$app/stores';
  import DotsIcon from '$lib/icons/DotsIcon.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import { onMount } from 'svelte';
  
  let isLoggedIn = $state(false);

  function isActivePage(path: string): boolean {
    return $page.url.pathname === '/' + path;
  }

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
</script>

<header class="py-4 px-4 bg-BrandGray lg:py-4 w-full sm:mx-auto lg:container lg:mx-auto'}">
  <div class="flex items-center justify-between w-full mx-auto max-w-screen-2xl">
    <a href="/" class="flex-shrink-0">
      <div class="flex items-center space-x-2">
        <img src="logo.png" class="h-5" alt="Waterway Labs Logo" />
        <span class="lg:text-sm xl:text-base">WATERWAY <span class="exLight">LABS</span></span>      
      </div>
    </a>

    <nav class="hidden space-x-4 lg:space-x-3 xl:space-x-6 sm:flex">
      <a href="about" class="hover:underline lg:text-sm xl:text-base {isActivePage('about') ? 'text-BrandTurquoise' : ''}">ABOUT</a>
      <a href="team" class="hover:underline lg:text-sm xl:text-base {isActivePage('team') ? 'text-BrandTurquoise' : ''}">TEAM</a>
      <a href="contact" class="hover:underline lg:text-sm xl:text-base {isActivePage('contact') ? 'text-BrandTurquoise' : ''}">CONTACT</a>
      {#if isLoggedIn}
        <a href="account" class="hover:underline lg:text-sm xl:text-base {isActivePage('account') ? 'text-BrandTurquoise' : ''}">ACCOUNT</a>
      {/if}
    </nav>

    <button
      class="flex-shrink-0 sm:hidden"
      aria-label="Menu"
      onclick={() => {}}
    >
      <DotsIcon className="w-5" />
    </button>
  </div>
</header>
