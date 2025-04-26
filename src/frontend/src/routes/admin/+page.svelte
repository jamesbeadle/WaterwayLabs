<script lang="ts">
    import ProjectDetail from "$lib/components/project/project-detail.svelte";
    import { projectStore } from "$lib/stores/project-store";

    let activeTab: string = $state("details");
    let selectedProjectId = $state(0);

    function setActiveTab(tabName: string) {
        activeTab = tabName;
    };
    let tabs: {id: string, label: string}[] = [
        {id: 'details', label: 'Details'},
        {id: 'logs', label: 'Logs'}
    ];

    
</script>

<p>Select Project:</p>   
<select class="p-2 brand-dropdown my-4 min-w-[100px]"
    bind:value={selectedProjectId}
>
    <option value={0}>Select Project</option>
    {#each $projectStore as project}
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

