<script lang="ts">
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
    import XIcon from "$lib/icons/XIcon.svelte";

    export let status: string;
    export let title: string;
    export let description: string;
    export let summary: string;


</script>

<div class="flex justify-between items-center my-6">
            
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

  <h1 class="text-3xl semi-bold uppercase my-4">{title}</h1>

  <p class="text-lg mb-4 uppercase">
    {description} 
  </p>

  <p class="text-base exLight">
    {summary}
  </p>