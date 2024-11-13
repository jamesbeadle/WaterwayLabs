<script lang="ts">
    export let title: string;
    export let subtitle: string;
    export let description: string;

  </script>
  
  <div class="container flex flex-col px-4 mx-auto lg:px-0 lg:flex-row lg:justify-between 2xl:px-20 3xl:px-40">
    <div class="pt-4 text-left lg:pt-12 lg:w-1/2">
      <span class="status">{subtitle}</span>
      <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 font-med font-mona lg:text-5xl xl:text-6xl">
        {@html title}
      </h1>
    </div>
    <div class="flex items-end mt-8 mb-6 lg:mb-0 lg:mt-0 lg:w-3/5 lg:pl-12">
      <p class="text-lg font-light lg:text-body font-inter lg:transform">
        {description}
      </p>
    </div>
  </div>