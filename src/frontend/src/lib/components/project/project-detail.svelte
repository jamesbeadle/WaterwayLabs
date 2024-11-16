<script lang="ts">
    import ArrowIcon from "$lib/icons/ArrowIcon.svelte";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
    import XIcon from "$lib/icons/XIcon.svelte";

    export let status: string;
    export let title: string;
    export let description: string;
    export let summary: string;
    export let backgroundColor: string;
    export let websiteURL: string;
    export let github: string;
    export let twitter: string;
</script>



<div class="flex flex-col space-y-2 xs:space-y-4 mx-4 mt-6 xs:mt-8 sm:mt-6 lg:mt-24">

  <div class="flex items-center justify-between w-full">          
    <div class="status">
      {status}
    </div>
    {#if github || twitter}
      <div class="flex flex-row space-x-4 lg:hidden">
        {#if github}
          <a href={github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-5 w-5" color={backgroundColor}/>
          </a>
        {/if}
        {#if twitter}
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <XIcon className="h-5 w-5" color={backgroundColor} />
          </a>
        {/if}
      </div>
    {/if}
  </div>

  <h1 class="text-2xl xs:text-3xl lg:text-5xl uppercase semi-bold tracking-wide">{title}</h1>

  <p class="text-base xs:text-xl uppercase tracking-wide">
    {description} 
  </p>
  
  <p class="text-sm exLight">
    {summary}
  </p>
  <div class="flex items-center justify-between w-full">
    <a href={websiteURL} target="_blank" rel="noopener noreferrer" 
       class="flex items-center w-full lg:w-auto xs:w-[99%] mt-4 p-1 transition-colors border border-white rounded-full group hover:bg-white hover:text-black">
      <span class="flex-1 text-xs semi-bold tracking-wide text-center lg:px-4">VISIT SITE</span>
      <span class="w-8 h-8 flex items-center justify-center">
        <ArrowIcon className="w-8 h-8" />
      </span>
    </a>
    <div class="flex-col hidden w-4 ml-auto space-y-4 lg:flex">
      {#if github}
        <a href={github} target="_blank" rel="noopener noreferrer">
          <GithubIcon className="w-5 h-5" color={backgroundColor} />
        </a>
      {/if}
      {#if twitter}
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <XIcon className="w-5 h-5" color={backgroundColor} />
        </a>
      {/if}
    </div>
  </div>
</div>


