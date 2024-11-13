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

<div class="flex items-center justify-between w-full mt-8 lg:mt-10 xl:mt-18 2xl:mt-24 sm:mx-10 sm:mt-6">          
  <div class="status">
    {status}
  </div>
  {#if github || twitter}
    <div class="flex flex-row space-x-4 mr-2 xs:w-[15%] sm:w-[15%] md:w-[15%] lg:hidden">
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

<h1 class="my-2 text-4xl uppercase lg:text-5xl xl:text-h1 semi-bold sm:mx-10 sm:mt-4 sm:mb-6">{title}</h1>

<p class="mb-2 text-xl uppercase sm:text-h4 sm:mx-10 sm:mb-6">
  {description} 
</p>

<p class="text-base xs:text-sm exLight sm:mx-10">
  {summary}
</p>
<div class="flex items-center justify-between w-full mt-4 sm:mx-10">
  <a href={websiteURL} target="_blank" rel="noopener noreferrer" class="items-center justify-between hidden w-auto px-6 py-1 transition-colors border border-white rounded-full lg:flex group hover:bg-white hover:text-black">
    <span class="ml-0 text-xs font-semibold tracking-wide text-center">VISIT SITE</span>
    <span class="w-8 h-8 transform translate-x-5">
      <ArrowIcon class="w-4 h-4" />
    </span>
  </a>

  <a href={websiteURL} target="_blank" rel="noopener noreferrer" class="relative flex items-center w-full xs:w-[99%] sm:w-[90%] md:w-[90%] py-2 pl-6 pr-2 transition-colors border border-white rounded-full lg:hidden group hover:bg-white hover:text-black">
    <span class="flex-1 text-xs font-semibold tracking-wide text-center">VISIT SITE</span>
    <span class="w-8 h-8">
      <ArrowIcon class="w-5 h-5" />
    </span>
  </a>
  <div class="flex-col hidden w-4 ml-auto mr-12 space-y-4 lg:flex">
    {#if github}
      <a href={github} target="_blank" rel="noopener noreferrer">
        <GithubIcon class="w-5 h-5" color={backgroundColor} />
      </a>
    {/if}
    {#if twitter}
      <a href={twitter} target="_blank" rel="noopener noreferrer">
        <XIcon class="w-5 h-5" color={backgroundColor} />
      </a>
    {/if}
  </div>
</div>

