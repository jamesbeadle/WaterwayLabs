<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import type { Project } from "../../../../declarations/backend/backend.did";
    
    let projects: Project[] = [];
    
    onMount(() => {
        storeManager.syncStores();
        projects = projectStore.getProjects();
    });
 </script>

<Layout>
    <div class="flex w-full">
        {#each projects as project}
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
    </div>
</Layout>