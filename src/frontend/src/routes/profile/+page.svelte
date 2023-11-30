<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import ProfileDetail from "$lib/components/profile/profile-detail.svelte";
  import Layout from "../Layout.svelte";
  let activeTab: string = "details";

  onMount(async () => {
    isLoading.set(false);
  });
  function setActiveTab(tab: string): void {
    activeTab = tab;
  }
</script>

<Layout>
  <div class="m-4">
    <div class="bg-panel rounded-lg m-4">
      <ul class="flex rounded-t-lg bg-light-gray px-4 pt-2">
        <li
          class={`mr-4 text-xs md:text-base ${
            activeTab === "details" ? "active-tab" : ""
          }`}
        >
          <button
            class={`p-2 ${
              activeTab === "details" ? "text-white" : "text-gray-400"
            }`}
            on:click={() => setActiveTab("details")}>Details</button
          >
        </li>
        <li
          class={`mr-4 text-xs md:text-base ${
            activeTab === "gameweeks" ? "active-tab" : ""
          }`}
        >
          <button
            class={`p-2 ${
              activeTab === "gameweeks" ? "text-white" : "text-gray-400"
            }`}
            on:click={() => setActiveTab("gameweeks")}>Gameweeks</button
          >
        </li>
      </ul>

      {#if activeTab === "details"}
        <ProfileDetail />
      {/if}
    </div>
  </div>
</Layout>
