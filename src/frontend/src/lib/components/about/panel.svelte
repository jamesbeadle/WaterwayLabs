<script lang="ts">
  export let title: string;
  export let text: string;
  export let isHTML: boolean = false;
</script>

<div class="flex flex-col px-4 py-4 lg:mx-auto lg:py-8 lg:flex-row lg:px-20 lg:justify-between">
  <div class="mb-6 text-left lg:w-1/2 lg:mb-0">
    <h2 class="text-3xl font-semi font-mona">{title}</h2>
  </div>
  <div class="lg:w-1/2 lg:pl-12">
    {#if isHTML}
      <p class="font-light text-body font-inter">{@html text}</p>
    {:else}
      <p class="font-light text-body font-inter">{text}</p>
    {/if}
  </div>
</div>

