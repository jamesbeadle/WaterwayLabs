<footer class="relative py-8 bg-gray-900">
  <!-- Add Ellipses for Blur Effect -->
  <div class="absolute ellipse-1"></div>
  <div class="absolute ellipse-2"></div>

  <div class="relative z-10">
    
    <!-- First Row (Logo and Links) -->
    <div class="flex items-center justify-between w-full px-12">
      <div class="flex items-center mb-0">
        <a href="/" class="flex items-center">
          <img src="logo.png" class="h-6" alt="Waterway Labs Logo" />
          <span class="ml-2 tracking-wide font-mona">
            <span class="text-white">WATERWAY</span>
            <span class="text-white font-exlight">LABS</span>
          </span>
        </a>
      </div>
      <div class="text-sm font-light text-right font-inter font-body">
        <a href="/" class="mx-4 hover:text-blue-400">Products</a> | 
        <a href="/about" class="mx-4 hover:text-blue-400">About Us</a> | 
        <a href="/team" class="mx-4 hover:text-blue-400">The Team</a>
      </div>
    </div>
    <!-- Divider -->
    <hr class="my-6 border-t-2 border-[#4E4E4E] mx-auto" style="margin-bottom: 20px; width: 1450px;" />
    
    <!-- Second Row (Let's Connect and Social Links) -->
    <div class="flex items-center justify-between w-full px-12">
      <div class="flex flex-col text-sm">
        <h4 class="font-mona font-h4">LET'S CONNECT</h4>
      </div>
      <div class="text-sm font-light text-right font-inter font-body">
        <a href="https://github.com" target="_blank" class="mx-2 hover:text-white">GitHub</a>
        <a href="https://twitter.com" target="_blank" class="mx-2 hover:text-white">Twitter</a>
      </div>
    </div>
    
  </div>
</footer>

<style>
  footer {
    background-color: #272727;
    position: relative;
    overflow: hidden;
  }

  /* Ellipse 1 */
  .ellipse-1 {
    width: 256px;
    height: 256px;
    background: rgba(79, 168, 246, 0.2); /* Adjust the color based on Figma */
    filter: blur(240px);
    position: absolute;
    top: 10%;
    left: 25%;
  }

  /* Ellipse 2 */
  .ellipse-2 {
    width: 240px;
    height: 240px;
    background: rgba(244, 223, 253, 0.2); /* Adjust the color based on Figma */
    filter: blur(320px);
    position: absolute;
    bottom: 20%;
    right: 30%;
  }

  footer a {
    font-family: "Inter", sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .relative {
    position: relative;
    z-index: 10;
  }

  /* Optional: Ensure the divider is visually balanced */
  hr {
    border-color: #4E4E4E;
  }
</style>