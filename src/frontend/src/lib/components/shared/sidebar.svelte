<script lang="ts">
  import { onMount } from "svelte";
    import { signIn, signOut } from "$lib/services/auth-services";
    import { goto } from "$app/navigation";
    import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
    
    interface MenuItem {
        path: string,
        label: string
    }
  
    interface Props {
      isMenuOpen: boolean;
      toggleMenu: () => void;
    }
    let { isMenuOpen, toggleMenu }: Props = $props();
    
    let menuRef: HTMLDivElement;
    let isLoggedIn = $state(false);
  
    async function handleDisconnect(){
      await signOut();
      goto('/', { replaceState: true });
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
  
    async function handleConnect(){
      let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
      };
      authStore.signIn(params);
    }
  
    const menuItems: MenuItem[] = [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
      { path: '/team', label: 'Team' },
      { path: '/support', label: 'Support' },
      { path: '/', label: 'Sign Out' }
    ]
  </script>
  <div 
    class="{isMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-BrandLightBlue shadow-xl transform transition-transform duration-300 ease-in-out"
    bind:this={menuRef}
  >
  
    <button
      onclick={toggleMenu}
      class="absolute p-2 transition-all duration-200 text-BrandGrayShade4 top-4 right-4 hover:text-BrandBlue hover:scale-110"
      aria-label="Close sidebar"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  
    <nav class="h-full px-6 pt-16 text-lg text-black bg-BrandBlueComp cta-text">
      <ul class="space-y-4">
        {#each menuItems as item}
          {#if item.label === 'Connect'}
            {#if !isLoggedIn}
              <li>
                <a 
                  href={item.path}
                  onclick={(e) => {
                    e.preventDefault();
                    toggleMenu();
                    handleConnect();
                  }}
                  class="hover:text-BrandBlue"
                >
                  {item.label}
                </a>
              </li>
            {/if}
          {:else if item.label === 'Disconnect'}
            {#if isLoggedIn}
              <li>
                <a 
                  href={item.path}
                  onclick={(e) => {
                    e.preventDefault();
                    toggleMenu();
                    handleDisconnect();
                  }}
                  class="hover:text-BrandBlue"
                >
                  {item.label}
                </a>
              </li>
            {/if}
          {:else}

            <li>
              <a 
                href={item.path}
                onclick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  handleDisconnect();
                  if (item.label === 'Sign Out') {
                  } else {
                    goto(item.path);
                  }
                }}
                class="hover:text-BrandBlue"
              >
                {item.label}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>
  </div>