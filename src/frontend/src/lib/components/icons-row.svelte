<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Project } from "$lib/types/projects";
  import { browser } from '$app/environment';

  export let projects: Project[] = [];
  export let selectedProject: Project | null = null;
  export let isMenuOpen: boolean = false;

  const isSafari = browser ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
  const dispatch = createEventDispatcher();

  function handleProjectSelect(project: Project) {
    if (!project) return;
    dispatch('select', project);
  }

  function getIconSizeClass(name: string): string {
    const sizeMap: Record<string, string> = {
      'OpenFPL': 'icon-lg',
      'Football God': 'icon-md',
      'GolfPad': 'icon-md',
      'Transfer Kings': 'icon-md',
      'OpenBook': 'icon-md',
      'OpenBeats': 'icon-md',
      'OpenChef': 'icon-md',
      'ICPFA': 'icon-md',
      'OpenCare': 'icon-md',
      'Waterway Labs': 'icon-md',
      'OpenWSL': 'icon-md'
    };
    
    return sizeMap[name] || 'icon-md'; // Default to medium if not found
  }
</script>

<!-- In your template -->
{#each projects as project}
  <div
    class="icon-box {project.selected ? 'selected': ''}"
    style="background-color: {project.mainColour}; --border-color: {project.mainColour};"
    role="button"
    aria-label={project.name}
    tabindex="0"
    on:click={() => handleProjectSelect(project)}
    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleProjectSelect(project)}
  >
    <svelte:component 
      this={project.component} 
      className="icon {getIconSizeClass(project.name)}" 
    />
  </div>
{/each}
