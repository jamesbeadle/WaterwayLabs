<script lang="ts">
  import Layout from "../Layout.svelte";
    
   export let isMenuOpen: boolean;
</script>

<Layout bind:isMenuOpen>
  
  <div>

    <div class="responsive-row-col">
      <div class="text-left lg:w-1/2">
        <span class="status">OUR MISSION</span>
        <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
          A WAVE OF DECENTRALISED SERVICES
        </h1>
      </div>
      <div class="lg:w-1/2 lg:pl-12">
        <p class="main-paragraph">
          At Waterway Labs, we aim to build a future of decentralised web services owned by their users.
          Our mission is to create secure, user-friendly and innovative blockchain products that empowers everyone to earn with our range of utility tokens. 
          We believe in a future run using a decentralised economy where technology is transparent, community owned and built to improve the lives of everyday people.
        </p>
      </div>
    </div>
  
    <div class="horizontal-divider"></div>

    <div class="px-4 mx-auto lg:mb-10 lg:w-4/5">
        <img 
            src="about.jpg" 
            alt="Waterway Labs Mission" 
            class="block object-contain w-full rounded-lg my-8"
        >
    </div>
    <div class="horizontal-divider"></div>

    <div>

      <div class="responsive-row-col">
        <div class="mb-6 text-left lg:w-1/2 lg:mb-0">
          <h2 class="text-3xl">VISION</h2>
        </div>
        <div class="lg:w-1/2 lg:pl-12">
          <p class="exLight">To become a global leader in decentralised technology, enabling a more transparent, secure, and open digital ecosystem. We envision a world where individuals have complete control over their digital assets, identities, data and privacy.</p>
        </div>
      </div>
      
      <div class="horizontal-divider"></div>

      <div class="responsive-row-col">
        <div class="mb-6 text-left lg:w-1/2 lg:mb-0">
          <h2 class="text-3xl">VALUES</h2>
        </div>
        <div class="lg:w-1/2 lg:pl-12">
          <p class=" exLight">
            We believe in building open Web3 services that share equity with the users who make those services a success. We aim to contribute to the development of the Web3 ecosystem through the discussion and implementation of standards and techniques that lead to these equitable outcomes for society.
          </p>
        </div>
      </div>
      <div class="horizontal-divider"></div>

      <div class="responsive-row-col">
        <div class="mb-6 text-left lg:w-1/2 lg:mb-0">
          <h2 class="text-3xl">OUR JOURNEY</h2>
        </div>
        <div class="lg:w-1/2 lg:pl-12">
          <p class="exLight">
            Founded with a vision to fight against the increased centralisation of big tech, Waterway Labs started with a small team passionate about decentralisation. 
            We aim to become a trusted name in blockchain innovation, known for contributions to fairly decentralising services among users.</p>
        </div>
      </div>
      <div class="horizontal-divider"></div>

      <div class="responsive-row-col">
        <div class="mb-6 text-left lg:w-1/2 lg:mb-0">
          <h2 class="text-3xl">FUTURE GOALS</h2>
        </div>
        <div class="lg:w-1/2 lg:pl-12">
          <p class="exLight">
            We aim to decentralise services in key areas to introduce a wide range of the population to Web3. 
            Our aim is to automate the development of this software by developing our own internal narrow AI trained to build decentralised solutions from our codebase.  
          </p>
        </div>
      </div>
      <div class="horizontal-divider"></div>
    </div>
  </div>
</Layout>