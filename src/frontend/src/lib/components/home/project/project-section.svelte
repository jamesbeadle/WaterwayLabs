<script lang="ts">
    import ProjectContent from "./project-content.svelte";
    import ProjectPreview from "./project-preview.svelte";  

    export let title: string;
    export let description: string;
    export let summary: string;
    export let buttonText: string;
    export let buttonLink: string;
    export let status: string;
    export let isFootballGod: boolean = false;
    export let twitter: string | undefined = undefined;
    export let githubLink: string | undefined = undefined;
    export let mainColour: string = '#FFFFFF';
    export let backgroundColor: string;
    export let backgroundImage: string;
    export let previewImage: string;
    export let translateX: string = "0px";
</script>

<div class="desktop-layout">
    <div class="content-section">
        <ProjectContent
            {title}
            {description}
            {summary}
            {buttonText}
            {buttonLink}
            {status}
            {isFootballGod}
            {twitter}
            {githubLink}
            {mainColour}
        />
    </div>

    <ProjectPreview
        {title}
        {backgroundColor}
        {backgroundImage}
        {previewImage}
        {translateX}
        isDesktopApp={isFootballGod}
    />
</div>

<div class="mobile-container">
    <main class="mobile-main">
        <div class="mobile-preview">
            <ProjectPreview
                {title}
                {backgroundColor}
                {backgroundImage}
                {previewImage}
                {translateX}
                isDesktopApp={isFootballGod}
            />
        </div>

        <div class="mobile-content">
            <ProjectContent
                {title}
                {description}
                {summary}
                {buttonText}
                {buttonLink}
                {status}
                {isFootballGod}
                {twitter}
                {githubLink}
                {mainColour}
            />
        </div>
    </main>
</div>

<style>
    .desktop-layout {
        @apply hidden lg:flex w-full;
    }

    .content-section {
        @apply hidden w-1/2 space-y-6 lg:p-8 lg:block -mt-[35px];
        min-height: 500px;
        min-width: 583px;
    }

    .mobile-container {
        @apply flex flex-col;
    }

    .mobile-header {
        @apply fixed top-0 bg-[#272727] z-50 left-0 right-0;
    }

    .mobile-status-wrapper {
        @apply flex items-center justify-between px-4;
    }

    .mobile-main {
        @apply flex flex-col overflow-y-auto;
    }

    .mobile-preview {
        @apply w-full;
        height: 25vh;
    }

    .mobile-content {
        @apply w-full px-4 pt-20 pb-60;
    }

    .status-badge {
        @apply px-3 py-1 translate-y-2 text-xs text-[#272727] bg-white rounded-full;
    }

    .social-icons-mobile {
        @apply flex items-center gap-4;
        transform: translateY(10px);
    }

    .social-link {
        @apply relative z-50 hover:opacity-80;
    }

    .social-icon {
        @apply w-5 h-5;
    }

    :global(html),
    :global(body) {
        @apply h-full m-0 p-0 overflow-x-hidden;
    }
  
    :global(body) {
        font-family: "Poppins", "Mona Sans Expanded", sans-serif !important;
        @apply text-white;
    }

    @media (max-width: 1023px) { 
        :global(body) {
            @apply bg-[#272727];
        }
    }
  
    @media (min-width: 1024px) { 
        :global(body) {
            background: linear-gradient(
                to right,
                #272727 50%,
                var(--selectedProject-bg-color, #2ce3a6) 50%
            );
        }
    }

    @media (min-width: 1024px) {
        .mobile-container {
            @apply hidden;
        }
    }
</style>