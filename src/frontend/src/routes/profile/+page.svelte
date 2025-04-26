<script lang="ts">
  import { authStore } from "$lib/stores/auth-store";
  import { onMount } from "svelte";


  onMount(async () => {
    await authStore.sync();
    
  });
</script>
  <h1>Profile</h1>