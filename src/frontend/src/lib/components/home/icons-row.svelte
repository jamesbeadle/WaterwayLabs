<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Project } from "$lib/types/projects";

  export let projects: Project[] = [];
  export let selectedProjectId: Writable<number>;

  function handleProjectSelect(project: Project) {
    if (!project) return;
    $selectedProjectId = project.id;
  }

  function getTailwindSize(projectName: string) : string{
    switch(projectName){
      case "OpenFPL":
      case "OpenWSL":
      case "OpenBook":
        return "w-8 "
      case "OpenBeats":
        return "w-8 md:w-10"
      case "Transfer Kings":
        return "w-12"
    }
    return "w-12";
  }
</script>

<div class="z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] px-4 py-1">
  <div class="absolute inset-0 backdrop-blur bg-opacity-70 rounded-2xl thin-border"></div>
  <div class="relative flex py-2 space-x-2 overflow-x-auto md:space-x-4 scrollbar-hide">
    {#each projects as project}
      <button class="w-full" on:click={() => handleProjectSelect(project)}>
        <div class="flex justify-center w-20 h-20 my-2 rounded-2xl translate-z-0" style={`background-color: ${project.backgroundColor}`}>
          <svelte:component 
            this={project.component} 
            className={getTailwindSize(project.name)} 
          />
        </div>
      </button>
    {/each}
  </div>
</div>

