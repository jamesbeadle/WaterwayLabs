<script lang="ts">
  export let title: string;
  export let text: string;
  export let isHTML: boolean = false;
</script>

<div class="panel-container">
  <div class="panel-title">
    <h2>{title}</h2>
  </div>
  <div class="panel-content">
    {#if isHTML}
      <p>{@html text}</p>
    {:else}
      <p>{text}</p>
    {/if}
  </div>
</div>

<style>
  .panel-container {
    max-width: 1500px;
    margin: 0 auto;
    @apply flex flex-col px-4 py-4 lg:py-8 lg:flex-row lg:px-20 lg:justify-between;
  }

  .panel-title {
    @apply mb-6 text-left lg:w-1/2 lg:mb-0;
  }

  .panel-title h2 {
    @apply text-3xl font-semi font-mona;
  }

  .panel-content {
    @apply lg:w-1/2 lg:pl-12;
  }

  .panel-content p {
    @apply font-light text-body font-inter;
  }
</style>
