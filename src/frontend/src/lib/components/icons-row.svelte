<script lang="ts">
  import type {Project} from "../../types";
  export let projects: Project[] =[];
  export let selectProject: (project: Project) => void;
  import { onMount } from 'svelte';

  let isSafari = false;

  onMount(() => {
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log(isSafari);
  });
</script>

<!-- Bar for icons -->
<div class="fixed mb-4 icon-bar">
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
    <svelte:component this={project.component} className="icon" />
  </div>
{/each}
</div>

<style>
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
    justify-content: center;
    align-items:center;
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
  .icon-box.safari {
    display: flex;
    justify-content: center;
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
</style>
