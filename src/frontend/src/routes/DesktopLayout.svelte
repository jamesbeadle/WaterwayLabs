<script lang="ts">
  import { page } from "$app/stores";
  import Footer from "$lib/shared/Footer.svelte";
  import Header from "$lib/shared/Header.svelte";
    import type { Snippet } from "svelte";

  interface Props {
    children: Snippet
  }

  let { children } : Props = $props();

</script>

<div class="full-screen-flex">
  {#if $page.url.pathname != '/'}
    <div class="mx-4 mt-2">
      <Header />
    </div>
  {/if}
    {@render children()}
  {#if $page.url.pathname != '/'}
    <Footer />
  {/if}
</div>