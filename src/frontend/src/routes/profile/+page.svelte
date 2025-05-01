<script lang="ts">
    import UserDetails from "$lib/components/profile/user-details.svelte";
    import UserSupportQueries from "$lib/components/profile/user-support-queries.svelte";
    import CopyPrincipal from "$lib/components/shared/copy-principal.svelte";
  import { authStore } from "$lib/stores/auth-store";
  import { onMount } from "svelte";

  let isLoading = $state(true);
  let activeTab: string = $state("details");

  onMount(async () => {
    await authStore.sync();
    isLoading = false;
    
  });

  function setActiveTab(tabName: string) {
      activeTab = tabName;
  }

  const tabs: { id: string; label: string }[] = [
      { id: "details", label: "Details" },
      { id: "support-queries", label: "Support Queries" },
  ];
</script>
  
<div class="flex flex-col space-y-2 p-4">
  <h1>Profile</h1>
  
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    
    <ul class="tab-container flex flex-wrap gap-2">
        {#each tabs as tab}
            <li>
                <button
                    class={`px-4 py-2 rounded-xl text-white ${
                        activeTab === tab.id
                            ? "bg-BrandBlue"
                            : "border-1 border-solid border-BrandLightBlue"
                    }`}
                    onclick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            </li>
        {/each}
    </ul>

    {#if activeTab == 'details'}
      <UserDetails />
    {/if}

    {#if activeTab == 'support-queries'}
      <UserSupportQueries />
    {/if}

</div>


</div>

