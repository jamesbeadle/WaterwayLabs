<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import type { ProjectDTO } from "../../../../declarations/backend/backend.did";
    import { storeManager } from "$lib/manager/store-manager";
    import { projectStore } from "$lib/stores/project-store";
    
    let isLoading = true;
    
    onMount(() => {
        storeManager.syncStores();
        isLoading = false;
    }); 
 </script>

<Layout>
    <div class="flex w-full">
        {#if !isLoading}
            {#each $projectStore as project}
                <div class="flex flex-row">
                    <div class="col-1/6">
                        <p>{project.id}</p>
                    </div>
                    <div class="col-4/6">
                        <p>
                            {project.name}
                        </p>
                    </div>
                    <div class="col-1/6">
                        <a href={`/project?id=${project.id}`}>
                            <button>Go</button>
                        </a>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</Layout>