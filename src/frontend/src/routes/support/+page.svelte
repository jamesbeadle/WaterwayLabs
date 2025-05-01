<script lang="ts">
    import { formatUnixDateTimeToReadable } from "$lib/utils/helpers";
    import { onMount } from "svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { supportStore } from "$lib/stores/support-store";
    import type { SupportQueries } from "../../../../declarations/backend/backend.did";

    let supportQueries: SupportQueries | undefined = $state(undefined);
    let isLoading = $state(true);

    onMount(async () => {
        try{
            let supportQueriesResult = await supportStore.getSupportQueries({
                app: [{ ICFC: null }],
                page: 1n,
                status: [],
                dateTo: [],
                dateFrom: []
            });
            if(!supportQueriesResult){ return }
            supportQueries = supportQueriesResult;
        } catch(error){
            console.error("Error fetching form submissions:", error);
        } finally {
            isLoading = false;
        }
    });
</script>

    <div class="mx-auto">
        {#if isLoading}
            <LocalSpinner />
        {:else}
            <div class="responsive-row-col">
                <div class="text-left w-full">
                    <span class="status">SUPPORT</span>
                    <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
                        COMING SOON
                    </h1>
                </div>
            </div>
            <div class="horizontal-divider"></div>

            <p>You will be able to raise Waterway Labs app support tickets here.</p>
            <!--

            {#if supportQueries}
                {#each supportQueries.supportQueries as supportQuery}
                    {@const statusString = Object.keys(supportQuery.status)[0]}
                    <div class="flex flex-col gap-4 mx-4">
                    <div class={`bg-white shadow-md rounded-lg p-4 border-l-4 
                        ${statusString == "Unread" ? 'border-blue-500' : ''} 
                        ${statusString == "Read" ? 'border-green-500' : ''} 
                        ${statusString == "Resolved" ? 'border-yellow-500' : ''} 
                        ${statusString == "Ignored" ? 'border-red-500' : ''} 
                        ${statusString == "Flagged" ? 'border-purple-500' : ''} 
                    `
                    }>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-gray-500">{ formatUnixDateTimeToReadable(supportQuery.submittedOn) }</span>
                        <span class={`text-xs font-semibold uppercase 
                            ${statusString == "Unread" ? 'border-blue-500' : ''} 
                            ${statusString == "Read" ? 'border-green-500' : ''} 
                            ${statusString == "Resolved" ? 'border-yellow-500' : ''} 
                            ${statusString == "Ignored" ? 'border-red-500' : ''} 
                            ${statusString == "Flagged" ? 'border-purple-500' : ''}
                            `}>{ statusString }</span>
                    </div>
                
                    <div class="mb-2">
                        <h3 class="text-lg font-semibold text-gray-800">{ supportQuery.name }</h3>
                        <p class="text-gray-700 text-sm">{ supportQuery.message }</p>
                    </div>
                
                    <div class="flex items-center mt-4">
                        <span class="text-sm font-medium text-gray-500">Contact:</span>
                        <span class="ml-2 text-gray-600 text-sm">{ supportQuery.contact }</span>
                    </div>
                    </div>
                    </div>
                {/each}
            {:else}
                <p>No Support Queries Found</p>
            {/if}
            -->

        {/if}
    </div>