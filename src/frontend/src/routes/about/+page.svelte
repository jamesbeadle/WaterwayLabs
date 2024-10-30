<script lang="ts">
    import Layout from "../Layout.svelte";

    export let missionText = "At Waterway Labs, we are committed to pioneering the next generation of decentralized solutions. Our mission is to create secure, innovative, and user-friendly blockchain products that empower individuals and businesses. We believe in a future where technology fosters transparency, freedom, and collaboration, allowing everyone to participate in the decentralized economy.";
    export let visionText = "To become a global leader in decentralized technology, enabling a more transparent, secure, and open digital ecosystem. We envision a world where individuals have complete control over their digital assets, identities, and privacy.";
    export let valuesText = `
    <strong style="font-weight: 700;">Innovation:</strong> Constantly pushing the boundaries of what’s possible in decentralized technology.<br>
    <strong style="font-weight: 700;">Transparency:</strong> Upholding openness in our processes, products, and communication.<br>
    <strong style="font-weight: 700;">Empowerment:</strong> Giving users the tools and freedom to control their digital presence.<br>
    <strong style="font-weight: 700;">Security:</strong> Prioritizing the highest standards of safety and reliability in every solution we build.
    `;
    export let journeyText = "Founded with a vision to challenge centralized norms, Waterway Labs started with a small team passionate about decentralization. Over the years, we have grown into a trusted name in blockchain innovation, known for our contributions to various web3 products and decentralized applications.";
    export let goalsText = "Looking ahead, Waterway Labs aims to broaden the accessibility of decentralized technologies, fostering an inclusive ecosystem for developers, businesses, and end-users alike. We are focused on pushing innovation further, partnering with like-minded communities to build the foundation of the next digital era.";
</script>

<Layout overrideBackground={true}>
<div class="bg-[#272727] text-white">
    <div class="container flex flex-col px-4 py-8 lg:py-0 lg:flex-row lg:px-20 lg:justify-between">
        <!-- Left side: Heading -->
        <div class="pt-12 text-left lg:w-1/2 lg:pt-24">
            <span class="inline-block px-3 py-1 text-xs text-[#272727] bg-white rounded-full mb-4">
                OUR MISSION
            </span>
            <h1 class="text-4xl leading-tight lg:text-h2 font-med font-mona">
                EMPOWERING <br> DECENTRALIZED <br> INNOVATION
            </h1>
        </div>
        <!-- Right side: Mission Text -->
        <div class="lg:w-1/2 lg:mt-0 lg:pl-12 lg:pt-24">
            <p class="font-light mt-28 font-body font-inter">
                {missionText}
            </p>
        </div>
    </div>

    <hr class="mx-4 lg:mx-auto my-6 lg:my-12 border-t-2 border-[#4E4E4E] lg:w-[1375px]"/>

    <div class="px-4 mx-auto lg:px-0 lg:w-4/5">
        <!-- Mobile Image -->
        <img 
            src="about-mobile-page.png" 
            alt="Waterway Labs Mission Image" 
            class="block lg:hidden object-contain w-full h-[500px] rounded-lg"
        >
        <!-- Desktop Image -->
        <img 
            src="about-page.png" 
            alt="Waterway Labs Mission Image" 
            class="hidden object-contain w-full h-auto rounded-lg lg:block"
        >
    </div>

    <hr class="mx-4 lg:mx-auto my-6 lg:my-12 border-t-2 border-[#4E4E4E] lg:w-[1375px]"/>

    <!-- Content Sections -->
    {#each [
        { title: 'VISION', text: visionText },
        { title: 'VALUES', text: valuesText, isHTML: true },
        { title: 'OUR JOURNEY', text: journeyText },
        { title: 'FUTURE GOALS', text: goalsText }
    ] as section}
        <div class="container flex flex-col px-4 py-4 lg:py-8 lg:flex-row lg:px-20 lg:justify-between">
            <!-- Heading -->
            <div class="mb-6 text-left lg:w-1/2 lg:mb-0">
                <h2 class="text-3xl font-semi font-mona">
                    {section.title}
                </h2>
            </div>
            <!-- Content -->
            <div class="lg:w-1/2 lg:pl-12">
                {#if section.isHTML}
                    <p class="font-light font-body font-inter">{@html section.text}</p>
                {:else}
                    <p class="font-light font-body font-inter">{section.text}</p>
                {/if}
            </div>
        </div>
        <hr class="mx-4 lg:mx-auto my-8 lg:my-12 border-t-2 border-[#4E4E4E] lg:w-[1375px]"/>
    {/each}
</div>
</Layout>

<style>
  h1, h2 {
    font-family: "Inter", sans-serif;
  }
  
  p {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 25px;
    font-weight: 300;
  }
  
  p strong {
    font-weight: 700;
  }
  
  .container {
    max-width: 1500px;
    margin: 0 auto;
  }

  /* Mobile-specific styles */
  @media (max-width: 1023px) {
    p {
      padding-right: 0;
    }
  }
</style>