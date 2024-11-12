<script lang="ts">
  import { onMount } from "svelte";
  import type { Component } from "svelte";
  import type { Project } from "$lib/types/projects";
  import type { ProjectStatus } from "../../../declarations/backend/backend.did";

  import { storeManager } from "$lib/manager/store-manager";
  import { projectStore } from "$lib/stores/project-store";
  import { ProjectService } from "$lib/services/project-service";
  
  import Layout from './Layout.svelte';
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
  import Header from "$lib/shared/Header.svelte";
  import ProjectDetail from "$lib/components/project/project-detail.svelte";
  
  export let isMenuOpen: boolean;
  let projects: Project[] = [];
  let selectedProject: Project | null = null;
  const projectService = new ProjectService();

  type ProjectData = ReturnType<typeof transformProjectData>;
  let selectedProjectData: ProjectData | null = null;

  onMount(async () => {
    await storeManager.syncStores();
    loadProjects();
    setDefaultProject();
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
      id: project.id,
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

  

</script>
<Layout bind:isMenuOpen>
  {#if selectedProjectData}
    <div class="hidden lg:flex w-full ">

      <div class="flex flex-col lg:flex-row w-full min-h-screen">

      
        <div class="w-full lg:w-1/2 flex flex-col bg-WaterwayGray p-6 lg:min-h-screen">
          <Header />
          <div class="mt-8">
            <ProjectDetail title={selectedProjectData.title} status={selectedProjectData.status} summary={selectedProjectData.summary} description={selectedProjectData.description} />
          </div>
        </div>

        <div class="w-1/2 relative flex justify-center items-center" style={`background-color: ${selectedProjectData.backgroundColor}`}>
          <div
            class="absolute inset-0 z-0 bg-center bg-no-repeat"
            style={`background-image: url('${selectedProjectData.backgroundImage}'); background-size: cover;`}
          ></div>
      
          <div class="relative z-10">
            <div class="mx-auto w-[90%] rounded-2xl border-4 border-WaterwayGray shadow-lg">
              <img src={selectedProjectData.screenshot} alt="Main feature" class="rounded" />
            </div>
          </div>
        </div>
      </div>  

    </div>
    <div class="lg:hidden">
      <main class="flex flex-col items-center">
        
        <div class="relative z-0" style={`background-color: ${selectedProjectData.backgroundColor}`}>
          
          <div class="mx-auto w-[50%] sm:w-[60%] rounded-2xl border-4 border-WaterwayGray overflow-hidden shadow-lg transform mt-2">
            <img src={selectedProjectData.screenshot} alt="Main feature" class="object-cover rounded" />
          </div>
        </div>
  
        <div class="relative z-20 bg-WaterwayGray -mt-8 w-[101%] px-[1%] -mb-[1px]"> 
          <ProjectDetail title={selectedProjectData.title} status={selectedProjectData.status} summary={selectedProjectData.summary} description={selectedProjectData.description} />
        </div>
      </main>
    </div>
  {/if}

  <IconsRow 
    {projects} 
    selectedProjectId={selectedProject?.id ?? 0} 
    on:select={event => selectProject(event.detail)} 
  />
</Layout>
