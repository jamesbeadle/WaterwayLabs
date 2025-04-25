<script lang="ts">
    import { onMount } from "svelte";

    import Layout from "../Layout.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import type { Canister, Project } from "../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import { formatCycles } from "$lib/utils/helpers";
    import { storeManager } from "$lib/manager/store-manager";
    import CanisterTopupModal from "$lib/components/app/canister-topup-modal.svelte";
    import WidgetSpinner from "$lib/components/shared/widget-spinner.svelte";

    let loadingProject = false;

    let waterwayLabsCanisterSummary: Canister[] = [];
    let selectedProject: Project | undefined;
    let selectedProjectCanisterSummary: Canister[] = [];
    let selectedCanisterId = "";
    let showCanisterTopupModal = false;
    let trillionCycles = 0;

    onMount(async () => {
        try{
            //await storeManager.syncStores();
            loadingProject = true;
            //waterwayLabsCanisterSummary = await projectStore.getProjectCanisterInfo(1);
            loadingProject = false;
        } catch(error){
            console.error("Error :", error);
        } finally {
            isLoading = false;
        }
    });

    $: if(selectedProjectId == 0){
        selectedProjectCanisterSummary = [];
    }

    $: if(selectedProjectId > 0 && 
            (!selectedProject || (selectedProjectId != selectedProject.id))){
        selectedProject = $projectStore.find(x => x.id == selectedProjectId);
        loadCanisterInfo();
    }

    async function loadCanisterTopupModal(canisterId: string){
        if(canisterId == ""){
            return;
        }
        selectedCanisterId = canisterId;
        showCanisterTopupModal = true;
    }

    async function loadCanisterInfo(){
        loadingProject = true;
        selectedProjectCanisterSummary = await projectStore.getProjectCanisterInfo(selectedProjectId);
        loadingProject = false;
    }

    async function closeCanisterTopup(){
        showCanisterTopupModal = false;
    }

    async function topupCanister(){
        try{
            isLoading = true;
            await projectStore.topupCanister(selectedCanisterId, BigInt(trillionCycles * 1_000_000_000_000));
            waterwayLabsCanisterSummary = await projectStore.getProjectCanisterInfo(1);
            await loadCanisterInfo();    
            closeCanisterTopup();
        } catch (error) {
            console.error("Error topping up canister", error);
        } finally {
            isLoading = false;
        }
    }
</script>

<Layout>
    <div class="mx-auto">
        {#if isLoading}
            <LocalSpinner />
        {:else}
            <div class="responsive-row-col">
                <div class="text-left w-full">
                    <span class="status">APPS</span>
                    <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
                        APPLICATION SUMMARY INFORMATION
                    </h1>
                </div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="flex flex-col mx-4">
                <p class="semi-bold">Waterway Labs Backend Canister</p>
                <p class="text-xs">
                    {waterwayLabsCanisterSummary.find(x => x.canisterName == "Backend")?.canisterId}
                </p>
                <p class="mt-2 text-xs">Cycles: {formatCycles(waterwayLabsCanisterSummary.find(x => x.canisterName == "Backend")?.cycles ?? 0n)} </p>
                <p class="text-xs">Compute Allocation: {waterwayLabsCanisterSummary.find(x => x.canisterName == "Backend")?.computeAllocation}</p>
                <p class="mt-2">Topup with 100T cycles command:</p>
                <p class="text-xxs"> 
                    dfx canister --network ic deposit-cycles 100_000_000_000_000 {waterwayLabsCanisterSummary.find(x => x.canisterName == "Backend")?.canisterId}
                </p>
            </div>

            <div class="horizontal-divider"></div>
            <div class="flex flex-col mx-4">
                <p class="semi-bold">Waterway Labs Frontend Canister</p>
                <p class="text-xs">
                    {waterwayLabsCanisterSummary.find(x => x.canisterName == "Frontend")?.canisterId}
                </p>
                <p class="mt-2 text-xs">Cycles: {formatCycles(waterwayLabsCanisterSummary.find(x => x.canisterName == "Frontend")?.cycles ?? 0n)} </p>
                <p class="text-xs">Compute Allocation: {waterwayLabsCanisterSummary.find(x => x.canisterName == "Frontend")?.computeAllocation}</p>
                <button on:click={() => loadCanisterTopupModal(waterwayLabsCanisterSummary.find(x => x.canisterName == "Frontend")?.canisterId ?? "")} class="btn mt-2">Add Cycles</button>
            </div>
            
            <div class="horizontal-divider"></div>

            <div class="flex flex-col mx-4">
                
            </div>
            
            <div class="horizontal-divider"></div>
        {/if}
    </div>
    {#if showCanisterTopupModal}
        <CanisterTopupModal showModal={showCanisterTopupModal} onClose={closeCanisterTopup}>
            <div class="flex flex-col space-y-4">
                <p>Topup Canister {selectedCanisterId}</p>
                <div class="flex flex-col">
                    <label for="trillionCycles">Cycles (Trillions):</label>
                    <input
                      id="trillionCycles"
                      type="number"
                      class="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md fpl-dropdown"
                      bind:value={trillionCycles}
                    />
                </div>
                <div class="flex flex-row">
                    <button on:click={closeCanisterTopup} class="btn w-1/2 mx-1">Cancel</button>
                    <button on:click={topupCanister} class="btn w-1/2 mx-1">Topup</button>
                </div>
            </div>
        </CanisterTopupModal>
    {/if}
</Layout>

