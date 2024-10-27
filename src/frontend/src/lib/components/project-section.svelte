<script lang="ts">
    export let title: string;
    export let description: string;
    export let summary: string;
    export let buttonText: string;
    export let buttonLink: string;
    export let status: string;
    export let isFootballGod: boolean = false;
</script>
  
<section class="space-y-6 project-section lg:p-8" style="margin-top: -35px;">
    <span class="px-3 py-1 translate-y-2 text-xs text-[#272727] bg-white rounded-full">{status}</span>
    <h1 class="project-title">{title}</h1>
    <h4 class="font-med font-mona {isFootballGod ? 'text-h4small' : 'text-h4'}">{description}</h4>
    <p class="mr-8 font-light text-gray-300 font-inter lg:mt-4 lg:mb-8 {isFootballGod ? 'text-bodysmall' : 'text-body'}">{summary}</p>
    <a
        href={buttonLink}
        target="_blank"
        class="button-style group"
        >
        <span class="button-text">{buttonText}</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="transition-transform duration-300 button-icon group-hover:translate-x-2"
        >
            <path d="M10 17l5-5-5-5v10z"/>
        </svg>
    </a>
</section>
<style>
    .button-style {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background-color: transparent;
      color: white;
      border: 2px solid white;
      border-radius: 9999px;
      font-family: 'mona', sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 12.6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .button-style:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .button-text {
      margin-right: 8px;
    }
    
    .button-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
    }
</style>
