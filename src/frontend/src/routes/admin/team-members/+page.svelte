<script lang="ts">
    import { onMount } from "svelte";
    import { storeManager } from "$lib/manager/store-manager";
    import { teamStore } from "$lib/stores/team-store";
    import GridDisplay from "$lib/components/team/grid-display.svelte";
    import CreateTeamMemberModal from "$lib/components/team/create-team-member-modal.svelte";
    import UpdateTeamMemberModal from "$lib/components/team/update-team-member-modal.svelte";
  
    let showCreateTeamMember = $state(false);
    let showUpdateTeamMember = $state(false);
  
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
    <span class="status">THE TEAM</span>

    <GridDisplay teamMembers={$teamStore} />
    
    {#if showCreateTeamMember}
        <CreateTeamMemberModal onClose={() => showCreateTeamMember = false} visible={showCreateTeamMember} title="Update Team Member" />
    {/if}
    
    {#if showUpdateTeamMember}
        <UpdateTeamMemberModal onClose={() => showUpdateTeamMember = false} visible={showUpdateTeamMember} title="Update Team Member" />
    {/if}
  