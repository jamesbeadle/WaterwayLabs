<script lang="ts">
    import { onMount } from "svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { getCanisters } from "$lib/stores/system-store";
    import { formatCycles, formatUnixDateTimeToReadable } from "./helpers";
    import type { Canister, CanisterType } from "../../../types";

    let isLoading = true;
    let canisters: Canister[] = [];
    let currentPage = 1;
    let itemsPerPage = 25;
    let filterCategory = 0;

    onMount(async () => {
        await loadCanisters();
    });

    // Add a helper function to map filterCategory to CanisterType
    function mapFilterCategoryToCanisterType(filterCategory: number): CanisterType {
        switch (filterCategory) {
            case 0: return { SNS: null };
            case 1: return { Dapp: null };
            case 2: return { Manager: null };
            case 3: return { WeeklyLeaderboard: null };
            case 4: return { MonthlyLeaderboard: null };
            case 5: return { SeasonLeaderboard: null };
            case 6: return { Archive: null };
            default: return { SNS: null };
        }
    }

    async function loadCanisters() {
        isLoading = true;
        console.log("isLoading = true");
        try {
            const canisterType = mapFilterCategoryToCanisterType(filterCategory);
            console.log("Mapped filter category");
            const result = await getCanisters(currentPage, itemsPerPage, canisterType);
            console.log("called get canisters");
            if (result) {
                canisters = result.entries;
                console.log("canisters=result.entries");
            }
        } catch (error) {
            console.error("Error fetching canister data.", error);
        } finally {
            isLoading = false;
        }
    }
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div>
        <label for="filterCategory">Filter by Canister Type:</label>
        <select id="filterCategory" bind:value={filterCategory} on:change={loadCanisters}>
            <option value={0}>SNS</option>
            <option value={1}>Dapp</option>
            <option value={2}>Manager</option>
            <option value={3}>WeeklyLeaderboard</option>
            <option value={4}>MonthlyLeaderboard</option>
            <option value={5}>SeasonLeaderboard</option>
            <option value={6}>Archive</option>
        </select>
    </div>
    <div>
        {#each canisters as canister}
            <div class="canister-info">
                <p>Id: {canister.canisterId}</p>
                <p>Type: {Object.keys(canister.canister_type)[0]}</p>
                <p>Cycles: {formatCycles(canister.cycles)}</p>
                <p>Last Topup: {formatUnixDateTimeToReadable(BigInt(canister.lastTopup))}</p>
            </div>
        {/each}
    </div>
{/if}