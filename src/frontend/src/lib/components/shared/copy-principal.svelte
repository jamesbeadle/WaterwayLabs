<script lang="ts">
  import { onMount } from "svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import CopyIcon from "$lib/icons/CopyIcon.svelte";

    interface Props {
        backgroundColour: string;
        borderColor: string;
        isProfile: string;
    }

    let { backgroundColour, borderColor, isProfile } : Props = $props();

    let principalId = $state('');

    onMount(async () => {

        principalId = $authStore.identity?.getPrincipal().toString() ?? "Not available";
    });

    async function copyTextAndShowToast(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            toasts.addToast({
                type: "success",
                message: "Copied to clipboard.",
                duration: 2000,
            });
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }

    $effect(() => {
    });
</script>

<div class="flex items-center w-full {isProfile ? 'max-w-[600px]' : 'max-w-full'} gap-2 px-4 py-2 border rounded-lg {backgroundColour} {borderColor}">
    <div class="flex-1 min-w-0">
        <p class="font-mono text-sm truncate text-BrandGrayShade5">
            {principalId}
        </p>
    </div>
    <button 
        onclick={() => { copyTextAndShowToast(principalId) }}
        class="flex-shrink-0 p-2 text-white transition-colors duration-200 rounded-lg hover:bg-BrandGrayShade2"
        title="Copy Principal ID"
    >
        <CopyIcon className="w-5 h-5" fill='#FFFFFF' />
    </button>
</div>

<style>
    @media (max-width: 640px) {
        p {
            font-size: 0.75rem;
        }
    }
</style>