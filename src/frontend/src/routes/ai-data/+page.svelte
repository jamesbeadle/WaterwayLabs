<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { aiStore } from "$lib/stores/ai-store";

    let isLoading = true;

    onMount(async () => {
        try {
            await authStore.sync();
            isLoading = false;
        } catch (error) {
            console.error("Error fetching account information:", error);
            isLoading = false;
        }
    });

    async function handleDownload(fetchFn: () => Promise<any[]>) {
        try {
            const dataArray = await fetchFn();

            const csvText = arrayToCSV(dataArray);
            const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading CSV:", err);
        }
    }

    function arrayToCSV(data: any[]): string {
        if (!data || data.length === 0) {
            return "";
        }

        const headers = Object.keys(data[0]);

        const rows = data.map(obj => 
            headers.map(header => {
                const value = obj[header];
                if (value && typeof value === "object") {
                    return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                }
                return (value ?? "").toString().replace(/"/g, '""');
            }).join(",")
        );

        return [headers.join(","), ...rows].join("\n");
    }

    async function fetchSnapshots(): Promise<any[]> {
        let result = await aiStore.getOpenFPLFantasyTeamSnapshots();
        console.log(result);
        return result;
    }

    async function fetchLivePlayersData(): Promise<any[]> {
        let result = await  aiStore.getLivePlayers();
        console.log(result);
        return result;
    }

    async function getSeasonFixtures(): Promise<any[]> {
        let result = await  aiStore.getSeasonFixtures();
        console.log(result);
        return result;
    }

</script>

<Layout>
    <div class="mx-auto">
        {#if isLoading}
            <LocalSpinner />
        {:else}
            <div class="responsive-row-col">
                <div class="text-left">
                    <span class="status">AI Data Download</span>
                    <br />
                    <button on:click={() => handleDownload(fetchSnapshots)}>
                        Download Historical Manager Snapshot Data
                    </button>
                    <br />
                    <button on:click={() => handleDownload(fetchLivePlayersData)}>
                        Download Live Football Players 
                    </button>
                    <br />
                    <button on:click={() => handleDownload(getSeasonFixtures)}>
                        Download Historical Football Fixtures
                    </button>
                </div>
            </div>
        {/if}
    </div>
</Layout>