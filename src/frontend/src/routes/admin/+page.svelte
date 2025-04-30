<script lang="ts">
    import { onMount } from "svelte";
    import ProjectDetail from "$lib/components/project/project-detail.svelte";
    import ProjectLogs from "$lib/components/project/project-logs.svelte";
    import ProjectSupportQueries from "$lib/components/project/project-support-queries.svelte";
    import CreateProjectModal from "$lib/components/project/create-project-modal.svelte";
    import UpdateProjectModal from "$lib/components/project/update-project-modal.svelte";
    import { storeManager } from "$lib/manager/store-manager";
    import { projectStore } from "$lib/stores/project-store";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    let isLoading = $state(true);
    let activeTab: string = $state("details");
    let selectedProjectId = $state(0);

    let showCreateProject = $state(false);
    let showUpdateProject = $state(false);

    onMount(async () => {
        try {
            await storeManager.syncStores();
            if(!$projectStore){ return }
            selectedProjectId = $projectStore[0].id;
        } catch {

        } finally {
            isLoading = false;
        }
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

{#if !$projectStore || isLoading}
    <LocalSpinner />
{:else}
    <div class="flex w-full flex-col space-y-4">

        <a href="/admin/team-members">
            <button class="brand-button">Manage Waterway Labs Team Members</button>
        </a>

        <div class="flex flex-col space-y-2 w-full">

            <select class="p-2 brand-dropdown my-4 min-w-[100px]"
                bind:value={selectedProjectId}
            >
                <option value={0}>Select Project</option>
                {#each $projectStore as project}
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

            {#if activeTab == 'details'}
                <ProjectDetail project={$projectStore.find(x=> x.id == selectedProjectId)!} />
            {/if}
        
            {#if activeTab == 'logs'}
                <ProjectLogs {selectedProjectId} />
            {/if}
        
            {#if activeTab == 'support-queries'}
                <ProjectSupportQueries {selectedProjectId} />
            {/if}


        </div>


    </div>

    {#if showCreateProject}
        <CreateProjectModal onClose={() => showCreateProject = false} visible={showCreateProject} title="Create Project" />
    {/if}

    {#if showUpdateProject}
        <UpdateProjectModal onClose={() => showUpdateProject = false} visible={showUpdateProject} title="Update Project" />
    {/if}
{/if}