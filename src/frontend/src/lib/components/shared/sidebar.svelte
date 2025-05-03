<script lang="ts">
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
    import MenuIcon from "$lib/icons/MenuIcon.svelte";
    import WaterwayLabsIcon from "$lib/icons/svgs/waterway-labs-icon.svelte";
    import CloseIcon from "$lib/icons/CloseIcon.svelte";
    import AboutIcon from "$lib/icons/AboutIcon.svelte";
    import SupportIcon from "$lib/icons/SupportIcon.svelte";
    import ProfileIcon from "$lib/icons/ProfileIcon.svelte";
    import LogoutIcon from "$lib/icons/LogoutIcon.svelte";
    import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
    import { onMount } from "svelte";
    import LocalSpinner from "./global/local-spinner.svelte";
    import WalletIcon from "$lib/icons/WalletIcon.svelte";
    import AdminIcon from "$lib/icons/AdminIcon.svelte";

  interface Props {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  }
  let { isMenuOpen, toggleMenu }: Props = $props();

  let isLoading = $state(false);
  let isLoggedIn = $state(false); 
  let isAdmin = $state(false);

  onMount(async () => {
      authStore.subscribe(async (store) => {
        isLoggedIn = store.identity !== null && store.identity !== undefined;
        if(!isLoggedIn) { 
          isLoading = false;
          return;
        }

        try {
          isAdmin = await authStore.isAdmin();
        } catch {

        } finally {
          isLoading = false;
        }
      });
  });

  const menuItems = [
    { icon: MenuIcon, label: "Home", path: "/", authOnly: false },
    { icon: AboutIcon, label: "About", path: "/about", authOnly: false },
    { icon: SupportIcon, label: "Support", path: "/support", authOnly: true },
    { icon: ProfileIcon, label: "Profile", path: "/profile", authOnly: true },
  ];

  const signInItem = { icon: WalletIcon, label: "Sign In", path: "/", authOnly: false };
  const signOutItem = { icon: LogoutIcon, label: "Sign Out", path: "/", authOnly: true };

  async function handleMenuItemClick(item: (typeof menuItems)[number]) {
    if (item.label === "Sign Out") {
      await authStore.signOut();
      await goto("/", { replaceState: true });
      toggleMenu();
      return;
    }

    if (item.label === "Sign In") {
      let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
      };
      authStore.signIn(params);
      await goto("/", { replaceState: true });
      toggleMenu();
      return;
    }

    await goto(item.path);
    toggleMenu();
  }

  async function loadAdmin(){
    await goto('/admin');
    toggleMenu();
  }

  function handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".sidebar-content") &&
      !target.closest("[aria-label='Toggle menu']") &&
      isMenuOpen
    ) {
      toggleMenu();
    }
  }
</script>

<svelte:body onclick={handleOutsideClick} />

{#if isMenuOpen}
  <div
    class="fixed inset-0 z-30 bg-black/50"
    transition:fade={{ duration: 300 }}
  ></div>
{/if}

<div
  class="{isMenuOpen ? 'translate-x-0' : 'translate-x-[calc(100%+0.5rem)] sm:translate-x-[calc(100%+0.5rem)]'} fixed top-0 bottom-0 right-0 z-50 w-[calc(100%-1rem)] sm:w-80 m-2 sm:m-2 bg-BrandGray rounded-3xl shadow-lg transform transition-transform duration-300 ease-in-out sidebar-content flex flex-col"
>
  <div class="flex justify-between items-center px-6 pt-6">
    <div class="flex items-center">
      <WaterwayLabsIcon className="w-6 mr-2"/>
      <p class="text-lg">Waterway Labs</p>
    </div>
    <button
      onclick={toggleMenu}
      class="p-2 hover:scale-110 transition-all duration-200"
      aria-label="Close sidebar"
    >
      <CloseIcon fill='white' className="w-4 h-4" />
    </button>
  </div>

  <nav class="flex-1 text-lg px-6 pt-6">
    <ul class="space-y-2">
      {#each menuItems as item}
        {#if !item.authOnly}
          <li>
            <button
              onclick={() => handleMenuItemClick(item)}
              class="flex items-center w-full p-3 space-x-4 rounded-lg transition-colors
                {$page.url.pathname === item.path ? 'bg-BrandBlue text-white' : 'text-white hover:bg-BrandTurquoise'}"
              aria-current={$page.url.pathname === item.path ? 'page' : undefined}
            >
              <item.icon
                className="w-6 h-6"
                fill='white'
              />
              <span class='text-white'>
                {item.label}
              </span>
            </button>
          </li>
        {/if}
        {#if item.authOnly && isLoggedIn}
          <li>
            <button
              onclick={() => handleMenuItemClick(item)}
              class="flex items-center w-full p-3 space-x-4 rounded-lg transition-colors
                {$page.url.pathname === item.path ? 'bg-BrandBlue text-white' : 'text-white hover:bg-BrandTurquoise'}"
              aria-current={$page.url.pathname === item.path ? 'page' : undefined}
            >
              <item.icon
                className="w-6 h-6"
                fill='white'
              />
              <span class='text-white'>
                {item.label}
              </span>
            </button>
          </li>
        {/if}
      {/each}
      {#if isAdmin}
        <li>
          <button
            onclick={() => loadAdmin()}
            class="flex items-center w-full p-3 space-x-4 rounded-lg transition-colors
              {$page.url.pathname === '/admin' ? 'bg-BrandBlue text-white' : 'text-white hover:bg-BrandTurquoise'}"
            aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}
          >
            <AdminIcon className="w-6 h-6" fill={$page.url.pathname === '/admin' ? '#1F2937' : 'white'} />
            
            <span class='text-white'>
              Admin
            </span>
          </button>
        </li>
      {/if}
    </ul>
  </nav>



  {#if isLoading}
    <LocalSpinner />
  {:else if !isLoggedIn}
    <div class="px-6 pb-6">
      <button
        onclick={() => handleMenuItemClick(signInItem)}
        class="brand-button w-full flex items-center justify-center space-x-4 p-3 rounded-lg"
      >
        <signInItem.icon fill='white' className="w-6 h-6" />
        <span>{signInItem.label}</span>
      </button>
    </div>
  {:else}
    <div class="px-6 pb-6">
      <button
        onclick={() => handleMenuItemClick(signOutItem)}
        class="brand-button w-full flex items-center justify-center space-x-4 p-3 rounded-lg"
      >
        <signOutItem.icon fill='white' className="w-6 h-6" />
        <span>{signOutItem.label}</span>
      </button>
    </div>
  {/if}

</div>

<style>

  .translate-x-0 {
    transform: translateX(0) !important;
  }

  .translate-x-\[calc\(100\%\+0\.5rem\)\] {
    transform: translateX(calc(100% + 0.5rem)) !important;
  }

</style>