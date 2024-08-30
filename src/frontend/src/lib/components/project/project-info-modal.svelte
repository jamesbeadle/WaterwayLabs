<script lang="ts">
    import { Modal } from "@dfinity/gix-components";
    import type { Project } from "../../../types";

import OpenBookIcon from "$lib/icons/svgs/openbook.svelte";
import GolfPadIcon from "$lib/icons/svgs/golfpad.svelte";
import TransferKingsIcon from "$lib/icons/svgs/transferkings.svelte";
import OpenChefIcon from "$lib/icons/svgs/openchef.svelte";
import OpenCareIcon from "$lib/icons/svgs/opencare.svelte";
import FootballGodIcon from "$lib/icons/svgs/footballgod.svelte";
import OpenFPLIcon from "$lib/icons/svgs/openfpl.svelte";
import ICPFAIcon from "$lib/icons/svgs/icpfa.svelte";

    export let closeModal: () => void;
    export let visible: boolean;
    export let selectedProject: Project & { imageComponent: typeof iconMap[IconKeys] } | null;
        const iconMap = {
    OpenBookIcon,
    GolfPadIcon,
    TransferKingsIcon,
    OpenChefIcon,
    OpenCareIcon,
    FootballGodIcon,
    OpenFPLIcon,
    ICPFAIcon
  };

  type IconKeys = keyof typeof iconMap;
</script>

{#if visible && selectedProject}
    <Modal {visible} on:nnsClose={closeModal}>
        <div class="p-6 text-xs" >
            <div class="flex justify-between items-center mb-2 text-2xl">
                <h3 class="default-header">{selectedProject?.title}</h3>
                <button class="times-button" on:click={closeModal}>&times;</button>
            </div>
            <div class="flex">
                <p class="text-base">{selectedProject?.description}</p>
            </div>
            
            <div class="horizontal-divider my-2 mb-4" />
            <div class="flex flex-row mt-4 space-x-4">
                <div class="w-1/2 flex items-center justify-center" style="background-color: {selectedProject.primaryColour};">
                    <svelte:component className="w-16" this={selectedProject.imageComponent} />
                </div>
                <div class="w-1/2 flex flex-col">
                    <p class="mt-2 mb-1">The Mission:</p>
                    <p>{selectedProject?.summary}</p>
                    <p class="mt-4 mb-1">Website:</p>
                    <a target="_blank" href={selectedProject.link}>{selectedProject?.link}</a>
                    <span class={`px-3 py-2 text-xs rounded-md text-center mt-4 
                        ${selectedProject?.status === 'Design' ? 'badge-design' : ''} 
                        ${selectedProject?.status === 'Development' ? 'badge-development' : ''} 
                        ${selectedProject?.status === 'Live' ? 'badge-live' : ''} 
                        ${selectedProject?.status === 'Decentralised' ? 'badge-decentralised' : ''}`}>
                        {selectedProject?.status}
                      </span>
                </div>
            </div>
        </div>      
    </Modal>
{/if}