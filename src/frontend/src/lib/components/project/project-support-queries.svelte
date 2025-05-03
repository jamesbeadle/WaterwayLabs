<script lang="ts">
    import { onMount } from "svelte";
    import type { Project, ProjectId, SupportQueries } from "../../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import LocalSpinner from "../shared/global/local-spinner.svelte";
    import { supportStore } from "$lib/stores/support-store";

    interface Props {
      selectedProjectId: ProjectId;
    };
    
    let { selectedProjectId } : Props = $props();

    let project: Project | undefined = $state(undefined);
    let supportQueries: SupportQueries | undefined = $state(undefined);

    onMount(async () => {
      project = $projectStore.find(x => x.id == selectedProjectId)!;
      await getSupportQueries();
    });

    async function getSupportQueries(){
      supportQueries = await supportStore.getSupportQueries({
        app: [{ ICFC: null}],
        page: 1n,
        status: [],
        dateTo: [],
        dateFrom: []
      });
    }
</script>


{#if project}
  <div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

    <h1 class="text-2xl xs:text-3xl lg:text-5xl uppercase semi-bold tracking-wide">{project.name}</h1>
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


