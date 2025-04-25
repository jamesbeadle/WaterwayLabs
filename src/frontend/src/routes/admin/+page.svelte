<script lang="ts">
    import { projectStore } from "$lib/stores/project-store";

    
    let activeTab: string = "logs";

    function setActiveTab(tabName: string) {
        activeTab = tabName;
    };
    let tabs: {id: string, label: string}[] = [
        {id: 'details', label: 'Details'},
        {id: 'logs', label: 'Logs'}
    ];

    let isLoading = true;
    let selectedProjectId = 0;
    
</script>
  
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

<div class="flex flex-col">
    <p>Project canisters:</p>   
    <select class="p-2 brand-dropdown my-4 min-w-[100px]"
        bind:value={selectedProjectId}
    >
        <option value={0}>Select Project</option>
        {#each $projectStore as project}
        <option value={project.id}>{project.name}</option>
        {/each}
    </select>
    {#if loadingProject}
        <WidgetSpinner />
    {:else}
        {#if selectedProjectId > 0}
            {#each selectedProjectCanisterSummary as summary}
                <p class="mt-2">{selectedProject?.name} {summary.canisterName}</p>
                <p class="text-xs">{summary.canisterId}</p>
                <p class="text-xs">Cycles: {formatCycles(summary.cycles)}</p>
                <p class="text-xs">Compute Allocation: {summary.computeAllocation}</p>
                <button on:click={() => loadCanisterTopupModal(summary.canisterId)} class="btn mt-2">Add Cycles</button>
            {/each}
        {/if}
    {/if}
</div>

