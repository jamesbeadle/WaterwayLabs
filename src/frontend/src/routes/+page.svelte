<script lang="ts">
  import { onMount } from "svelte";
  import { projectStore } from "$lib/stores/project-store";
  import { ProjectService } from "$lib/services/project-service";
  import OpenFPLIcon from "$lib/icons/svgs/4.svelte";
  import FootballGodIcon from "$lib/icons/svgs/2.svelte";
  import GolfPadIcon from "$lib/icons/svgs/6.svelte";
  import TransferKingsIcon from "$lib/icons/svgs/5.svelte"; 
  import OpenBookIcon from "$lib/icons/svgs/7.svelte";
  import OpenBeatsIcon from "$lib/icons/svgs/8.svelte";
  import OpenChefIcon from "$lib/icons/svgs/9.svelte";
  import ICPFAIcon from "$lib/icons/svgs/10.svelte";
  import OpenCareIcon from "$lib/icons/svgs/11.svelte";
  import WaterwayIcon from "$lib/icons/svgs/1.svelte";
  import ProjectSection from "$lib/components/home/project/project-section.svelte";
  import Layout from './Layout.svelte';
  import IconsRow from '$lib/components/home/icons-row.svelte';
  import type { Project } from "$lib/types/projects";
  import type { ProjectDTO, ProjectStatus } from "../../../declarations/backend/backend.did";
  import type { ComponentType, SvelteComponent } from "svelte";

  type ProjectName = 
    | "OpenFPL" 
    | "Football God" 
    | "GolfPad" 
    | "Transfer Kings" 
    | "OpenBook" 
    | "OpenBeats" 
    | "OpenChef" 
    | "ICPFA" 
    | "OpenCare"
    | "Waterway Labs"
    | "OpenWSL";

  let projects: Project[] = [];
  let selectedProject: Project | null = null;
  const projectService = new ProjectService();

  const translateXMap: Record<number, string> = {
    2: '-135px',    
    3: '-214px',    
    4: '-214px',    
    5: '-119px',
    6: '-143px',
    7: '-196px',
    8: '-134px',
    9: '-36px',
    10: '-125px',
    11: '-62px',
  };

  function getStatusString(status: ProjectStatus): string {
    if ('Development' in status) return 'Development';
    if ('Design' in status) return 'Design';
    if ('Decentralised' in status) return 'Decentralised';
    if ('OnHold' in status) return 'On Hold';
    return 'Unknown';
  }

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
            backgroundImage: `/images/${dto.id}-background.png`,
            previewImage: `/images/${dto.id}-preview.png`,
            mobilePreviewImage: `/images/${dto.id}-mobile-preview.png`,
            translateX: translateXMap[dto.id] || '0px',
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

  function getComponentByName(name: string): ComponentType {
    const componentMap: Record<ProjectName, ComponentType> = {
      'OpenFPL': OpenFPLIcon,
      'Football God': FootballGodIcon,
      'GolfPad': GolfPadIcon,
      'Transfer Kings': TransferKingsIcon,
      'OpenBook': OpenBookIcon,
      'OpenBeats': OpenBeatsIcon,
      'OpenChef': OpenChefIcon,
      'ICPFA': ICPFAIcon,
      'OpenCare': OpenCareIcon,
      'Waterway Labs': WaterwayIcon,
      'OpenWSL': OpenFPLIcon,
    };

    return componentMap[name as ProjectName] || OpenFPLIcon;
  }

  function transformProjectData(project: Project) {
    return {
      title: project.name,
      description: project.description,
      summary: project.summary,
      buttonText: "Visit Site",
      buttonLink: project.websiteURL,
      status: project.status,
      isFootballGod: project.name === "Football God",
      twitter: project.twitter,
      githubLink: project.githubLink,
      mainColour: project.mainColour,
      backgroundColor: project.mainColour,
      backgroundImage: `/images/${project.id}-background.png`,
      previewImage: `/images/${project.id}-preview.png`,
      mobilePreviewImage: `/images/${project.id}-mobile-preview.png`,
      translateX: translateXMap[project.id] || '0px'
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

  function updateGlobalColor(color: string) {
    document.body.style.setProperty('--selectedProject-bg-color', color);
    document.documentElement.style.setProperty('--selectedProject-bg-color', color);
  }

  function setDefaultProject() {
    const defaultProject = projects.find(p => p.name === "OpenFPL") || projects[0];
    selectProject(defaultProject);
  }

  onMount(() => {
    loadProjects();
    
    const logo = document.querySelector('.logo');
    const waterwayLabs = document.querySelector('.waterway-labs');

    if (logo) {
      logo.addEventListener('click', setDefaultProject);
    }

    if (waterwayLabs) {
      waterwayLabs.addEventListener('click', setDefaultProject);
    }

    updateGlobalColor(selectedProject?.backgroundColor ?? '#2CE3A6');
  });

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
    {selectedProject}
    {isMenuOpen} 
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

