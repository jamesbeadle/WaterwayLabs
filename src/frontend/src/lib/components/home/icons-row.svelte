<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Project } from "$lib/types/projects";

  export let projects: Project[] = [];
  export let selectedProjectId: Writable<number>;

  function handleProjectSelect(project: Project) {
    console.log(project)
    if (!project) return;
    $selectedProjectId = project.id;
  }

  function getTailwindSize(projectName: string) : string{
    switch(projectName){
      case "OpenFPL":
      case "OpenWSL":
      case "OpenBook":
        return "w-5 md:w-8"
      case "OpenBeats":
        return "w-4 md:w-10"
      case "Transfer Kings":
        return "w-6 md:w-10"
    }
    return "w-7 md:w-11";
  }
</script>

<div class="z-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] px-4 py-1">
  <div class="absolute inset-0 backdrop-blur bg-opacity-70 rounded-2xl thin-border"></div>

  <div class="relative flex overflow-x-auto space-x-2 md:space-x-4 py-1 scrollbar-hide">
    {#each projects as project}

      <button class="w-full" on:click={() => handleProjectSelect(project)}>
            
        <div class="flex-none w-10 h-10 md:w-20 md:h-20 rounded-lg my-2 flex items-center justify-center text-white text-2xl" style={`background-color: ${project.backgroundColor}`}>
          <svelte:component 
                  this={project.component} 
                  className={getTailwindSize(project.name)} 
                />
        </div>

      </button>
    {/each}
  </div>
</div>

