<script lang="ts">
    import Footer from "$lib/shared/Footer.svelte";
    import Header from "$lib/shared/Header.svelte";

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

<Header/>

<section class="bg-[#272727] text-white">
  <!-- Hero Section -->
    <div class="container flex flex-col items-center justify-center py-20 lg:flex-row lg:px-20 lg:justify-between">
        <!-- Left side: Heading -->
        <div class="text-center lg:w-1/2 lg:text-left"style="margin-top: 25px;">
            <span class="px-3 py-1 translate-y-4 text-xs text-[#272727] bg-white font-semi rounded-full">OUR MISSION</span>
            <h1 class="mt-2 mb-0 text-5xl leading-tight font-semi font-mona font-h2">
                EMPOWERING <br> DECENTRALIZED <br> INNOVATION
            </h1>
        </div>
        <!-- Right side: Mission Text -->
        <div class="lg:w-1/2 lg:mt-0 lg:pl-12">
            <p class="font-light font-body font-inter" style="margin-top: 110px;">
                {missionText}
            </p>
        </div>
    </div>

    <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: -35px; margin-bottom: 70px; width: 1375px;"/>
  <!-- Image Section -->
    <div class="mx-auto lg:w-4/5" style="margin-top: 15px;">
        <img src="about-page.png" alt="Waterway Labs Mission Image" class="h-auto rounded-lg" style="width:2600px;">
    </div>

    <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 75px; margin-bottom: 20px; width: 1375px;"/>
  <!-- Vision Section -->
    <div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between">
        <!-- Left side: Heading -->
        <div class=" lg:w-1/2 lg:text-left"style="margin-top: -80px;">
            <h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3">
                VISION
            </h1>
        </div>
        <!-- Right side: Vision Text -->
        <div class="lg:w-1/2 lg:mt-0 lg:pl-12">
            <p class="mr-8 font-light font-body font-inter" style="margin-top: -6px;">
                {visionText}
            </p>
        </div>
    </div>
    <hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 75px; margin-bottom: 20px; width: 1375px;"/>
  <!-- Values Section -->
<div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between">
    <!-- Left side: Heading -->
    <div class=" lg:w-1/2 lg:text-left"style="margin-top: -80px;">
        <h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3">
            VALUES
        </h1>
    </div>
    <!-- Right side: Vision Text -->
    <div class="lg:w-1/2 lg:mt-0 lg:pl-12">
        <p class="mr-8 font-light font-body font-inter" style="margin-top: -6px;" bind:innerHTML={valuesText} contenteditable="false"></p>
    </div>
</div>
<hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 45px; margin-bottom: 20px; width: 1375px;"/>

  <!-- Journey Section -->
<div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between">
    <!-- Left side: Heading -->
    <div class=" lg:w-1/2 lg:text-left"style="margin-top: -80px;">
        <h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3">
            OUR JOURNEY
        </h1>
    </div>
    <!-- Right side: Vision Text -->
    <div class="lg:w-1/2 lg:mt-0 lg:pl-12">
        <p class="mr-8 font-light font-body font-inter" style="margin-top: -6px;">
            {journeyText}
        </p>
    </div>
</div>
<hr class="my-8 border-t-2 border-[#4E4E4E] mx-auto" style="margin-top: 75px; margin-bottom: 20px; width: 1375px;"/>

  <!-- Future Goals Section -->
  <div class="container flex flex-col items-center justify-center px-8 py-10 lg:flex-row lg:justify-between">
    <!-- Left side: Heading -->
    <div class=" lg:w-1/2 lg:text-left"style="margin-top: -80px;">
        <h1 class="mt-10 text-3xl ml-14 font-semi font-mona font-h3">
            FUTURE GOALS
        </h1>
    </div>
    <!-- Right side: Vision Text -->
    <div class="lg:w-1/2 lg:mt-0 lg:pl-12">
        <p class="mr-8 font-light font-body font-inter" style="margin-top: -6px;">
            {goalsText}
        </p>
    </div>
</div>
 <Footer/>
</section>

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
    font-weight: 1000; /* Make bold text inside <p> have a font weight of 700 */
  }
  .container {
    max-width: 1500px; /* Set the maximum width for the page content */
    margin: 0 auto; /* Center the content */
  }
</style>