<script lang="ts">
  import { authStore } from '$lib/stores/auth-store';
  import { onMount } from 'svelte';
  import MenuIcon from '$lib/icons/MenuIcon.svelte';
  
  let isLoggedIn = $state(false);

  interface Props {
    toggleMenu: () => void;
  }

  let { toggleMenu }: Props = $props();

  function handleMenuClick(event: MouseEvent) {
    event.stopPropagation();
    toggleMenu();
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

<header class="z-30 flex items-center justify-between h-16 px-4 text-white shadow-md bg-BrandGray/90">
  <a 
    href="/" 
    class="flex items-center space-x-2 transition-transform hover:scale-105"
  >
    <img src="logo.png" class="h-5" alt="Waterway Labs Logo" />
    <span class="lg:text-sm xl:text-base">WATERWAY <span class="exLight">LABS</span></span>      
  </a>

  <div class="flex items-center gap-4">
    <button
      onclick={handleMenuClick}
      class="p-2 text-white transition-colors rounded-md bg-BrandBlueComp hover:bg-BrandBlue"
      aria-label="Toggle menu"
    >
      <MenuIcon className="w-6 h-6" fill="white" />
    </button>
  </div>
</header>
