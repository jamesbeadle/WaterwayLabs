<script lang="ts">
    import { onMount } from "svelte";
    import ProjectDetail from "$lib/components/project/project-detail.svelte";
    import ProjectLogs from "$lib/components/project/project-logs.svelte";
    import { ProjectService } from "$lib/services/project-service";
    import type { Project } from "../../../../declarations/backend/backend.did";
    import ProjectSupportQueries from "$lib/components/project/project-support-queries.svelte";
    import CreateProjectModal from "$lib/components/project/create-project-modal.svelte";
    import UpdateProjectModal from "$lib/components/project/update-project-modal.svelte";

    const projectService = new ProjectService();

    let activeTab: string = $state("details");
    let selectedProjectId = $state(0);

    let projects: Project[] = $state([]);

    let showCreateProject = $state(false);
    let showUpdateProject = $state(false);

    onMount(async () => {
        const projectsResult = await projectService.getProjects();
        if(!projectsResult) {return }
        projects = projectsResult.projects;
    });

    function setActiveTab(tabName: string) {
        activeTab = tabName;
    };

    const tabs: {id: string, label: string}[] = [
        {id: 'details', label: 'Details'},
        {id: 'logs', label: 'Logs'},
        {id: 'support-queries', label: 'Support Queries'}
    ];
    
</script>

<select class="p-2 brand-dropdown my-4 min-w-[100px]"
    bind:value={selectedProjectId}
>
    <option value={0}>Select Project</option>
    {#each projects as project}
    <option value={project.id}>{project.name}</option>
    {/each}
</select>

<!-- Add Update Project -->
  
<button onclick={() => {showCreateProject = true}} class="brand-button">Create Project</button>
<ul class="tab-container">
    {#each tabs as tab}
        <li class={`mr-2`}>
        <button
            class={`px-4 py-2 rounded-xl text-white ${
            activeTab === tab.id ? "bg-BrandBlue" : "border-1 border-solid border-BrandLightBlue"
            }`}
            onclick={() => setActiveTab(tab.id)}>{tab.label}</button
        >
        </li>
    {/each}
</ul>

<p>
    To manage Waterway Labs team members, please click here:
</p>

<!-- Add Button redirect to add WWL Team members -->

{#if activeTab == 'details'}
    <ProjectDetail {selectedProjectId} />
{/if}

{#if activeTab == 'logs'}
    <ProjectLogs {selectedProjectId} />
{/if}

{#if activeTab == 'support-queries'}
    <ProjectSupportQueries {selectedProjectId} />
{/if}

{#if showCreateProject}
    <CreateProjectModal onClose={() => showCreateProject = false} visible={showCreateProject} title="Create Project" />
{/if}

{#if showUpdateProject}
    <UpdateProjectModal onClose={() => showUpdateProject = false} visible={showUpdateProject} title="Update Project" />
{/if}