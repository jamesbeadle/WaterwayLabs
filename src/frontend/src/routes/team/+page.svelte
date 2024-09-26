<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading } from "$lib/stores/global-stores";
  import Layout from "../Layout.svelte";

  const teamMembers = [
    { name: "Zoe Duffy", title: "Managing Director", image: "zoe.jpg", bio: "Zoe runs many tech companies through her management consultancy, providing expert advice to ensure complicance with various legal frameworks." },
    { name: "Kelly Howlett", title: "Head of Operations", image: "kelly.jpeg", bio: "Kelly ensure the day to day operation of Waterway Labs on all things water. Kelly has the experience required to ensure anything can be done in a safe and secure manner." },
    { name: "James Beadle", title: "Development Manager", image: "james.jpg", bio: "James ensures the delivery of all Waterway Labs Projects." },
    { name: "Dfinity Designer", title: "Head of Design", image: "dfd.jpg", bio: "DfinityDesigner is a talented UI/UX designer that has put his stamp on various blockchain projects. He is known for high quality brilliant branding." },
    { name: "Thilly Thana", title: "Lead Developer", image: "thilly.jpg", bio: "Thilly is a computer science graduate with a passion for frontend development. Thilly brings DfinityDesigners designs to life using his expert Svelte skills." },
    { name: "George Robinson", title: "Community Manager", image: "george.jpg", bio: "George builds relationships with community members through any channel with users receptive to the Internet Computer's message." },
    { name: "Josh Wray", title: "Head of Promotion", image: "josh.jpg", bio: "Josh ensures our team has the relationships in place to foster a co-operative, results driven ecosystem." },
    { name: "Ashutosh Yadav", title: "Media Production Manager", image: "ashutosh.jpg", bio: "Ashutosh delivers high quality rendered contend at lightning speed, when we need to take our message to the next level he is always required." },
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

<Layout>
  <div class="flex flex-col space-y-6 text-base my-20">
    <h2 class="text-2xl font-semibold text-center">Meet the Team</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each teamMembers as member}
        <div class="flex flex-col items-center bg-WaterwayBeige text-WaterwayBrown p-6 rounded-lg shadow-lg">
          <div class="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img src={`team/${member.image}`} alt={member.name} class="w-full h-full object-cover" />
          </div>
          <div class="text-center">
            <h3 class="text-xl font-medium">{member.name}</h3>
            <p class="text-sm font-semibold">{member.title}</p>
            <p class="text-sm mt-2">{member.bio}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Layout>

