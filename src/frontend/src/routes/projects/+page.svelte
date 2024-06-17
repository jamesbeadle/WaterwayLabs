<script lang="ts">
    import { onMount } from "svelte";
    import { isLoading } from "$lib/stores/global-stores";
    import Layout from "../Layout.svelte";
  
    onMount(async () => {
      try {
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        isLoading.set(false);
      }
    });


    interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    status: 'Design' | 'Development' | 'Live' | 'Decentralized';
  }

  const projects: Project[] = [
    {
      title: "Project 1",
      description: "This is a short description of Project 1.",
      image: "https://via.placeholder.com/150",
      link: "#",
      status: "Design",
    },
    {
      title: "Project 2",
      description: "This is a short description of Project 2.",
      image: "https://via.placeholder.com/150",
      link: "#",
      status: "Development",
    },
    {
      title: "Project 3",
      description: "This is a short description of Project 3.",
      image: "https://via.placeholder.com/150",
      link: "#",
      status: "Live",
    },
    {
      title: "Project 4",
      description: "This is a short description of Project 4.",
      image: "https://via.placeholder.com/150",
      link: "#",
      status: "Decentralized",
    },
    // Add more projects as needed
  ];



  </script>
  
  <Layout>


    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each projects as project}
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-48 object-cover" src={project.image} alt={project.title} />
            <div class="p-4">
              <h3 class="text-lg font-semibold">{project.title}</h3>
              <p class="text-gray-600">{project.description}</p>
              <div class="flex justify-between items-center mt-4">
                <a href={project.link} class="text-blue-500 hover:underline">Visit Site</a>
                <span class={`px-3 py-2 text-xs rounded-md 
                  ${project.status === 'Design' ? 'badge-design' : ''} 
                  ${project.status === 'Development' ? 'badge-development' : ''} 
                  ${project.status === 'Live' ? 'badge-live' : ''} 
                  ${project.status === 'Decentralized' ? 'badge-decentralized' : ''}`}>
                  {project.status}
                </span>
              </div>
              <button class="mt-4 w-full bg-WaterwayBase text-white py-2 rounded hover:bg-WaterwayBaseB focus:outline-none">More Info</button>
            </div>
          </div>
        {/each}
      </div>
    </div>
    

    <div class="m-4 mx-8">
        <p class="text-lg my-4">Information on all projects under development by Waterway Labs can be found here:</p>
        <div class="flex flex-col space-y-2">
            <a href="https://openfpl.xyz/whitepaper">https://openfpl.xyz/whitepaper</a>
            <a href="https://icpfa.org/whitepaper">https://icpfa.org/whitepaper</a>
            <a href="https://companiesdao.com/whitepaper">https://companiesdao.com/whitepaper</a>
            <a href="https://footballgod.xyz/whitepaper">https://footballgod.xyz/whitepaper</a>
            <a href="https://openbook.services/whitepaper">https://openbook.services/whitepaper</a>
            <a href="https://opencare.services/whitepaper">https://opencare.services/whitepaper</a>
            <a href="https://golfpad.xyz/whitepaper">https://golfpad.xyz/whitepaper</a>
            <a href="https://doxxed.app/whitepaper">https://doxxed.app/whitepaper</a>
            <a href="https://icp.casino/whitepaper">https://icp.casino/whitepaper</a>
            <a href="https://betty.bingo/whitepaper">https://betty.bingo/whitepaper</a>
            <a href="https://opencore.live/whitepaper">https://opencore.live/whitepaper</a>
        </div>
        <p class="text-lg my-4">We will also be assisting with development of the following projects:</p>
        <div class="flex h-full flex-col space-y-2">
            <a href="https://chainofcommand.xyz/whitepaper">https://chainofcommand.xyz/whitepaper</a>
            <a href="https://opendna.xyz/whitepaper">https://opendna.xyz/whitepaper</a>
            <a href="https://opennfl.xyz/whitepaper">https://opennfl.xyz/whitepaper</a>
        </div>
    </div>
  </Layout>
  
<style>
  .badge-design {
    @apply bg-WaterwayLightGreen text-white;
  }
  .badge-development {
    @apply bg-WaterwayGreen text-white;
  }
  .badge-live {
    @apply bg-WaterwayGreen text-white;
  }
  .badge-decentralized {
    @apply bg-WaterwayDarkGreen text-white;
  }
</style>