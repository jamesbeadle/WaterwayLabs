<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";
  import "../app.css";

  import { BusyScreen, Spinner, Toasts } from "@dfinity/gix-components";

  const init = async () => await Promise.all([syncAuthStore()]);

  const syncAuthStore = async () => {
    if (!browser) {
      return;
    }
  };

  $: (() => {
    if (!browser) {
      return;
    }

    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();
</script>

<svelte:window on:storage={syncAuthStore} />
{#await init()}
  <div in:fade>
    <Spinner />
  </div>
{:then _}
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1 p-4">
      <slot />
    </main>
    <Footer />
  </div>
{/await}

<BusyScreen />
