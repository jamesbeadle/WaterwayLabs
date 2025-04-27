<script lang="ts">
    import { onMount } from "svelte";
    import type { Project, ProjectId } from "../../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import LocalSpinner from "../shared/local-spinner.svelte";

    interface Props {
      selectedProjectId: ProjectId;
    };
    
    let { selectedProjectId } : Props = $props();

    let project: Project | undefined = $state(undefined);
    let logs: Logs | Undefined = $state(undefined);

    onMount(() => {
      project = $projectStore.find(x => x.id == selectedProjectId)!;
      logs = await projectStore.getLogs({

      });
    });
</script>


{#if project}
  <div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

    <h1 class="text-2xl xs:text-3xl lg:text-5xl uppercase semi-bold tracking-wide">{project.name}</h1>

    {#each logs as log}
      <div class="flex items-center justify-between w-full">
        <p>{log.time}</p>
        <p>{log.canisterId}</p>
        <p>{log.detail}</p>
      </div>
    {/each}
  </div>
{:else}
  <LocalSpinner />
{/if}


