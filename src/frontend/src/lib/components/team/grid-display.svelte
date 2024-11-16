<script lang="ts">
    import type { TeamMemberDTO } from "../../../../../declarations/backend/backend.did";
    export let teamMembers: TeamMemberDTO[] = [];
</script>

<div class="container mx-auto">
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {#each teamMembers as member}
          <div class="p-6 transition-transform duration-300 ease-in-out rounded-lg shadow-md lg:mb-10 lg:p-4 hover:shadow-lg hover:scale-105">
            <div class="w-full mb-6 overflow-hidden rounded-lg aspect-square">
              <img 
                src={`team/${member.image}`} 
                alt={member.name} 
                class="object-cover w-full h-full aspect-square"
              />
            </div>
            <div class="space-y-4">
              <span class="status">
                {member.title}
              </span>
              <h3 class="mb-2 text-lg lg:text-base">{member.name}</h3>
              <p class="text-base  exLight lg:text-sm">{member.bio}</p>
            </div>
          </div>
        {/each}
    </div>
</div>
