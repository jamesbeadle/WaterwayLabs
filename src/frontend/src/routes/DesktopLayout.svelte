<script lang="ts">
  import { page } from "$app/stores";
  import Footer from "$lib/shared/Footer.svelte";
  import Header from "$lib/shared/Header.svelte";

  $: isHomePage = $page.url.pathname === '/';  

</script>

<div class="flex flex-col min-h-screen">
  {#if !isHomePage}
    <div class="mx-10 mt-4">
      <Header />
    </div>
  {/if}
  <div class="lg:flex">
    <slot></slot>
  </div>
  {#if !isHomePage}
    <div class="mx-10">
      <Footer />
    </div>
  {/if}
</div>