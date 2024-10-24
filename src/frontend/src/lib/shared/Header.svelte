<script lang="ts">
  import { page } from '$app/stores';

  export let logo = "logo.png";

</script>

<header class="{$page.url.pathname === '/' ? 'w-half' : 'w-full'} fixed top-0 left-0 right-0 bg-[#272727] z-10">
  <nav class="text-white">
    <div class="flex items-center justify-between h-16 px-8">
      <a href="/" class="flex items-center">
        <img src="logo.png" class="h-6" alt="Waterway Labs Logo" />
        <span class="ml-2 text-2xl tracking-wide font-mona">
          <span class="text-white">WATERWAY</span>
          <span class="text-white font-exlight">LABS</span>
        </span>
      </a>
      <div class="flex space-x-8 text-sm font-mona">
        <a href="/about" class="hover:text-blue-400">ABOUT</a>
        <a href="/team" class="hover:text-blue-400">TEAM</a>
        <a href="/contact" class="hover:text-blue-400">CONTACT</a>
      </div>
    </div>
  </nav>
</header>

<style>
  /* Styling for different widths */
  .w-half{
    width: 50%;
  }
  
  .w-full {
    width: 100%;
  }
</style>