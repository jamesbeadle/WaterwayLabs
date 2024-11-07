<script lang="ts">
    export let title: string;
    export let subtitle: string;
    export let description: string;

  </script>
  
  <div class="title-container">
    <div class="title-left">
      <span class="subtitle">{subtitle}</span>
      <h1 class="main-title">
        {@html title}
      </h1>
    </div>
    <div class="title-right">
      <p class="description">
        {description}
      </p>
    </div>
  </div>
  
  <style>
    .title-container {
        max-width: 1500px;
        @apply container mx-auto flex flex-col lg:flex-row lg:px-6 lg:justify-between;
    }

    .title-left {
      @apply pt-12 text-left lg:w-1/2 lg:pt-24;
    }

    .subtitle {
      @apply px-3 py-1 text-xs text-[#272727] bg-white rounded-full;
    }

    .main-title {
      @apply mt-2 mb-0 leading-tight text-4xl font-med font-mona lg:text-6xl;
    }

    .title-right {
      @apply flex items-end mt-6 lg:w-3/5 lg:mt-4 lg:pl-12;
    }

    .description {
      @apply font-light text-body font-inter lg:transform;
    }

    @media (max-width: 1023px) {
      .title-container {
        @apply px-4;
      }

      .title-left {
        @apply pt-28;
      }

      .subtitle {
        @apply mt-20;
      }

      .main-title {
        @apply mt-6 mb-4; 
      }

      .title-right {
        @apply mt-8 mb-6;
      }

      .description {
        @apply text-lg leading-relaxed;
      }
    }
  </style>