<script lang="ts">
    import { projectStore } from "$lib/stores/project-store";
    import { onMount } from "svelte";

    interface Props {
        errorType: string;
    }

    let { errorType } : Props = $props();

    let backgroundColour = $state("");
    let borderColor = $state("");
    let textColour = $state("");

    onMount(() => {
        switch(errorType){
            case 'DecodeError':
            case 'TooLong':
            case 'NotAllowed':
            case 'DuplicateData':
            case 'InvalidProperty':
            case 'NotFound':
            case 'IncorrectSetup':
            case 'AlreadyClaimed':
            case 'NotAuthorized':
            case 'MaxDataExceeded':
            case 'InvalidData':
            case 'SystemOnHold':
            case 'AlreadyExists':
            case 'NoPacketsRemaining':
            case 'UpdateFailed':
            case 'CanisterCreateError':
            case 'NeuronAlreadyUsed':
            case 'FailedInterCanisterCall':
            case 'InsufficientPacketsRemaining':
            case 'InsufficientFunds':
            case 'InEligible':
                backgroundColour = "BrandDeclineRed";
                textColour = "white";
                borderColor = "black";
            break;
        }
    });

</script>
<span class={`badge bg-${backgroundColour} text-${textColour} border border-${borderColor}`}>{errorType}</span>
