<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Project } from "$lib/types/projects";

  export let projects: Project[] = [];
  export let selectedProject: Project | null = null;
  export let isMenuOpen: boolean = false;

  const dispatch = createEventDispatcher();

  function handleProjectSelect(project: Project) {
    if (!project) return;

    dispatch('select', project);
  }

  function getIconSizeClass(name: string): string {
    const sizeMap: Record<string, string> = {
      'OpenFPL': 'icon-lg',
      'Football God': 'icon-sm',
      'GolfPad': 'icon-sm',
      'Transfer Kings': 'icon-sm',
      'OpenBook': 'icon-md',
      'OpenBeats': 'icon-md',
      'OpenChef': 'icon-md',
      'ICPFA': 'icon-md',
      'OpenCare': 'icon-md',
      'Waterway Labs': 'icon-md',
      'OpenWSL': 'icon-lg'
    };
    
    return sizeMap[name] || 'icon-md'; 
  }
</script>

<div class="icons-container">
  <div class="icon-row-wrapper hide-scrollbar">
    <div class="icon-row">
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
    </div>
  </div>
</div>

<style>
    .icons-container {
    display: flex;
    justify-content: center;
    padding: 32px 24px;
    background: linear-gradient(4.8%, #FFFFFF, 1.2%, #FFFFFF);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 32px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%); 
    margin-bottom: 16px;
    z-index: 20;
    max-width: 90vw;
    width: auto;
  }

  .icon-row-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 24px 16px;
    margin: -24px -16px;
    width: 100%;
  }

  .icon-row {
    display: flex;
    gap: 24px;
    padding: 0 16px;
    width: max-content;
    min-height: 120px;
  }

  .icon-box {
    display: flex;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin: auto;
    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    transform: scale(1);
    border: 3px solid transparent;
  }

  .icon-box :global(.icon) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  .icon-box :global(.icon.icon-lg) {
    transform: translate(-50%, -50%) scale(2.7);
  }

  .icon-box :global(.icon.icon-md) {
    transform: translate(-50%, -50%) scale(1.6);
  }

  .icon-box :global(.icon.icon-sm) {
    transform: translate(-50%, -50%) scale(1.2);
  }

  .icon-box:hover {
    transform: scale(1.1); 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); 
  }

  .icon-box.selected {
    transform: scale(1.15); 
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); 
    border-color: var(--border-color);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--border-color);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  @media (max-width: 768px) {
    .icons-container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      transform: none;
      margin: 0;
      max-width: 100%;
      width: 100%;
      border-radius: 0;
      background: #272727;
      padding: 20px 12px;
    }

    .icon-row-wrapper {
      padding: 20px 12px;
      margin: -20px -12px;
    }

    .icon-row {
      gap: 20px;
      padding: 0 12px;
      min-height: 100px;
    }

    .icon-box {
      width: 75px;
      height: 75px;
      border-radius: 16px;
      border: 2px solid transparent;
    }

    .icon-box :global(.icon.icon-lg) {
      transform: translate(-50%, -50%) scale(2.8) !important;
    }

    .icon-box :global(.icon.icon-transfer) {
      transform: translate(-50%, -50%) scale(0.8) !important;
    }

    .icon-box :global(.icon.icon-md) {
      transform: translate(-50%, -50%) scale(1.5) !important;
    }

    .icon-box.selected {
      transform: scale(1.1);
      animation: mobilePulse 2s infinite;
    }
  }

  @keyframes mobilePulse {
    0% {
      box-shadow: 0 0 0 0 var(--border-color);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .icon-box {
      isolation: isolate;
      contain: content;
    }

    .icon-box :global(.icon) {
      transform: translate(-50%, -50%) translateZ(0);
      -webkit-transform: translate(-50%, -50%) translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      perspective: 1000;
      -webkit-perspective: 1000;
    }
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
