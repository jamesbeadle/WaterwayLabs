<script lang="ts">
  import DotsIcon from '$lib/icons/DotsIcon.svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';
  import ArrowIcon from '$lib/icons/ArrowIcon.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import { onMount } from 'svelte';
  export let isMenuOpen = false;

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

<header class="py-4 bg-WaterwayGray lg:py-2">
  <div class="flex items-center justify-between w-full lg:w-1/2">
    <a href="/">
      <div class="flex items-center space-x-2">
        <img src="logo.png" class="h-5" alt="Waterway Labs Logo" />
        <span>WATERWAY <span class="exLight">LABS</span></span>      
      </div>
    </a>

    <nav class="hidden space-x-4 sm:flex lg:mr-2">
      <a href="about" class="hover:underline">ABOUT</a>
      <a href="team" class="hover:underline">TEAM</a>
      <a href="contact" class="hover:underline">CONTACT</a>
      {#if isLoggedIn}
        <a href="account" class="hover:underline">ACCOUNT</a>
      {/if}
    </nav>

    <button
      class="sm:hidden"
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
    </div>
  </div>
{/if}
