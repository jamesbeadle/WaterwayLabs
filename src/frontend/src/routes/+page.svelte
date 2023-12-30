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
  <div class="flex-col space-y-4 m-4">
    <h1 class="text-2xl">Welcome to Waterway Labs</h1>
    <p>We believe the future of the internet lies in decentralised tokenised services. 
      Our mission is to decentralise key services in preparation for this future. </p>
    <h2 class="text-xl">Our Projects:</h2>
  </div>
</Layout>
