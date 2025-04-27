<script lang="ts">
  import { onMount } from "svelte";
  import { storeManager } from "$lib/manager/store-manager";
  import { teamStore } from "$lib/stores/team-store";
  import GridDisplay from "$lib/components/team/grid-display.svelte";


  onMount(async () => {
    loadTeamMembers();  
  });

  async function loadTeamMembers() {
    try {
      await storeManager.syncStores();
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  }
</script>

  <div class="mx-auto">
    <div class="responsive-row-col">
      <div class="text-left lg:w-1/2">
        <span class="status">THE TEAM</span>
        <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
          A TEAM OF WEB3 EXPERTS
        </h1>
      </div>
      <div class="lg:w-1/2 lg:pl-12">
        <p class="main-paragraph">
          At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralisation. 
          Our team are passionate about building more equitable services for people through the use of new and exciting blockchain technologies. 
          We are committed to pushing the boundaries of what's possible with decentralised applications, 
          aiming to build an open and collaborative ecosystem.          
        </p>
      </div>
    </div>
  
    <div class="horizontal-divider"></div>
    
    <GridDisplay teamMembers={$teamStore} />
  </div>
