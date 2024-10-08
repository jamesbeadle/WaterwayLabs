<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import Layout from "./Layout.svelte";

  import OpenBookIcon from "$lib/icons/svgs/openbook.svelte";
  import GolfPadIcon from "$lib/icons/svgs/golfpad.svelte";
  import TransferKingsIcon from "$lib/icons/svgs/transferkings.svelte";
  import OpenChefIcon from "$lib/icons/svgs/openchef.svelte";
  import OpenCareIcon from "$lib/icons/svgs/opencare.svelte";
  import FootballGodIcon from "$lib/icons/svgs/footballgod.svelte";
  import OpenFPLIcon from "$lib/icons/svgs/openfpl.svelte";
  import ICPFAIcon from "$lib/icons/svgs/icpfa.svelte";
  import OpenBeatsIcon from "$lib/icons/svgs/openbeats.svelte";
  import type { Project } from "../types";
  import ProjectInfoModal from "$lib/components/project/project-info-modal.svelte";

 
  type IconKeys = keyof typeof iconMap;

  let selectedProject: Project & { imageComponent: typeof iconMap[IconKeys] } | null = null;
  let showSelectedProject = false;
  const iconMap = {
    OpenBookIcon,
    GolfPadIcon,
    TransferKingsIcon,
    OpenChefIcon,
    OpenCareIcon,
    FootballGodIcon,
    OpenFPLIcon,
    ICPFAIcon,
    OpenBeatsIcon
  };

  onMount(async () => {
    try {
      // Fetch data or perform other mount-related tasks
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      isLoading.set(false);
    }
  });

  const projects: Array<Project & { imageComponent: typeof iconMap[IconKeys] }> = [
    {
      id: 4,
      title: "OpenFPL",
      description: "Decentralised fantasy football.",
      image: "openfpl.jpg",
      imageComponent: iconMap.OpenFPLIcon,
      link: "https://openfpl.xyz",
      linkDisplay: "openfpl.xyz",
      status: "Decentralised",
      summary: "OpenFPL is a decentralised fantasy football game for the Premier League hosted through the Internet Computer's Network Nervous System. OpenFPL token holders reach community consensus for player valuations, data validation and more to ensure the entire platform operates entirely on the blockchain with zero dependencies.",
      primaryColour: "#2ce3a6",
      secondaryColour: "#FFFFFF"
    },
    {
      id: 2,
      title: "Football God",
      description: "Live play to earn football games.",
      image: "footballgod.jpg",
      imageComponent: iconMap.FootballGodIcon,
      link: "https://footballgod.xyz",
      linkDisplay: "footballgod.xyz",
      status: "Development",
      summary: "FootballGod will be a fixed odds betting platform funded by the OpenFPL DAO. Data managed to run OpenFPL and Transfer Kings will be used to offer odds on worldwide football matches. Algorithms for FootballGod will be managed by the OpenFPL DAO, allowing FootballGod to be used as a useful tool for controlling the FPL token supply. FootballGod has been designed to take advantage of the highly profitable nature of betting platforms to benefit OpenFPL token holders. FootballGod will send all profits to the OpenFPL DAO FPL Treasury, with the DAO able to burn these profit at it's discression.",
      primaryColour: "#242529",
      secondaryColour: "#FFFFFF"
    },
    {
      id: 3,
      title: "Transfer Kings",
      description: "Become a football agent today.",
      image: "transferkings.jpg",
      imageComponent: iconMap.TransferKingsIcon,
      link: "https://transferkings.xyz",
      linkDisplay: "transferkings.xyz",
      status: "Development",
      summary: "Transfer Kings is our upcoming purchase to play football agency game. Groups of friends will be able to setup their own agency, competing against each other for custom reward pools. Transfer Kings is designed to span multiple seasons and international tournaments, allowing your contracted players to achieve their expected career goals. Designed for the football expert that can spot prospects around the world, Transfer Kings is the worldwide football game Web3 has been waiting for.",
      primaryColour: "#194B63",
      secondaryColour: "#FFFFFF"
    },
    {
      id: 1,
      title: "OpenBook",
      description: "Decentralised business management.",
      image: "openbook.jpg",
      imageComponent: iconMap.OpenBookIcon,
      link: "https://openbook.services",
      linkDisplay: "openbook.services",
      status: "Development",
      summary: "OpenBook is evolving into a comprehensive, 100% on-chain business management platform. OpenBook's initial offering of sales, accountancy, recruitment, timesheet and task management are just the first step on delivering the perfect single SaaS for businesses at the lowest possible price.",
      primaryColour: "#66E094",
      secondaryColour: "#000000"
    },
    {
      id: 7,
      title: "GolfPad",
      description: "Golf meets Web3.",
      image: "golfpad.jpg",
      imageComponent: iconMap.GolfPadIcon,
      link: "https://golfpad.xyz",
      linkDisplay: "golfpad.xyz",
      status: "Development",
      summary: "GolfPad gives golfers of all levels a new dimension to their game. GolfPad focuses on individual achievements throughout your round rather than a single round's total score. This allows you to compete against your friends within a new framework, training your golf game for new scenarios.",
      primaryColour: "#F4C802",
      secondaryColour: "#000000"
    },
    {
      id: 9,
      title: "OpenBeats",
      description: "Decentralised Audio Network.",
      image: "openbeats.jpg",
      imageComponent: iconMap.OpenBeatsIcon,
      link: "https://openbeats.xyz",
      linkDisplay: "openbeats.xyz",
      status: "Design",
      summary: "OpenBeats is a decentralised audio network enabling producers to create tracks using audio samples from the OpenBeats library. Creators of samples share the monthly subscription revenue based on how often their sample is used in the projects being composed.",
      primaryColour: "#000000",
      secondaryColour: "#FFFFFF"
    },
    {
      id: 8,
      title: "OpenChef",
      description: "Build your own cooking community.",
      image: "openchef.jpg",
      imageComponent: iconMap.OpenChefIcon,
      link: "https://openchef.xyz",
      linkDisplay: "openchef.xyz",
      status: "Design",
      summary: "OpenChef is designed to enable chefs to earn as they help people within their local community. Chefs will create projects that receive funding through sponsorship, charitable donations and a share of premium content subscriptions. This funding will be used to feed the community, giving a chef the opportunity to show off their passion for cooking through charitable content. The DAO will vote on rewards for chefs that help the most people, ensuring as much good as possible can be done.",
      primaryColour: "#731728",
      secondaryColour: "#FFFFFF"
    },
    {
      id: 5,
      title: "ICPFA",
      description: "Supporting community football.",
      image: "icpfa.jpg",
      imageComponent: iconMap.ICPFAIcon,
      link: "https://icpfa.org",
      linkDisplay: "icpfa.org",
      status: "Development",
      summary: "The ICPFA has been setup to support community grassroots football causes, funded by revenue from our football related applications.",
      primaryColour: "#FFFFFF",
      secondaryColour: "#FFFFFF"
    },
    {
      id: 6,
      title: "OpenCare",
      description: "The future of social care.",
      image: "opencare.jpg",
      imageComponent: iconMap.OpenCareIcon,
      link: "https://opencare.services",
      linkDisplay: "opencare.services",
      status: "Design",
      summary: "OpenCare has been designed with care professionals and families who have elderly relatives in carehomes. Caring for the elderly will be a huge challenge for society going forwards and OpenCare will provide a caring, efficient and secure solution to help all stakeholders involved.",
      primaryColour: "#F279B2",
      secondaryColour: "#FFFFFF"
    },
  ];

  function loadInfoModal(project: Project & { imageComponent: typeof iconMap[IconKeys] }) {
    selectedProject = project;
    showSelectedProject = true;
  };

  function closeInfoModal(){
    selectedProject = null;
    showSelectedProject = false;
  };

</script>


{#if showSelectedProject}
  <ProjectInfoModal closeModal={closeInfoModal} visible={showSelectedProject} {selectedProject} />
{/if}
<Layout>
  <div class="flex items-center justify-center min-h-screen flex-col">
      
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
      {#each projects as project}
        <div class="rounded-lg shadow-lg overflow-hidden border-2 border-WaterwayLightBlue bg-WaterwayLightBlue">
          <div class="w-full h-48 flex items-center justify-center" style="background-color: {project.primaryColour};">
            <svelte:component className="w-16" this={project.imageComponent} />
          </div>
          <div class="p-4 bg-WaterwayBrown">
            <h3 class="text-lg font-semibold">{project.title}</h3>
            <p class="text-white my-2 text-sm">{project.description}</p>
            <div class="horizontal-divider my-2 mb-4" />
            <div class="flex justify-between items-center mt-4">
              <a href={project.link} target="_blank" class="text-WaterwayBeige hover:underline text-sm mr-4">{project.linkDisplay}</a>
              <span class={`px-3 py-2 text-xs rounded-md text-center
                ${project.status === 'Design' ? 'badge-design' : ''} 
                ${project.status === 'Development' ? 'badge-development' : ''} 
                ${project.status === 'Live' ? 'badge-live' : ''} 
                ${project.status === 'Decentralised' ? 'badge-decentralised' : ''}`}>
                {project.status}
              </span>
            </div>
            <button on:click={() => loadInfoModal(project)} class="mt-4 w-full btn text-white py-2 rounded hover:bg-WaterwayBlue focus:outline-none text-sm">More Info</button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Layout>
``