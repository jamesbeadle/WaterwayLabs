<script lang="ts">
    import Layout from "../Layout.svelte";
    import TitleDisplay from "$lib/components/shared/title-display.svelte";
    import Panel from "$lib/components/about/panel.svelte";
    
    export let descriptionText = "At Waterway Labs, we are committed to pioneering the next generation of decentralized solutions. Our mission is to create secure, innovative, and user-friendly blockchain products that empower individuals and businesses. We believe in a future where technology fosters transparency, freedom, and collaboration, allowing everyone to participate in the decentralized economy.";
    export let visionText = "To become a global leader in decentralized technology, enabling a more transparent, secure, and open digital ecosystem. We envision a world where individuals have complete control over their digital assets, identities, and privacy.";
    export let valuesText = `
    <strong style="font-weight: 700;">Innovation:</strong> Constantly pushing the boundaries of what’s possible in decentralized technology.<br>
    <strong style="font-weight: 700;">Transparency:</strong> Upholding openness in our processes, products, and communication.<br>
    <strong style="font-weight: 700;">Empowerment:</strong> Giving users the tools and freedom to control their digital presence.<br>
    <strong style="font-weight: 700;">Security:</strong> Prioritizing the highest standards of safety and reliability in every solution we build.
    `;
    export let journeyText = "Founded with a vision to challenge centralized norms, Waterway Labs started with a small team passionate about decentralization. Over the years, we have grown into a trusted name in blockchain innovation, known for our contributions to various web3 products and decentralized applications.";
    export let goalsText = "Looking ahead, Waterway Labs aims to broaden the accessibility of decentralized technologies, fostering an inclusive ecosystem for developers, businesses, and end-users alike. We are focused on pushing innovation further, partnering with like-minded communities to build the foundation of the next digital era.";
    export let headingText = "EMPOWERING <br> DECENTRALIZED <br> INNOVATION";
    export let subtitleText = "OUR MISSION";
</script>

<Layout overrideBackground={true}>
  <div class="mx-auto">
    <div>
      <TitleDisplay title={headingText} subtitle={subtitleText} description={descriptionText} />
      <div class="horizontal-divider"></div>

      <div class="px-4 mx-auto lg:mb-10 lg:w-4/5">
          <img 
              src="about-mobile-page.png" 
              alt="Waterway Labs Mission" 
              class="block lg:hidden object-contain w-full h-[500px] rounded-lg"
          >
          <img 
              src="about-page.png" 
              alt="Waterway Labs Mission" 
              class="hidden object-contain w-full h-auto rounded-lg lg:block"
          >
      </div>
      <div class="horizontal-divider"></div>

      <div>

        <Panel title="VISION" text={visionText} />
        <div class="horizontal-divider"></div>

        <Panel title="VALUES" text={valuesText} isHTML={true} />
        <div class="horizontal-divider"></div>

        <Panel title="OUR JOURNEY" text={journeyText} />
        <div class="horizontal-divider"></div>
        
        <Panel title="FUTURE GOALS" text={goalsText} />
        <div class="horizontal-divider"></div>
      </div>
    </div>
  </div>
</Layout>