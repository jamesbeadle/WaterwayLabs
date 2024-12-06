<script lang="ts">
  import DotsIcon from '$lib/icons/DotsIcon.svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';
  import ArrowIcon from '$lib/icons/ArrowIcon.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import { onMount } from 'svelte';
  
  export let isMenuOpen = false;
  export let halfWidth = false;

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

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="py-4 px-4 bg-BrandGray lg:py-2 {halfWidth ? '' : 'w-full'} {!halfWidth && 'sm:mx-auto lg:container lg:mx-auto'}">
  <div class="flex items-center justify-between w-full mx-auto max-w-screen-2xl">
    <a href="/" class="flex-shrink-0">
      <div class="flex items-center space-x-2">
        <img src="logo.png" class="h-5" alt="Waterway Labs Logo" />
        <span class="lg:text-sm xl:text-base">WATERWAY <span class="exLight">LABS</span></span>      
      </div>
    </a>

    <nav class="hidden space-x-4 lg:space-x-3 xl:space-x-6 sm:flex">
      <a href="about" class="hover:underline lg:text-sm xl:text-base">ABOUT</a>
      <a href="team" class="hover:underline lg:text-sm xl:text-base">TEAM</a>
      <a href="contact" class="hover:underline lg:text-sm xl:text-base">CONTACT</a>
      {#if isLoggedIn}
        <a href="account" class="hover:underline lg:text-sm xl:text-base">ACCOUNT</a>
      {/if}
    </nav>

    <button
      class="flex-shrink-0 sm:hidden"
      aria-label="Menu"
      on:click={toggleMenu}
    >
      <DotsIcon className="w-5" />
    </button>
  </div>
</header>

{#if isMenuOpen}
  <div class="mobile-menu">
    <div class="mobile-menu-header">
      <a href="/" class="flex items-center space-x-2">
        <img src="logo.png" class="h-5" alt="Waterway Labs Logo" />
        <span class="header-text">WATERWAY <span class="exLight">LABS</span></span> 
      </a>
      <button 
        on:click={toggleMenu}
        aria-label="Close menu">
        <CloseIcon className="w-5 text-white" />
      </button>
    </div>
    <div class="mobile-menu-links">
      <div class="horizontal-divider"></div>
      <div class="mobile-menu-item">
        <a href="/about" class="mobile-nav-link" on:click={toggleMenu}>ABOUT</a>
        <a href="/about" on:click={toggleMenu}>
          <ArrowIcon className="w-7 h-7" />
        </a>
      </div>
      <div class="horizontal-divider"></div>
      
      <div class="mobile-menu-item">
        <a href="/team" class="mobile-nav-link" on:click={toggleMenu}>TEAM</a>
        <a href="/team" on:click={toggleMenu}>
          <ArrowIcon className="w-7 h-7" />
        </a>
      </div>
      <div class="horizontal-divider"></div>
      
      <div class="mobile-menu-item">
        <a href="/contact" class="mobile-nav-link" on:click={toggleMenu}>CONTACT</a>
        <a href="/contact" on:click={toggleMenu}>
          <ArrowIcon className="w-7 h-7" />
        </a>
      </div>

      <div class="horizontal-divider"></div>

      {#if isLoggedIn}
        <div class="mobile-menu-item">
          <a href="/account" class="mobile-nav-link" on:click={toggleMenu}>ACCOUNT</a>
          <a href="/account" on:click={toggleMenu}>
            <ArrowIcon className="w-7 h-7" />
          </a>
        </div>
        <div class="horizontal-divider"></div>
      {/if}
    </div>
  </div>
{/if}
