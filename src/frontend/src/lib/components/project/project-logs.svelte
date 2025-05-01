<script lang="ts">
  import { onMount } from "svelte";
  import type { ApplicationLogs, Project, ProjectId } from "../../../../../declarations/backend/backend.did";
  import { projectStore } from "$lib/stores/project-store";
  import LocalSpinner from "../shared/local-spinner.svelte";
  import AppBadge from "../shared/app-badge.svelte";
  import ErrorTypeBadge from "../shared/error-type-badge.svelte";
    import { convertDateToReadable } from "$lib/utils/helpers";

  interface Props {
    selectedProjectId: ProjectId;
  }

  let { selectedProjectId }: Props = $props();
  let project: Project | undefined = $state(undefined);
  let logs: ApplicationLogs | undefined = $state(undefined);

  onMount(async () => {
    project = $projectStore.find((x) => x.id == selectedProjectId)!;
    await getLogs();
  });

  async function getLogs() {

    let project = $projectStore.find(x => x.id == selectedProjectId);
    if(!project) return;

    logs = await projectStore.getApplicationLogs({
      app: project.app,
      page: 1n,
    });
  }
</script>

{#if project}
  <div class="mx-4 mt-6 sm:mt-8 lg:mt-12 max-w-7xl xl:mx-auto">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase tracking-wide mb-6 sm:mb-8">
      {project.name}
    </h1>

    {#if logs}
      <div class="space-y-4 sm:space-y-6">
        {#each logs.logs as log}
          <div
            class="flex flex-col sm:flex-row sm:items-start sm:justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div class="sm:w-2/3 mb-4 sm:mb-0">
              <p class="text-sm text-gray-500 dark:text-gray-400">{log.id}</p>
              <p class="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{log.title}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{log.detail}</p>
            </div>

            <div class="sm:w-1/3 flex flex-col space-y-2 sm:items-end">
              <AppBadge appName={Object.keys(log.app)[0]} />
              <p class="text-sm text-gray-500 dark:text-gray-400">{Object.keys(log.logType)[0]}</p>
              {#if log.error}
                <ErrorTypeBadge errorType={Object.keys(log.error)[0]} />
              {/if}
              <p class="text-sm text-gray-500 dark:text-gray-400">{convertDateToReadable(Number(log.createdOn))}</p>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <LocalSpinner />
    {/if}
  </div>
{:else}
  <LocalSpinner />
{/if}

<style>
  .log-title {
    @apply font-medium text-lg;
  }
  .log-type,
  .log-date {
    @apply text-sm text-gray-500;
  }
</style>