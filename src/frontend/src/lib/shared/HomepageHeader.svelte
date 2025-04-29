<script lang="ts">
  import MenuIcon from '$lib/icons/MenuIcon.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import { onMount } from 'svelte';

  interface Props {
    toggleMenu: () => void;
  }

  let { toggleMenu }: Props = $props();

  function handleMenuClick(event: MouseEvent) {
    event.stopPropagation();
    toggleMenu();
  }
  
  let isLoggedIn = $state(false);

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

    <button
      class="flex-shrink-0"
      aria-label="Menu"
      onclick={handleMenuClick}
    >
      <MenuIcon fill='white' className="w-5" />
    </button>
  </div>
</header>
