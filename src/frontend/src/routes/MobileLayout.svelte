<script lang="ts">
  import { page } from "$app/stores";

  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";
  import "../app.css";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  let { children } : Props = $props();

  interface Props {
    children: Snippet
  }

  let isHomePage = $state(false);

  $effect(() => {
    isHomePage = $page.url.pathname === '/';  
  });
  
</script>
<div class="full-screen-flex-col">
  <div class="w-full px-4">
    <Header />
  </div>
  <div class="w-full">
    {@render children()}
  </div>
</div>
{#if !isHomePage}
  <Footer />
{/if}
