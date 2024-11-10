<script lang="ts">
  import { page } from '$app/stores';
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

<header class="fixed top-0 bg-[#272727] z-50 left-0"
  class:right-0={!isHomePage || !isDesktop}
  class:right-[50%]={isHomePage && isDesktop}>
  <nav class="text-white">
    <div class="flex items-center justify-between h-16 px-4"
         class:lg:px-20={!isHomePage}>
      <a href="/" class="flex items-center">
        <img src="logo.png" class="h-6" alt="Waterway Labs Logo" />
        <span class="ml-2 text-xl tracking-wide font-mona">
          <span class="text-white">WATERWAY</span>
          <span class="text-white font-exlight">LABS</span>
        </span>
      </a>
      <div class="hidden space-x-8 text-sm md:flex font-mona">
        <a href="/about" class="hover:text-blue-400">ABOUT</a>
        <a href="/team" class="hover:text-blue-400">TEAM</a>
        <a href="/contact" class="hover:text-blue-400">CONTACT</a>
        {#if isLoggedIn}
          <a href="/profile" class="hover:text-blue-400">PROFILE</a>
        {/if}
        <button 
          class="hover:text-blue-400"
          on:click={() => { 
            if (isLoggedIn) {
              handleLogout();
            } else {
              handleLogin();
            }
          }}>
          <span>{isLoggedIn ? 'LOGOUT' : 'LOGIN'}</span>
        </button>
      </div>
      <button 
        class="p-2 md:hidden" 
        on:click={toggleMenu}
        aria-label="Toggle menu">
        <div class="flex flex-col space-y-1.5">
          <span class="block w-6 h-0.5 bg-white transition-transform duration-300" 
                class:rotate-45={isMenuOpen} 
                class:translate-y-2={isMenuOpen}></span>
          <span class="block w-6 h-0.5 bg-white transition-opacity duration-300"
                class:opacity-0={isMenuOpen}></span>
          <span class="block w-6 h-0.5 bg-white transition-transform duration-300"
                class:-rotate-45={isMenuOpen} 
                class:-translate-y-2={isMenuOpen}></span>
        </div>
      </button>
    </div>
  </nav>

  {#if isMenuOpen}
    <div class="fixed inset-0 bg-[#272727] z-50 transition-opacity duration-300"
         class:opacity-100={isMenuOpen}
         class:opacity-0={!isMenuOpen}>
      <div class="flex items-center justify-between h-16 px-4 border-b border-[#4E4E4E]"
           class:lg:px-20={!isHomePage}>
        <a href="/" class="flex items-center">
          <img src="logo.png" class="h-6" alt="Waterway Labs Logo" />
          <span class="ml-2 text-xl tracking-wide font-mona">
            <span class="text-white">WATERWAY</span>
            <span class="text-white font-exlight">LABS</span>
          </span>
        </a>
        <button 
          class="p-2" 
          on:click={toggleMenu}
          aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-col items-start px-8 pt-16">
        <div class="flex items-center justify-between w-full">
          <a href="/about" 
             class="transition-all duration-300 font-h4 font-med hover:text-blue-400 hover:translate-x-2" 
             on:click={toggleMenu}>
             ABOUT
          </a>
          <a href="/about" on:click={toggleMenu}>
            <img src="arrow.svg" alt="arrow" class="w-6 h-6 cursor-pointer hover:opacity-80" />
          </a>
        </div>
        <hr class="w-full my-8 border-t-2 border-[#4E4E4E]" />
        
        <div class="flex items-center justify-between w-full">
          <a href="/team" 
             class="transition-all duration-300 font-h4 font-med hover:text-blue-400 hover:translate-x-2" 
             on:click={toggleMenu}>
             TEAM
          </a>
          <a href="/team" on:click={toggleMenu}>
            <img src="arrow.svg" alt="arrow" class="w-6 h-6 cursor-pointer hover:opacity-80" />
          </a>
        </div>
        <hr class="w-full my-8 border-t-2 border-[#4E4E4E]" />
        
        <div class="flex items-center justify-between w-full">
          <a href="/contact" 
             class="transition-all duration-300 font-h4 font-med hover:text-blue-400 hover:translate-x-2" 
             on:click={toggleMenu}>
             CONTACT
          </a>
          <a href="/contact" on:click={toggleMenu}>
            <img src="arrow.svg" alt="arrow" class="w-6 h-6 cursor-pointer hover:opacity-80" />
          </a>
        </div>
        <hr class="w-full my-8 border-t-2 border-[#4E4E4E]" />
        
        {#if isLoggedIn}
          <div class="flex items-center justify-between w-full">
            <a href="/profile" 
               class="transition-all duration-300 font-h4 font-med hover:text-blue-400 hover:translate-x-2" 
               on:click={toggleMenu}>
               PROFILE
            </a>
            <a href="/profile" on:click={toggleMenu}>
              <img src="arrow.svg" alt="arrow" class="w-6 h-6 cursor-pointer hover:opacity-80" />
            </a>
          </div>
          <hr class="w-full my-8 border-t-2 border-[#4E4E4E]" />
        {/if}
        
        <div class="flex items-center justify-between w-full">
          <button 
            class="flex items-center justify-between w-full transition-all duration-300 font-h4 font-med hover:text-blue-400 hover:translate-x-2"
            on:click={() => { 
              if (isLoggedIn) {
                handleLogout();
              } else {
                handleLogin();
              }
              toggleMenu();
            }}>
            <span>{isLoggedIn ? 'LOGOUT' : 'LOGIN'}</span>
            <img src="arrow.svg" alt="arrow" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</header>

<style>
  a {
    position: relative;
    transition: all 0.3s ease;
  }

  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #60A5FA;
    transition: width 0.3s ease;
  }

  a:hover::after {
    width: 100%;
  }
</style>
