<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        errorType: string;
    }

    let { errorType } : Props = $props();

    let isLoading = $state(true);
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
            default:
                backgroundColour = "[#FF403C]";
                textColour = "white";
                borderColor = "black";
            break;
        }
        isLoading = false;
    });

</script>
{#if !isLoading}
    <div class={`badge bg-${backgroundColour} text-${textColour} border border-${borderColor}`}>{errorType}</div>
{/if}