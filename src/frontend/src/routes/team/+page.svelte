<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import { teamStore } from "$lib/stores/team-store";
  import type { TeamMemberDTO } from "../../../../declarations/backend/backend.did";
  import { TeamService } from "$lib/services/team-service";
  import Layout from "../Layout.svelte";
  import TitleDisplay from "$lib/components/shared/title-display.svelte";
  import GridDisplay from "$lib/components/team/grid-display.svelte";

  let headingText = "A TEAM OF <br> WEB3 EXPERTS";
  let subtitleText = "THE TEAM";
  let descriptionText = "At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralization. Our team is dedicated to developing cutting-edge solutions that empower users, offering transparency, security, and freedom. With a shared belief in the transformative potential of blockchain technology, we are committed to pushing the boundaries of what's possible in decentralized applications, fostering an open and collaborative ecosystem.";

  let teamMembers: TeamMemberDTO[] = [];
  const teamService = new TeamService();

  async function loadTeamMembers() {
    try {
      const teamMembersDTOs = await teamService.getTeamMembers();
      teamMembers = teamMembersDTOs;
      teamStore.setTeamMembers(teamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  }
  onMount(async () => {
    loadTeamMembers();  
  });
</script>

<Layout overrideBackground={true}>
  <div class="mx-auto">
    <TitleDisplay title={headingText} subtitle={subtitleText} description={descriptionText} />
    <div class="horizontal-divider"></div>
    <GridDisplay teamMembers={teamMembers} />
  </div>
</Layout>
