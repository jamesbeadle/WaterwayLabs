<script lang="ts">
  import { page } from "$app/stores";

  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";
  import "../app.css";


  $: isHomePage = $page.url.pathname === '/';  
  

</script>
  <div class="flex flex-col min-h-screen">
    <div class="px-4">
      <div class="w-full">
        <Header />
      </div>
      <div class="w-full">
        <slot></slot>
      </div>
    </div>
    {#if !isHomePage}
      <Footer />
    {/if}
  </div>
