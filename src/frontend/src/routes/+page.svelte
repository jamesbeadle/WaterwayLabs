<script lang="ts">
  import { onMount } from "svelte";
  import type { Project } from "$lib/types/projects";
  import type { ProjectId } from "../../../declarations/backend/backend.did";

  import { storeManager } from "$lib/manager/store-manager";
  import { projectStore } from "$lib/stores/project-store";
  import { ProjectService } from "$lib/services/project-service";
  import { getStatusString } from "$lib/utils/helpers";
  
  import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
  import HomepageHeader from "$lib/shared/HomepageHeader.svelte";
  import IconsRow from "$lib/components/home/icons-row.svelte";
  import ProjectDetail from "$lib/components/project/project-detail.svelte";
  import Sidebar from "$lib/components/shared/sidebar.svelte";
    import { authStore } from "$lib/stores/auth-store";

  
  let selectedProjectId = $state(2);
  let isMenuOpen = $state(false);
  
  type ProjectData = ReturnType<typeof transformProjectData>;
  
  const projectService = new ProjectService();
  
  let projects = $state<Project[]>([]);
  let selectedProject = $state<Project | null>(null);
  let selectedProjectData = $state<ProjectData | null>(null);
  let isLoading = $state(true);
  let loadingProject = $state(true);
  
  onMount(async () => {
    try {
      await storeManager.syncStores();
      await loadProjects();
    } catch (error) {
      console.error("Error loading homepage projects", error);
    } finally {
      isLoading = false;
      loadingProject = false;
    }
  });

  $effect(() => {
    if (selectedProjectId > 0) {
      const project = projects.find(x => x.id === selectedProjectId) ?? null;
      if (project !== selectedProject) {
        loadingProject = true;
        selectedProject = project;
        selectedProjectData = project ? transformProjectData(project) : null;
        loadingProject = false;
      }
    }
  });

  async function loadProjects() {
    try {

      console.log("loading projects")
      console.log($projectStore)
      
      projects = $projectStore
        .filter(dto => dto.id !== 1)
        .map(dto => {
          const socialLinks = dto.socialLinks || [];
          const twitterLink = socialLinks.find(([platform]) => platform === 'X');
          
          return {
            ...dto,
            websiteURL: dto.websiteURL.startsWith('http') ? dto.websiteURL : `https://${dto.websiteURL}`,
            buttonText: "Visit Site",
            backgroundImage: `/project-images/${dto.id}-background.png`,
            screenshot: `/project-images/${dto.id}-screenshot.jpg`,
            twitter: twitterLink && twitterLink[1] ? twitterLink[1] : undefined,
            github: dto.githubLink || undefined,
            backgroundColor: dto.mainColour,
            status: getStatusString(dto.status),
            socialLinks
          };
        });
      
      const initialProject = projects.find(p => p.id === 2) || projects[0];
      if (initialProject) {
        selectedProjectId = initialProject.id;
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
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

  function selectProject(projectId: ProjectId) {
    selectedProjectId = projectId;
  }

  function toggleMenu() {
      isMenuOpen = !isMenuOpen;
  }
</script>


{#if isLoading || loadingProject}
  <LocalSpinner />
{:else if selectedProjectData}

  <div class="full-screen-flex">
    <div class="hidden w-full lg:flex">
      <div class="full-screen-flex-row">
        <div class="flex flex-col w-1/2 min-h-screen bg-BrandGray">
          <div class="mx-4 mt-2">
            <HomepageHeader {toggleMenu}></HomepageHeader>
            <Sidebar {isMenuOpen} {toggleMenu} />
          </div>
          <div class="px-4 mt-8">
            <ProjectDetail project={$projectStore.find(x=> x.id == selectedProjectId)!} />
          </div>
        </div>

        <div class="relative flex items-center justify-center w-1/2" style={`background-color: ${selectedProjectData.backgroundColor}`}>
          <div
            class="absolute inset-0 z-0 bg-center bg-no-repeat"
            style={`background-image: url('${selectedProjectData.backgroundImage}'); background-size: cover;`}
          ></div>
          
          <div class="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
            <div class="w-[95%] rounded-2xl border-8 border-BranchGray shadow-lg transform translate-x-[20%]">
              <img src={selectedProjectData.screenshot} alt="Main feature" class="object-contain max-w-full max-h-full rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:hidden">
      <main class="flex flex-col items-center">
        <div class="w-full mx-4 mt-2">
          <HomepageHeader {toggleMenu}></HomepageHeader>
          <Sidebar {isMenuOpen} {toggleMenu} />
        </div>
        <div class="relative z-0" style = {`background-color: ${selectedProjectData.backgroundColor}`}>
          <div class="mx-auto w-[50%] xs:w-[40%] lg:w-[60%] rounded-2xl border-4 border-BrandGray overflow-hidden translate-y-[10%] shadow-lg transform mt-2">
            <img src={selectedProjectData.screenshot} alt="Main feature" class="object-top rounded" />
          </div>
        </div>

        <div class="relative z-20 bg-BrandGray mt-8 w-[101%] px-[1%] -mb-[1px]">
          <ProjectDetail project={$projectStore.find(x=> x.id == selectedProjectId)!} />
        </div>
      </main>
    </div>
  </div>
  
{/if}

<IconsRow {projects} {selectedProjectId} {selectProject} />