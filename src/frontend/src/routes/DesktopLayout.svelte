<script lang="ts">
  import { page } from "$app/stores";
  import Footer from "$lib/shared/Footer.svelte";
  import Header from "$lib/shared/Header.svelte";

  $: isHomePage = $page.url.pathname === '/';  

</script>

<div class="full-screen-flex">
  {#if !isHomePage}
    <div class="mx-4 mt-2">
      <Header />
    </div>
  {/if}
  <slot></slot>
  {#if !isHomePage}
    <Footer />
  {/if}
</div>