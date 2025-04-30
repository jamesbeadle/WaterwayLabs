<script lang="ts">
    import CopyPrincipal from "$lib/components/shared/copy-principal.svelte";
  import { authStore } from "$lib/stores/auth-store";
  import { onMount } from "svelte";


  onMount(async () => {
    await authStore.sync();
    
  });
</script>
  
<div class="flex flex-col space-y-2 p-4">
  <h1>Profile</h1>

  <CopyPrincipal backgroundColour='#2D5F73' borderColor='white' isProfile=true />

</div>

