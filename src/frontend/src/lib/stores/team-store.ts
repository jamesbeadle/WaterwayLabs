import { writable } from "svelte/store";
import type { TeamMemberDTO } from "../../../../declarations/backend/backend.did";
import { TeamService } from "$lib/services/team-service";

function createTeamStore() {
  const { subscribe, set } = writable<TeamMemberDTO[]>([]);

  return {
    subscribe,
    setTeamMembers: (teamMembers: TeamMemberDTO[]) => set(teamMembers),
  };
}

export const teamStore = createTeamStore();
