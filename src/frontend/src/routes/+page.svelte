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
  <div class="flex items-center justify-center h-full flex-col">
    <img src="logo.png" alt="logo" class="w-24" />
    <div class="text-center">
      <h1 class="text-4xl font-bold">Welcome to Waterway Labs</h1>
      <p class="mt-4">Our mission is to decentralise key services using the Internet Computer blockchain.</p>
      <a href="/projects"><button class="btn mt-4">Projects</button></a>
    </div>
  </div>
</Layout>
