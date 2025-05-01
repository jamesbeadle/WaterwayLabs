<script lang="ts">
    import { projectStore } from "$lib/stores/project-store";
    import { onMount } from "svelte";

    interface Props {
        appName: string;
    }

    let { appName } : Props = $props();

    let backgroundColour = $state("");
    let borderColor = $state("");
    let textColour = $state("");
    let isLoading = $state(true);

    onMount(() => {

        let project = $projectStore.find(x => Object.keys(x.app)[0] == appName);
        if(!project) return;
        backgroundColour = project.mainColour;
        borderColor = project.thirdColour;
        textColour = project.secondaryColour;
        isLoading = false;
    });

</script>
{#if !isLoading}
    <div class={`badge bg-${backgroundColour} text-${textColour} border border-${borderColor}`}>{appName}</div>
{/if}