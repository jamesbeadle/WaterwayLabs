<script lang="ts">
  import { onMount } from "svelte";
  import type { Component } from "svelte";
  import type { Project } from "$lib/types/projects";
  import type { ProjectStatus } from "../../../declarations/backend/backend.did";

  import { storeManager } from "$lib/manager/store-manager";
  import { projectStore } from "$lib/stores/project-store";
  import { ProjectService } from "$lib/services/project-service";
  
  import Layout from './Layout.svelte';
  import ProjectSection from "$lib/components/home/project/project-section.svelte";
  import IconsRow from '$lib/components/home/icons-row.svelte';
  import WaterwayLabsIcon from "$lib/icons/svgs/waterway-labs-icon.svelte";
  import FootballGodIcon from "$lib/icons/svgs/football-god-icon.svelte";
  import OpenFPLIcon from "$lib/icons/svgs/openfpl-icon.svelte";
  import GolfPadIcon from "$lib/icons/svgs/golfpad-icon.svelte";
  import TransferKingsIcon from "$lib/icons/svgs/transfer-kings-icon.svelte"; 
  import OpenBookIcon from "$lib/icons/svgs/openbook-icon.svelte";
  import OpenBeatsIcon from "$lib/icons/svgs/openbeats-icon.svelte";
  import OpenChefIcon from "$lib/icons/svgs/openchef-icon.svelte";
  import ICPFAIcon from "$lib/icons/svgs/icpfa-icon.svelte";
  import OpenCareIcon from "$lib/icons/svgs/opencare-icon.svelte";
  
  let projects: Project[] = [];
  let selectedProject: Project | null = null;
  const projectService = new ProjectService();

  onMount(async () => {
    await storeManager.syncStores();
    loadProjects();
    updateGlobalColor(selectedProject?.backgroundColor ?? '#2CE3A6');
  });

  async function loadProjects() {
    try {
      const projectDTOs = await projectService.getProjects();
      projects = projectDTOs
        .filter(dto => dto.id !== 1)
        .map(dto => {
          const socialLinks = dto.socialLinks || [];
          
          const twitterLink = socialLinks.find(([platform]) => platform === 'X');
          
          const project = {
            ...dto,
            websiteURL: dto.websiteURL.startsWith('http') ? dto.websiteURL : `https://${dto.websiteURL}`,
            component: getComponentByName(dto.name),
            buttonText: "Visit Site",
            backgroundImage: `/project-images/${dto.id}-background.png`,
            screenshot: `/project-images/${dto.id}-screenshot.jpg`,
            twitter: twitterLink && twitterLink[1] ? twitterLink[1] : undefined,
            github: dto.githubLink || undefined,
            backgroundColor: dto.mainColour,
            status: getStatusString(dto.status),
            selected: false,
            socialLinks: socialLinks
          };
          return project;
        });
      projectStore.setProjects(projectDTOs);
      
      const initialProject = projects.find(p => p.id === 1) || projects[0];
      if (initialProject) {
        selectProject(initialProject);
      }
      
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

  function updateGlobalColor(color: string) {
    document.body.style.setProperty('--selectedProject-bg-color', color);
    document.documentElement.style.setProperty('--selectedProject-bg-color', color);
  }

  function getStatusString(status: ProjectStatus): string {
    if ('Development' in status) return 'DEVELOPMENT';
    if ('Design' in status) return 'DESIGN';
    if ('Decentralised' in status) return 'DECENTRALISED';
    if ('OnHold' in status) return 'ON HOLD';
    return 'UNKNOWN';
  }

  function getComponentByName(name: string): Component {
    const componentMap: Record<string, Component> = {
      'OpenFPL': OpenFPLIcon,
      'Football God': FootballGodIcon,
      'GolfPad': GolfPadIcon,
      'Transfer Kings': TransferKingsIcon,
      'OpenBook': OpenBookIcon,
      'OpenBeats': OpenBeatsIcon,
      'OpenChef': OpenChefIcon,
      'ICPFA': ICPFAIcon,
      'OpenCare': OpenCareIcon,
      'Waterway Labs': WaterwayLabsIcon,
      'OpenWSL': OpenFPLIcon,
    };

    return componentMap[name as string] || WaterwayLabsIcon;
  }

  function transformProjectData(project: Project) {
    return {
      title: project.name,
      description: project.description,
      summary: project.summary,
      buttonText: "Visit Site",
      buttonLink: project.websiteURL,
      status: project.status,
      twitter: project.twitter,
      githubLink: project.githubLink,
      mainColour: project.mainColour,
      backgroundColor: project.mainColour,
      backgroundImage: `/project-images/${project.id}-background.png`,
      screenshot: `/project-images/${project.id}-screenshot.jpg`
    };
  }

  type ProjectData = ReturnType<typeof transformProjectData>;
  let selectedProjectData: ProjectData | null = null;

  function selectProject(project: Project) {
    if (!project) return;
    selectedProject = project;
    selectedProjectData = transformProjectData(project);
    projects = projects.map(p => ({
      ...p,
      selected: p.id === project.id
    }));
    updateGlobalColor(project.mainColour);
  }

  function setDefaultProject() {
    const defaultProject = projects.find(p => p.name === "OpenFPL") || projects[0];
    selectProject(defaultProject);
  }

  

  export let isMenuOpen: boolean;
</script>

<Layout bind:isMenuOpen>
  <main class="flex flex-col">
    {#if selectedProjectData}
      <div class="hidden min-h-screen px-10 pt-20 lg:flex lg:flex-row lg:items-start lg:overflow-x-hidden">
        <div class="transition-opacity duration-500 z-100">
            <ProjectSection {...selectedProjectData} />
        </div>
      </div>

      <div class="block lg:hidden">
        <div class="transition-opacity duration-500 z-100">
            <ProjectSection {...selectedProjectData} />
        </div>
      </div>
    {/if}
  </main>

  <IconsRow 
    {projects} 
    selectedProjectId={selectedProject?.id ?? 0} 
    on:select={event => selectProject(event.detail)} 
  />
</Layout>

<style>
  @media (min-width: 1024px) { 
    :global(body) {
      @apply bg-gradient-to-r from-[#272727] from-50% to-[var(--selectedProject-bg-color,#2ce3a6)] to-50%;
    }
  }

  @media (max-width: 1023px) { 
    :global(body) {
      @apply bg-[#272727];
    }
  }
</style>

