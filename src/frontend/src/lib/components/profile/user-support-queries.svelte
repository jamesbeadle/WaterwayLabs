<script lang="ts">
    import { onMount } from "svelte";
    import type { Project, SupportQueries } from "../../../../../declarations/backend/backend.did";
    import LocalSpinner from "../shared/global/local-spinner.svelte";
    import { supportStore } from "$lib/stores/support-store";

    let isLoading = $state(true);
    let project: Project | undefined = $state(undefined);
    let supportQueries: SupportQueries | undefined = $state(undefined);

    onMount(async () => {
      await getSupportQueries();
    });

    async function getSupportQueries(){
      supportQueries = await supportStore.getUserSupportQueries({
        page: 1n,
        status: [],
        dateTo: [],
        dateFrom: []
      });
    }
</script>

<div class="mx-auto">
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <div class="responsive-row-col">
            <div class="text-left w-full">
                <span class="status">SUPPORT TICKETS</span>
                <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
                    COMING SOON
                </h1>
            </div>
        </div>
        <div class="horizontal-divider"></div>

        <p>You will be able to view your Waterway Labs app support tickets here.</p>
        <!--
        {#if project}
          <div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

            {#if supportQueries}
              {#each supportQueries.supportQueries as supportQuery}
                <div class="flex items-center justify-between w-full">
                  <p>{supportQuery.id}</p>
                  <p>{supportQuery.status}</p>
                  <p>{supportQuery.contact}</p>
                  <p>{supportQuery.assignedTo}</p>
                  <p>{supportQuery.name}</p>
                  <p>{supportQuery.submittedOn}</p>
                  <p>{supportQuery.submittedBy}</p>
                  <p>{supportQuery.message}</p>
                </div>
              {/each}
            {/if}
          </div>
        {:else}
          <LocalSpinner />
        {/if}
        -->
    {/if}
</div>


