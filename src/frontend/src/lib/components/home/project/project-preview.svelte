<script lang="ts">
    export let title: string;
    export let backgroundColor: string;
    export let backgroundImage: string;
    export let previewImage: string;
    export let translateX: string = "0px";
    export let mobilePreviewImage: string;
</script>

<!-- Desktop Preview -->
<section class="preview-section-desktop" style:background-color={backgroundColor}>
    <div class="preview-container">
        <img
            src={backgroundImage}
            alt={title}
            class="background-image"
            style:transform={`translateX(${translateX}) translateY(-12%)`}
        />
        <img
            src={previewImage}
            alt="{title} preview"
            class="preview-image"
        />
    </div>
</section>

<!-- Mobile Preview -->
<section class="preview-section-mobile" style:background-color={backgroundColor}>
    <div class="mobile-preview-container">
        <img
            src={mobilePreviewImage}
            alt="{title} preview"
            class="mobile-preview-image"
        />
    </div>
</section>

<style>
    .preview-section-desktop {
        @apply hidden w-1/2 lg:flex;
    }

    .preview-container {
        @apply relative flex items-center;
    }

    .background-image {
        @apply object-contain w-[650px] h-[750px] transform;
    }

    .preview-image {
        @apply absolute object-contain w-[650px] h-[700px] transform;
        transform: translateX(25%) translateY(-8%);
    }

    .preview-section-mobile {
        @apply lg:hidden w-full px-4 pt-20 overflow-hidden;
    }

    .mobile-preview-container {
        @apply relative w-[361px] mx-auto rounded-t-lg border-t-[5px] border-[#272727] 
               flex justify-center items-center shadow-preview;
    }

    .mobile-preview-image {
        @apply block object-contain w-full h-auto;
    }

    /* Custom shadow for mobile preview */
    :global(.shadow-preview) {
        box-shadow: 
            4px 3px 12px 0px rgba(0, 0, 0, 0.21),
            18px 12px 21px 0px rgba(0, 0, 0, 0.18),
            40px 26px 29px 0px rgba(0, 0, 0, 0.11),
            71px 46px 34px 0px rgba(0, 0, 0, 0.03),
            111px 72px 37px 0px rgba(0, 0, 0, 0);
    }

    /* Mobile responsiveness for preview container */
    @media (max-width: 380px) {
        .mobile-preview-container {
            @apply w-full;
        }
    }
</style>