<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from "svelte/store";
  import type { Project } from "$lib/types/projects";

  export let projects: Project[] = [];
  export let selectedProjectId: Writable<number>;

  onMount(() => {
    if (projects.length > 0) {
      $selectedProjectId = projects[0].id;
    }
  });

  function handleProjectSelect(project: Project) {
    if (!project) return;
    $selectedProjectId = project.id;
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
      case "GolfPad":
        return "w-6 xs:w-12";
    }
    return "w-6 xs:w-12";
  }

  function getProjectClasses(project: Project) {
    const isSelected = $selectedProjectId === project.id;
    return `w-full transition-transform duration-200 hover:scale-110 ${isSelected ? 'scale-110' : ''}`;
  }

  function getIconClasses(project: Project) {
    const isSelected = $selectedProjectId === project.id;
    return `flex items-center justify-center my-1 rounded-lg w-14 xs:w-20 h-14 xs:h-20 xs:rounded-2xl translate-z-0 ${isSelected ? 'animate-ring-pulse' : ''}`;
  }
</script>

<div class="z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] px-4 py-1">
  <div class="absolute inset-0 backdrop-blur bg-opacity-70 rounded-2xl thin-border"></div>
  <div class="relative flex px-4 py-4 space-x-2 overflow-x-auto md:space-x-5 scrollbar-hide">
    {#each projects as project}
      <button 
        class={getProjectClasses(project)}
        on:click={() => handleProjectSelect(project)}
      >
        <div 
          class={getIconClasses(project)}
          style={`background-color: ${project.backgroundColor}`}
        >
          <svelte:component 
            this={project.component} 
            className={getTailwindSize(project.name)} 
          />
        </div>
      </button>
    {/each}
  </div>
</div>

