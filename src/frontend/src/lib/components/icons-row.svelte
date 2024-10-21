<script lang="ts">
    import type {Project} from "../../types";
    export let projects: Project[] =[];
    export let selectProject: (project: Project) => void;
</script>
  
<!-- Bar for icons -->
<div class="fixed mb-4 icon-bar">
  {#each projects as project}
    <div
      class="icon-box {project.selected ? 'selected': ''}"
      style="background-color: {project.backgroundColor};"
      role="button"
      aria-label={project.name}
      on:click={() => selectProject(project)}
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
  transform: translateX(-51%); /* Adjust the bar to be centered */
  margin-bottom: 16px;
  z-index: 20;
}

.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* Square size */
  height: 100px; /* Square size */
  border-radius: 16px; /* Reduced border-radius to keep more square shape */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 20;
  transition: transform 0.4 ease-in-out, box-shadow 0.4s ease-in-out;
  cursor: pointer;
}

.icon-box:hover {
  transform: scale(1.1); /* Slight hover effect */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Hover shadow */
}

.icon-box.selected {
  box-shadow: 0 23px 83px rgba(0, 0, 0, 0.14); /* Selected shadow from Figma */
  background-color: #2CE3A6; /* Replace with selected color */
  animation: pulse 1.5s infinite;
}
</style>