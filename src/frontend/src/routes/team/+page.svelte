<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import Layout from "../Layout.svelte";

  const teamMembers = [
    { name: "Zoe Duffy", title: "Managing Director", image: "zoe.jpg", bio: "Zoe runs many tech companies through her management consultancy, providing expert advice to ensure compliance with various legal frameworks." },
    { name: "Kelly Howlett", title: "Head of Operations", image: "kelly.jpeg", bio: "Kelly ensures the day-to-day operation of Waterway Labs on all things water. Kelly has the experience required to ensure anything can be done in a safe and secure manner." },
    { name: "James Beadle", title: "Development Manager", image: "james.jpg", bio: "James ensures the delivery of all Waterway Labs Projects." },
    { name: "Dfinity Designer", title: "Head of Design", image: "dfd.jpg", bio: "DfinityDesigner is a talented UI/UX designer that has put his stamp on various blockchain projects. He is known for high-quality, brilliant branding." },
    { name: "Thilly Thana", title: "Lead Developer", image: "thilly.jpg", bio: "Thilly is a computer science graduate with a passion for frontend development. Thilly brings DfinityDesigner’s designs to life using his expert Svelte skills." },
    { name: "George Robinson", title: "Community Manager", image: "george.jpg", bio: "George builds relationships with community members through any channel with users receptive to the Internet Computer’s message." },
    { name: "Josh Wray", title: "Head of Promotion", image: "josh.jpg", bio: "Josh ensures our team has the relationships in place to foster a co-operative, results-driven ecosystem." },
    { name: "Ashutosh Yadav", title: "Media Production Manager", image: "ashutosh.jpg", bio: "Ashutosh delivers high-quality rendered content at lightning speed. When we need to take our message to the next level, he is always required." },
  ];

  onMount(async () => {
    try {
      isLoading.set(true);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      isLoading.set(false);
    }
  });
</script>

<Layout overrideBackground={true}>

<!-- Team Section -->
<section class="bg-[#272727] text-white py-16 px-4 lg:px-8">
  <div class="max-w-screen-xl mx-auto">
    <!-- Header Section -->
    <div class="container flex flex-col lg:flex-row lg:px-10 lg:justify-between">
      <!-- Left side: Heading -->
      <div class="pt-12 text-left lg:w-1/2 lg:pt-10">
        <span class="px-3 py-1 text-xs text-[#272727] bg-white rounded-full">THE TEAM</span>
        <h1 class="mt-2 text-6xl leading-tight lg:text-6xl font-med font-mona">
          A TEAM OF <br> WEB3 EXPERTS
        </h1>
      </div>
      <!-- Right side: Mission Text -->
      <div class="mt-6 lg:w-3/5 lg:mt-4 lg:pl-12" style="margin-top: 75px;">
        <p class="font-light font-body font-inter lg:transform lg:translate-x-[10%]">
          At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralization. Our team is dedicated to developing cutting-edge solutions that empower users, offering transparency, security, and freedom. With a shared belief in the transformative potential of blockchain technology, we are committed to pushing the boundaries of what's possible in decentralized applications, fostering an open and collaborative ecosystem.
        </p>
      </div>
    </div>

    <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto lg:w-[1360px]"/>

    <!-- Team Grid -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
      {#each teamMembers as member}
        <div class="p-4 lg:p-6">
          <div class="w-full mb-6 overflow-hidden aspect-square">
            <img 
              src={`team/${member.image}`} 
              alt={member.name} 
              class="object-cover w-full h-full !aspect-square" 
              style="min-height: 100%; object-fit: cover;"
            />
          </div>
          <div class="space-y-4">
            <span class="inline-block px-3 py-1 text-xs text-[#272727] bg-white rounded-full">
              {member.title}
            </span>
            <h3 class="text-2xl font-mona font-med">{member.name}</h3>
            <p class="text-sm font-light font-inter">{member.bio}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

</Layout>

<style>

  p {
    font-size: 16px;
    line-height: 1.5;
  }

  .grid {
    gap: 24px;
  }

  img {
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }

  /* Mobile adjustments */
  @media (max-width: 1023px) {
    .container {
      padding: 0;
    }
    
    img {
      width: 100%;
      height: auto;
    }
  }
</style>