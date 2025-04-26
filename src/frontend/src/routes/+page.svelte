<script lang="ts">
  import { onMount } from "svelte";
  import type { Component } from "svelte";
  import type { Project } from "$lib/types/projects";

  import { storeManager } from "$lib/manager/store-manager";
  import { projectStore } from "$lib/stores/project-store";
  import { ProjectService } from "$lib/services/project-service";
  
  import Header from "$lib/shared/Header.svelte";
  import ProjectDetail from "$lib/components/project/project-detail.svelte";

  import IconsRow from '$lib/components/home/icons-row.svelte';

  import WaterwayLabsIcon from "$lib/icons/svgs/waterway-labs-icon.svelte";
  
  import ICFCIcon from "$lib/icons/svgs/icfc-icon.svelte";
  import FootballGodIcon from "$lib/icons/svgs/football-god-icon.svelte";
  import OpenFPLIcon from "$lib/icons/svgs/openfpl-icon.svelte";
  import OpenWSLIcon from "$lib/icons/svgs/openwsl-icon.svelte";
  import JeffBetsIcon from "$lib/icons/svgs/jeff-bets-icon.svelte";
  import ICPFAIcon from "$lib/icons/svgs/icpfa-icon.svelte";

  
  import GolfPadIcon from "$lib/icons/svgs/golfpad-icon.svelte";
  import TransferKingsIcon from "$lib/icons/svgs/transfer-kings-icon.svelte"; 
  import OpenBookIcon from "$lib/icons/svgs/openbook-icon.svelte";
  import OpenBeatsIcon from "$lib/icons/svgs/openbeats-icon.svelte";
  import OpenChefIcon from "$lib/icons/svgs/openchef-icon.svelte";
  import OpenCareIcon from "$lib/icons/svgs/opencare-icon.svelte";

  import { getStatusString } from "$lib/utils/helpers";
  import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
  import WidgetSpinner from "$lib/components/shared/widget-spinner.svelte";
  
	interface Props {
    isMenuOpen: boolean;
  };
  
  let { isMenuOpen } : Props = $props();
  
  type ProjectData = ReturnType<typeof transformProjectData>;
  
  const projectService = new ProjectService();
  
  let projects: Project[] = [];
  let selectedProjectId = $state(0);
  let selectedProject: Project | null = null;  
  let selectedProjectData: ProjectData | null = null;
  let isLoading = true;
  let loadingProject = true;
  

  
  onMount(async () => {
    try{
      await storeManager.syncStores();
      await loadProjects();
    } catch(error){
      console.error("Error loading homepage projects");
    } finally {
      isLoading = false;
      loadingProject = false;
    }
  });

  $effect(() => {
    if(selectedProjectId > 0) {
      selectedProject = projects.find(x => x.id == selectedProjectId) ?? selectedProject;
      if(selectedProject){
        selectProject(selectedProject)
      }
    }
  });

  async function loadProjects() {
  try {
    const projectDTOs = await projectService.getProjects();
    if (!projectDTOs) { return }
    
    projects = projectDTOs?.projects
      .sort((a, b) => a.id - b.id)
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
    
    projectStore.setProjects(projectDTOs.projects.sort((a, b) => a.id - b.id));
    
    const initialProject = projects.find(p => p.id === 2) || projects[0];
    if (initialProject) {
      selectProject(initialProject);
    }
  } catch (error) {
    console.error('Failed to load projects:', error);
  }
}

  function selectProject(project: Project) {   
    
    loadingProject = true; 
    if (!project) return;
    selectedProject = project;
    selectedProjectData = transformProjectData(project);
    projects = projects.map(p => ({
      ...p,
      selected: p.id === project.id
    }));
    loadingProject = false;
  }

  function getComponentByName(name: string): Component {
    const componentMap: Record<string, Component> = {
      'Waterway Labs': WaterwayLabsIcon,
      'ICFC' : ICFCIcon,
      'FootballGod': FootballGodIcon,
      'OpenFPL': OpenFPLIcon,
      'OpenWSL': OpenWSLIcon,
      'Jeff Bets': JeffBetsIcon,
      'ICPFA': ICPFAIcon,
      'ICGC': GolfPadIcon,
      'Transfer Kings': TransferKingsIcon,
      'OpenBook': OpenBookIcon,
      'OpenBeats': OpenBeatsIcon,
      'OpenChef': OpenChefIcon,
      'OpenCare': OpenCareIcon
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
      websiteURL: project.websiteURL,
      twitter: project.twitter,
      githubLink: project.githubLink,
      mainColour: project.mainColour,
      backgroundColor: project.mainColour,
      backgroundImage: `/project-images/${project.id}-background.png`,
      screenshot: `/project-images/${project.id}-screenshot.jpg`
    };
  }
  
</script>
  {#if isLoading}
    <LocalSpinner />
  {:else}
    {#if loadingProject}
      <WidgetSpinner />
    {:else}
      {#if selectedProjectData}
        <div class="hidden w-full lg:flex">
          <div class="full-screen-flex-row">
            <div class="flex flex-col w-1/2 min-h-screen bg-BrandGray">
              <div class="mx-4 mt-2">
                <Header halfWidth={true} bind:isMenuOpen />
              </div>
              <div class="px-4 mt-8">
                <ProjectDetail 
                  {selectedProjectId}
                />
              </div>
            </div>

            <div class="relative flex items-center justify-center w-1/2" style={`background-color: ${selectedProjectData.backgroundColor}`}>
              <div
                class="absolute inset-0 z-0 bg-center bg-no-repeat"
                style={`background-image: url('${selectedProjectData.backgroundImage}'); background-size: cover;`}
              ></div>
          
              <div class="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
                <div class="w-[95%] rounded-2xl border-8 border-BrandGray shadow-lg transform translate-x-[20%]">
                  <img src={selectedProjectData.screenshot} alt="Main feature" class="object-contain max-w-full max-h-full rounded" />
                </div>
              </div>
              
            </div>
          </div>  

        </div>
        <div class="lg:hidden lg:mb-0">
          <main class="flex flex-col items-center">
            
            <div class="relative z-0" style={`background-color: ${selectedProjectData.backgroundColor}`}>
              
              <div class="mx-auto w-[50%] xs:w-[40%] lg:w-[60%] rounded-2xl border-4 border-BrandGray overflow-hidden translate-y-[10%] shadow-lg transform mt-2">
                <img src={selectedProjectData.screenshot} alt="Main feature" class="object-top rounded" />
              </div>
            </div>
      
            <div class="relative z-20 bg-BrandGray -mt-8 w-[101%] px-[1%] -mb-[1px]"> 
              <ProjectDetail 
                  title={selectedProjectData.title} 
                  status={selectedProjectData.status} 
                  summary={selectedProjectData.summary} 
                  description={selectedProjectData.description} 
                  backgroundColor={selectedProjectData.backgroundColor} 
                  websiteURL={selectedProjectData.websiteURL}
                  github={selectedProjectData.githubLink}
                  twitter={selectedProjectData.twitter ?? ""}
                />
            </div>
          </main>
        </div>
      {/if}
    {/if}
    <IconsRow {projects} {selectedProjectId} />
  {/if}