<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import Header from "$lib/shared/Header.svelte";
  import Footer from "$lib/shared/Footer.svelte";

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
      // Your existing logic
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      isLoading.set(false);
    }
  });
</script>

<Header />

<!-- Team Section -->
<section class="bg-[#272727] text-white py-16 px-8">
  <div class="max-w-screen-xl mx-auto">
    <div class="container flex flex-col items-center justify-center py-5 lg:flex-row lg:px-10 lg:justify-between" style="transform: translateX(-4%);">
      <!-- Left side: Heading -->
      <div class="text-center lg:w-1/2 lg:text-left"style="margin-top: 20px;">
          <span class="px-3 py-1 translate-y-4 text-xs text-[#272727] bg-white font-semi rounded-full">THE TEAM</span>
          <h1 class="mt-2 text-6xl leading-tight font-med font-mona font-h2">
            A TEAM OF <br> WEB3 EXPERTS
          </h1>
      </div>
      <!-- Right side: Mission Text -->
      <div class="mx-auto mt-2 lg:w-3/5 lg:mt-4 lg:pl-12">
          <p class="font-light font-body font-inter" style="margin-top: 25px; transform: translateX(10%);">
            At Waterway Labs, we are passionate about building innovative Web3 products that champion decentralization. Our team is dedicated to developing cutting-edge solutions that empower users, offering transparency, security, and freedom. With a shared belief in the transformative potential of blockchain technology, we are committed to pushing the boundaries of what’s possible in decentralized applications, fostering an open and collaborative ecosystem.          </p>
      </div>
    </div>

    <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="transform: translateX(-2%); margin-top: 15px; margin-bottom: 50px; width: 1360px;"/>

    <div class="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4" style= "margin-top: -20px;">
      {#each teamMembers as member}
        <div class="p-6" style="transform: translateX(-15%);">
          <div class="mx-auto mb-6 overflow-hidden w-80 h-80">
            <img src={`team/${member.image}`} alt={member.name} class="object-cover w-full h-full" />
          </div>
          <span class="px-3 py-1 translate-y-4 mb-6 text-xs text-[#272727] bg-white font-semi rounded-full">{member.title}</span>
          <h3 class="mt-2 mb-4 text-2xl font-mona font-med">{member.name}</h3>
          <p class="text-sm font-light font-inter">{member.bio}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<Footer />

<style>
  h2, p {
    font-family: "Inter", sans-serif;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }

  /* Adjusts the grid for team members */
  .grid {
    gap: 24px;
  }

  .bg-gray-800 {
    background-color: #1F1F1F;
  }

  .text-blue-400 {
    color: #61dafb;
  }

  img {
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }
</style>