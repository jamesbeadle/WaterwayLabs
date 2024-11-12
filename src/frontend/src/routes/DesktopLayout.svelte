<script lang="ts">
  import { page } from "$app/stores";


  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";

  $: isHomePage = $page.url.pathname === '/';  

</script>

<div class="flex flex-col min-h-screen">
  <div class="px-4 lg:flex">
    <slot></slot>
  </div>
  {#if !isHomePage}
    <Footer />
  {/if}
</div>