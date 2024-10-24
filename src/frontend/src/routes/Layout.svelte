<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import Header from "$lib/shared/Header.svelte";
  import "../app.css";
  import { page } from "$app/stores";
  import { BusyScreen, Spinner, Toasts } from "@dfinity/gix-components";
  import Footer from "$lib/shared/Footer.svelte";
  export let overrideBackground = false;

  const init = async () => await Promise.all([syncAuthStore()]);

  const syncAuthStore = async () => {
    if (!browser) {
      return;
    }
  };

  $: isHomePage = $page.url.pathname === '/';
  $: (() => {
    if (!browser) {
      return;
    }

    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();
  afterUpdate(() => {
    if (browser) {
      document.body.style.height = '100%';
      setTimeout(() => {
        document.body.style.height = 'auto';
      }, 0);
    }
  });
</script>

<svelte:window on:storage={syncAuthStore} />
{#await init()}
  <div in:fade>
    <Spinner />
  </div>
{:then _}
  <div class="flex flex-col min-h-screen" class:override-bg={overrideBackground}>
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    {#if !isHomePage}
      <Footer/>
    {/if}
  </div>
{/await}

<BusyScreen />

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .override-bg {
    background-color: #272727;
  }
</style>
