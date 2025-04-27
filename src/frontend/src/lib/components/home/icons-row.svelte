<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from "$lib/types/projects";
  import type { ProjectId } from '../../../../../declarations/backend/backend.did';
  import OpenfplIcon from '$lib/icons/svgs/openfpl-icon.svelte';
  import OpencareIcon from '$lib/icons/svgs/opencare-icon.svelte';
  import OpenchefIcon from '$lib/icons/svgs/openchef-icon.svelte';
  import OpenbeatsIcon from '$lib/icons/svgs/openbeats-icon.svelte';
  import OpenbookIcon from '$lib/icons/svgs/openbook-icon.svelte';
  import GolfpadIcon from '$lib/icons/svgs/golfpad-icon.svelte';
  import IcpfaIcon from '$lib/icons/svgs/icpfa-icon.svelte';
  import TransferKingsIcon from '$lib/icons/svgs/transfer-kings-icon.svelte';
  import OpenwslIcon from '$lib/icons/svgs/openwsl-icon.svelte';
  import JeffBetsIcon from '$lib/icons/svgs/jeff-bets-icon.svelte';
  import IcfcIcon from '$lib/icons/svgs/icfc-icon.svelte';
  import Icf1Icon from '$lib/icons/svgs/icf1-icon.svelte';

  interface Props {
    selectedProjectId: ProjectId;
    projects: Project[];
  };
  
  let { selectedProjectId, projects } : Props = $props();
  
  onMount(() => {
    if (projects.length > 0) {
      selectedProjectId = projects[0].id;
    }
  });

  function handleProjectSelect(project: Project) {
    if (!project) return;
    selectedProjectId = project.id;
  }

  function getTailwindSize(projectName: string) : string{
    switch(projectName){
      case "OpenFPL":
      case "OpenWSL":
      case "OpenBook":
      case "Jeff Bets":
      case "ICFC":
        return "w-6 xs:w-8 "
      case "OpenBeats":
        return "w-6 xs:w-8 md:w-9"
      case "Transfer Kings":
        return "w-6 xs:w-12"
      case "ICGC":
        return "w-6 xs:w-12";
    }
    return "w-6 xs:w-12";
  }

  function getProjectClasses(project: Project) {
    const isSelected = selectedProjectId === project.id;
    return `w-full transition-transform duration-200 hover:scale-110 ${isSelected ? 'scale-110' : ''}`;
  }

  function getIconClasses(project: Project) {
    const isSelected = selectedProjectId === project.id;
    return `flex items-center justify-center my-1 rounded-lg w-14 xs:w-20 h-14 xs:h-20 xs:rounded-2xl translate-z-0 ${isSelected ? 'animate-ring-pulse' : ''}`;
  }
</script>

<div class="z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] px-4 py-1">
  <div class="absolute inset-0 backdrop-blur bg-opacity-70 rounded-2xl thin-border"></div>
  <div class="relative flex px-4 py-4 space-x-2 overflow-x-auto md:space-x-5 scrollbar-hide">
    {#each projects as project}
      <button 
        class={getProjectClasses(project)}
        onclick={() => handleProjectSelect(project)}
      >
        <div 
          class={getIconClasses(project)}
          style={`background-color: ${project.backgroundColor}`}
        >
          {#if project.name == 'ICFC'}
            <IcfcIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'OpenFPL'}
            <OpenfplIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'Jeff Bets'}
            <JeffBetsIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'OpenWSL'}
            <OpenwslIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'Transfer Kings'}
            <TransferKingsIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'ICPFA'}
            <IcpfaIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'ICGC'}
            <IcfcIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'GolfPad'}
            <GolfpadIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'ICF1'}
            <Icf1Icon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'OpenBook'}
            <OpenbookIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'OpenBeats'}
            <OpenbeatsIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'OpenChef'}
            <OpenchefIcon className={getTailwindSize(project.name)} />
          {/if}
          {#if project.name == 'OpenCare'}
            <OpencareIcon className={getTailwindSize(project.name)} />
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>

