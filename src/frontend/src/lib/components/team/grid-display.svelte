<script lang="ts">
    import type { TeamMemberDTO } from "../../../../../declarations/backend/backend.did";
    export let teamMembers: TeamMemberDTO[] = [];
</script>

<div class="container mx-auto">
    <div class="team-grid">
        {#each teamMembers as member}
          <div class="card">
            <div class="image-container">
              <img 
                src={`team/${member.image}`} 
                alt={member.name} 
                class="image"
              />
            </div>
            <div class="space-y-4 content">
              <span class="title">
                {member.title}
              </span>
              <h3 class="name">{member.name}</h3>
              <p class="bio">{member.bio}</p>
            </div>
          </div>
        {/each}
    </div>
</div>

<style>
  .team-grid {
    @apply grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-10;
  }

  .card {
    @apply p-6 lg:mb-10 lg:p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105;
  }

  .image-container {
    @apply w-full mb-6 overflow-hidden aspect-square rounded-lg;
  }

  .image {
    @apply object-cover w-full h-full aspect-square;
  }

  .content {
    @apply space-y-4;
  }

  .title {
    @apply inline-block bg-white px-3 py-1 text-xs text-[#272727] rounded-full;
  }

  .name {
        @apply text-base font-med font-mona mb-2;
    }

    .bio {
        @apply text-sm font-light font-inter; 
    }

    @media (max-width: 1023px) {
        .name {
            @apply text-lg; 
        }

        .bio {
            @apply text-base; 
        }
    }
</style>