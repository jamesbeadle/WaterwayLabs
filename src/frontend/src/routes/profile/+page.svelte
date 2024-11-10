<script lang="ts">
  import { authStore } from "$lib/stores/auth-store";
  import { onMount } from "svelte";
  import Layout from "../Layout.svelte";


  onMount(async () => {
    await authStore.sync();
    
  });
</script>
<Layout>
  <h1>Profile</h1>
</Layout>