<script lang="ts">
    import ArrowIcon from "$lib/icons/ArrowIcon.svelte";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
    import XIcon from "$lib/icons/XIcon.svelte";

    export let status: string;
    export let title: string;
    export let description: string;
    export let summary: string;


</script>

<div class="flex justify-between items-center mt-8 sm:my-6">
            
  <div class="inline-block bg-white text-black semi-bold text-xs px-4 py-2 rounded-full shadow-md">
    {status}
  </div>
  
  <div class="flex space-x-4 pr-2">
    <a href="https://github.com" target="_blank">
      <GithubIcon className="h-6 w-6" />
    </a>
    <a href="https://twitter.com" target="_blank">
      <XIcon className="h-6 w-6" />
    </a>
  </div>
</div>

<h1 class="text-4xl sm:text-3xl semi-bold uppercase my-2 sm:mb-4">{title}</h1>

<p class="text-xl sm:text-lg mb-2 sm:mb-4 uppercase">
  {description} 
</p>

<p class="text-base xs:text-base exLight">
  {summary}
</p>

<button class="group relative flex items-center w-full sm:w-auto mt-4 sm:mt-6 px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
  <span class="flex-grow text-center font-semibold tracking-wide">VISIT SITE</span>
  <span class="flex-shrink-0 ml-2 sm:ml-4">
    <ArrowIcon className="w-5 h-5 sm:w-6 sm:h-6" />
  </span>
</button>
