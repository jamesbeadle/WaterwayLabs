<script lang="ts">
    import { onMount } from "svelte";
    import type { Project, ProjectId, SupportQueries } from "../../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import LocalSpinner from "../shared/local-spinner.svelte";
    import { supportStore } from "$lib/stores/support-store";

    let project: Project | undefined = $state(undefined);
    let supportQueries: SupportQueries | undefined = $state(undefined);

    onMount(async () => {
      await getSupportQueries();
    });

    async function getSupportQueries(){
      supportQueries = await supportStore.getUserSupportQueries({
        page: 1n,
        status: [],
        dateTo: [],
        dateFrom: []
      });
    }
</script>


{#if project}
  <div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

    {#if supportQueries}
      {#each supportQueries.supportQueries as supportQuery}
        <div class="flex items-center justify-between w-full">
          <p>{supportQuery.id}</p>
          <p>{supportQuery.status}</p>
          <p>{supportQuery.contact}</p>
          <p>{supportQuery.assignedTo}</p>
          <p>{supportQuery.name}</p>
          <p>{supportQuery.submittedOn}</p>
          <p>{supportQuery.submittedBy}</p>
          <p>{supportQuery.message}</p>
        </div>
      {/each}
    {/if}
  </div>
{:else}
  <LocalSpinner />
{/if}


