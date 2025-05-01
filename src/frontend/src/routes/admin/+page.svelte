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
            if (!$projectStore) return;
            selectedProjectId = $projectStore[0].id;
        } catch {
            
        } finally {
            isLoading = false;
        }
    });

    function setActiveTab(tabName: string) {
        activeTab = tabName;
    }

    const tabs: { id: string; label: string }[] = [
        { id: "details", label: "Details" },
        { id: "logs", label: "Logs" },
        { id: "support-queries", label: "Support Queries" },
    ];
</script>

{#if !$projectStore || isLoading}
    <LocalSpinner />
{:else}
    <div class="flex w-full flex-col space-y-4 px-4 sm:px-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-4">
            <select
                class="p-2 brand-dropdown min-w-[200px] w-full sm:w-auto"
                bind:value={selectedProjectId}
            >
                <option value={0}>Select Project</option>
                {#each $projectStore as project}
                    <option value={project.id}>{project.name}</option>
                {/each}
            </select>
            <button
                onclick={() => (showCreateProject = true)}
                class="brand-button px-4 py-2 w-full sm:w-auto"
            >
                Create Project
            </button>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ul class="tab-container flex flex-wrap gap-2">
                {#each tabs as tab}
                    <li>
                        <button
                            class={`px-4 py-2 rounded-xl text-white ${
                                activeTab === tab.id
                                    ? "bg-BrandBlue"
                                    : "border-1 border-solid border-BrandLightBlue"
                            }`}
                            onclick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    </li>
                {/each}
            </ul>
            {#if selectedProjectId !== 0}
                <button
                    onclick={() => (showUpdateProject = true)}
                    class="brand-button px-4 py-2 w-full sm:w-auto"
                >
                    Update Project
                </button>
            {/if}
        </div>

        {#if activeTab === "details"}
            <ProjectDetail project={$projectStore.find((x) => x.id === selectedProjectId)!} />
        {/if}
        {#if activeTab === "logs"}
            <ProjectLogs {selectedProjectId} />
        {/if}
        {#if activeTab === "support-queries"}
            <ProjectSupportQueries {selectedProjectId} />
        {/if}
    </div>

    {#if showCreateProject}
        <CreateProjectModal onClose={() => (showCreateProject = false)} title="Create Project" />
    {/if}
    {#if showUpdateProject && selectedProjectId !== 0}
        <UpdateProjectModal
            project={$projectStore.find((x) => x.id === selectedProjectId)!}
            onClose={() => (showUpdateProject = false)}
            title="Update Project"
        />
    {/if}
{/if}