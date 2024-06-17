<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import Layout from "./Layout.svelte";

  onMount(async () => {
    try {
      // Fetch data or perform other mount-related tasks
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      isLoading.set(false);
    }
  });
</script>

<Layout>
  <div class="flex items-center justify-center min-h-screen flex-col">
    <img src="logo.png" alt="logo" class="w-24" />
    <div class="text-center flex flex-col space-y-3">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">Welcome to Waterway Labs</h1>
      <p>Web3 Technology Company</p>
      <a href="/projects"><button class="btn">Projects</button></a>
    </div>
  </div>
</Layout>
