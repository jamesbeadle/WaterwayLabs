<script lang="ts">
  import type {Project} from "../../types";
  export let projects: Project[] =[];
  export let selectProject: (project: Project) => void;
  import { onMount } from 'svelte';

  export let isMenuOpen = false;

  let isSafari = false;

  // Add detection for Chrome mobile
  let isChromeMobile = false;

  onMount(() => {
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // Check if running on Chrome mobile
    isChromeMobile = /Android.*Chrome/.test(navigator.userAgent) || 
                     /CriOS/.test(navigator.userAgent); // for Chrome on iOS
    console.log('Chrome mobile:', isChromeMobile);
  });

  // Add a function to determine icon size class
  function getIconSizeClass(projectName: string) {
    switch(projectName.toLowerCase()) {
      case 'openfpl':
        return 'icon-large';
      case 'transferkings':
        return 'icon-transfer';
      case 'openbeats':
      case 'openchef':
      case 'icpfa':
      case 'openbook':
      case 'opencare':
        return 'icon-medium';
      default:
        return '';
    }
  }
</script>

<!-- Desktop Bar for icons -->
<div class="fixed bottom-0 left-0 right-0 hidden lg:block"> <!-- Updated classes -->
  <div class="icon-bar">
    {#each projects as project}
      <div
        class="icon-box {project.selected ? 'selected': ''}"
        class:safari={isSafari}
        style="background-color: {project.backgroundColor}; --border-color: {project.backgroundColor};"
        role="button"
        aria-label={project.name}
        tabindex="0"
        on:click={() => selectProject(project)}
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectProject(project)}
      >
        <svelte:component 
          this={project.component} 
          className="icon {getIconSizeClass(project.name)}" 
        />
      </div>
    {/each}
  </div>
</div>

<!-- Mobile Bar for icons -->
<div class="fixed bottom-0 left-0 right-0 bg-[#272727] lg:hidden z-50 transition-all duration-300 overflow-hidden"
     class:opacity-0={isMenuOpen}
     class:pointer-events-none={isMenuOpen}
     class:translate-y-full={isMenuOpen}>
  <div class="py-8 pb-4">
    <div class="flex px-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar">
      <div class="flex space-x-6">
        {#each projects as project}
          <div
            class="mobile-icon-box flex-shrink-0 {project.selected ? 'selected': ''}"
            class:chrome-mobile={isChromeMobile}
            style="background-color: {project.backgroundColor}; --border-color: {project.backgroundColor};"
            role="button"
            aria-label={project.name}
            tabindex="0"
            on:click={() => selectProject(project)}
            on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectProject(project)}
          >
            <svelte:component 
              this={project.component} 
              className="icon {getIconSizeClass(project.name)} {isChromeMobile ? 'chrome-mobile-svg' : ''}"
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Existing desktop styles */
  .icon-bar {
    display: flex;
    justify-content: center;
    padding: 16px;
    gap: 32px;
    background: linear-gradient(4.8%, #FFFFFF, 1.2%, #FFFFFF);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 32px;
    width: auto; 
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%); 
    margin-bottom: 16px;
    z-index: 20;
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

  /* Add custom size classes */
  .icon-box :global(.icon.icon-large) {
    transform: translate(-50%, -50%) scale(3);
  }

  .icon-box :global(.icon.icon-transfer) {
    transform: translate(-50%, -50%) scale(2);
  }

  .icon-box :global(.icon.icon-medium) {
    transform: translate(-50%, -50%) scale(1.4);
  }

  /* Mobile styles */
  .mobile-icon-box {
    display: flex;
    position: relative;
    width: 75px;
    height: 75px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    border: 2px solid transparent;
    margin: 10px;
    overflow: hidden;
  }

  .mobile-icon-box :global(.icon) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 100%;
    height: 100%;
  }

  .mobile-icon-box.selected {
    transform: scale(1.1);
    border-color: var(--border-color);
    animation: mobilePulse 2s infinite;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Shared hover and animation styles */
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

  @keyframes mobilePulse {
    0% {
      box-shadow: 0 0 0 0 var(--border-color);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); /* Increased pulse size */
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  /* Specific icon adjustments for mobile */
  .mobile-icon-box :global(.icon.icon-large) {
    transform: translate(-50%, -50%) scale(2.8) !important;
  }

  .mobile-icon-box :global(.icon.icon-transfer) {
    transform: translate(-50%, -50%) scale(0.8) !important;
  }

  .mobile-icon-box :global(.icon.icon-medium) {
    transform: translate(-50%, -50%) scale(1.5) !important;
  }

  /* Chrome mobile specific fixes */
  .mobile-icon-box.chrome-mobile {
    isolation: isolate;
    contain: content;
  }

  .mobile-icon-box :global(.chrome-mobile-svg) {
    transform: translate(-50%, -50%) translateZ(0);
    -webkit-transform: translate(-50%, -50%) translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000;
    -webkit-perspective: 1000;
  }
</style>