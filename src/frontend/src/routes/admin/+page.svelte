<script lang="ts">
    import { onMount } from "svelte";
    import ProjectDetail from "$lib/components/project/project-detail.svelte";
    import ProjectLogs from "$lib/components/project/project-logs.svelte";
    import { ProjectService } from "$lib/services/project-service";
    import type { Project } from "../../../../declarations/backend/backend.did";

    const projectService = new ProjectService();

    let activeTab: string = $state("details");
    let selectedProjectId = $state(0);

    let projects: Project[] = $state([]);

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
        {id: 'logs', label: 'Logs'}
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

{#if activeTab == 'details'}
    <ProjectDetail {selectedProjectId} />
{/if}

{#if activeTab == 'logs'}
    <ProjectLogs {selectedProjectId} />
{/if}

