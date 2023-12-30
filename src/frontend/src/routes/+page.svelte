<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import Layout from "./Layout.svelte";


  onMount(async () => {
    try {
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      isLoading.set(false);
    }
  });
</script>

<Layout>
  <h1>Waterway Labs</h1>
</Layout>
