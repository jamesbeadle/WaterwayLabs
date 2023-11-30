<script lang="ts">
  import { onMount } from "svelte";
  import { authStore } from "$lib/stores/auth";
  import { toastStore } from "$lib/stores/toast-store";
  import { isLoading } from "$lib/stores/global-stores";
  import { systemStore } from "$lib/stores/system-store";
  import Layout from "./Layout.svelte";

  let isLoggedIn = false;

  onMount(async () => {
    isLoading.set(true);
    try {
      await systemStore.sync();
      await authStore.sync();

      authStore.subscribe((store) => {
        isLoggedIn = store.identity !== null && store.identity !== undefined;
      });

      let systemState = await systemStore.getSystemState();
    } catch (error) {
      toastStore.show("Error fetching homepage data.", "error");
      console.error("Error fetching homepage data:", error);
    } finally {
      isLoading.set(false);
    }
  });
</script>

<Layout>
  <h1>Waterway Labs</h1>
</Layout>

<style>
</style>
