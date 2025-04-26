<script lang="ts">
    import ArrowIcon from "$lib/icons/ArrowIcon.svelte";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
    import { onMount } from "svelte";
    import type { Project, ProjectId } from "../../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import WidgetSpinner from "../shared/widget-spinner.svelte";

    interface Props {
      selectedProjectId: ProjectId;
    };
    
    let { selectedProjectId } : Props = $props();

    let project: Project | undefined = $state(undefined);

    onMount(() => {
      project = $projectStore.find(x => x.id == selectedProjectId)!;
    });
</script>


{#if project}
  <div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

    <div class="flex items-center justify-between w-full">
      <div class="flex flex-row space-x-4 lg:hidden">
        {#if project.githubLink.length && project.githubLink.length > 0}
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-5 w-5" color={project.mainColour}/>
          </a>
        {/if}
        {#if project?.socialLinks}
          {#each project?.socialLinks as link}
            <p>{link[0]}: <a href={link[0]}>{link[0]}</a></p>
          {/each}
        {/if}
      </div>
    </div>

    <h1 class="text-2xl xs:text-3xl lg:text-5xl uppercase semi-bold tracking-wide">{project.name}</h1>

    <p class="text-base xs:text-xl uppercase tracking-wide">
      {project.description} 
    </p>
    
    <p class="text-sm exLight">
      {project.summary}
    </p>
    <div class="flex items-center justify-between w-full">
      <a href={project.websiteURL} target="_blank" rel="noopener noreferrer" 
        class="flex items-center w-full lg:w-auto xs:w-[99%] mt-4 p-1 transition-colors border border-white rounded-full group hover:bg-white hover:text-black">
        <span class="flex-1 text-xs semi-bold tracking-wide text-center lg:px-4">VISIT SITE</span>
        <span class="w-8 h-8 flex items-center justify-center">
          <ArrowIcon className="w-8 h-8" />
        </span>
      </a>
    </div>
  </div>
{:else}
  <WidgetSpinner />
{/if}


