<script lang="ts">
    import { authStore } from "$lib/stores/auth-store";
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    let principalId = "";
    let isLoading = true;

    onMount(async () => {
        try {
            await authStore.sync();
            principalId = $authStore.identity?.getPrincipal().toText() ?? "";
            isLoading = false;
        } catch (error) {
            console.error("Error fetching account information:", error);
            isLoading = false;
        }
    });
</script>

<Layout>
    <div class="mx-auto">
        {#if isLoading}
            <LocalSpinner />
        {:else}
            <div class="responsive-row-col">
                <div class="text-left">
                    <span class="status">ACCOUNT</span>
                    <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
                        YOUR PRINCIPAL ID: {principalId}
                    </h1>
                </div>
            </div>
        {/if}
    </div>
</Layout>

