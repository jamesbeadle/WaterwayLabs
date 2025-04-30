<script lang="ts">
    import { onMount } from "svelte";
    import type { ApplicationLogs, Project, ProjectId } from "../../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import LocalSpinner from "../shared/local-spinner.svelte";

    interface Props {
      selectedProjectId: ProjectId;
    };
    
    let { selectedProjectId } : Props = $props();

    let project: Project | undefined = $state(undefined);
    let logs: ApplicationLogs | undefined = $state(undefined);

    onMount(async () => {
      project = $projectStore.find(x => x.id == selectedProjectId)!;
      await getLogs();
    });

    async function getLogs(){
      logs = await projectStore.getApplicationLogs({
        app: { ICFC: null},
        page: 1n
      });
    }
</script>


{#if project}
  <div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

    <h1 class="text-2xl xs:text-3xl lg:text-5xl uppercase semi-bold tracking-wide">{project.name}</h1>
    {#if logs}
      {#each logs.logs as log}
        <div class="flex items-center justify-between w-full">
          <p>{log.id}</p>
          <p>{log.app}</p>
          <p>{log.createdOn}</p>
          <p>{log.detail}</p>
          <p>{log.error}</p>
          <p>{log.logType}</p>
          <p>{log.title}</p>
        </div>
      {/each}
    {/if}
  </div>
{:else}
  <LocalSpinner />
{/if}


