<script lang="ts">
    export let title: string;
    export let backgroundColor: string;
    export let backgroundImage: string;
    export let previewImage: string;
    export let translateX: string = "0px";
    export let isDesktopApp: boolean = false;
</script>

<section class="preview-section" style:background-color={backgroundColor}>
    <div class="preview-container">
        <img
            src={backgroundImage}
            alt={title}
            class="background-image"
            style:transform={`translateX(${translateX}) translateY(-12%)`}
        />
        <div class="preview-wrapper" class:desktop-app={isDesktopApp}>
            <div class="image-container" class:desktop-app={isDesktopApp}>
                <img
                    src={previewImage}
                    alt="{title} preview"
                    class="preview-image"
                    class:desktop-app={isDesktopApp}
                />
            </div>
        </div>
    </div>
</section>

<style>
    .preview-section {
    @apply w-full lg:w-1/2;
    @apply lg:relative lg:overflow-visible;
}

.preview-container {
    @apply relative flex items-center;
    @apply lg:h-screen lg:justify-center;
    width: 750px;
}

    .background-image {
        @apply hidden lg:block object-contain w-[650px] h-[750px] transform;
        @apply lg:absolute lg:z-0;
    }

    .preview-wrapper {
        @apply relative;
        @apply w-[361px] mx-auto rounded-lg border-[5px] border-[#272727];
        @apply lg:absolute lg:w-[600px] lg:border-0 lg:z-10;
        @apply lg:right-[-20%] lg:top-[35%] lg:transform lg:-translate-y-1/2; 
    }
    

    .image-container {
        @apply relative w-full;
        height: 450px; 
        width: 544px; 
        @apply rounded-lg overflow-hidden;
        border: 10px solid #272727; 
    }

    

    .preview-image {
        @apply absolute inset-0;
        @apply w-full h-full;
        object-fit: cover; 
        object-position: left; 
        @apply m-auto;
        filter: blur(0.5px);
        transition: all 0.3s ease;
    }

    .preview-wrapper::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 8px;
        pointer-events: none;
        
        @apply lg:hidden;
        box-shadow: 
            4px 3px 12px rgba(0, 0, 0, 0.21),
            18px 12px 21px rgba(0, 0, 0, 0.18),
            40px 26px 29px rgba(0, 0, 0, 0.11),
            71px 46px 34px rgba(0, 0, 0, 0.03),
            111px 72px 37px rgba(0, 0, 0, 0);
    }
    @media (min-width: 1024px) {
        .preview-wrapper::after {
            @apply block;
            box-shadow: 
                4px 3px 12px rgba(0, 0, 0, 0.21),
                18px 12px 21px rgba(0, 0, 0, 0.18),
                40px 26px 29px rgba(0, 0, 0, 0.11),
                71px 46px 34px rgba(0, 0, 0, 0.03),
                111px 72px 37px rgba(0, 0, 0, 0);
        }
        .preview-wrapper.desktop-app {
            @apply lg:w-[600px] lg:right-[-20%];
            @apply border-0 bg-[#272727] rounded-xl;
        }
        .image-container.desktop-app {
            height: 450px; 
            width: 544px; 
            @apply rounded-xl overflow-hidden;
            border: 10px solid #272727; 
        }
        .preview-image.desktop-app {
            @apply object-cover;
            @apply rounded-xl;
            @apply p-0;
        }
    }

    .preview-wrapper {
        isolation: isolate;
    }

    .preview-wrapper:hover .preview-image {
        transform: translateY(-5px);
    }

    @media (max-width: 1024px) {
        .preview-section {
            width: 100%;
        }
        .preview-container {
            width: 100%;
            overflow: hidden;
            padding-top: 10rem;
            height: 33vh; 
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .preview-wrapper {
            border: none;
            background-color: #272727;
        }

        .image-container {
            height: 100%; 
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 10px solid #272727; 
            border-radius: 1rem;
            overflow: hidden; 
            }

        .preview-image {
            position: relative; 
            width: 100%;
            display: block;
            object-fit: contain; 
            transform: none;
            object-position: center;
            max-height: 250px;
        }
    }

    @media (max-width: 380px) {
        .preview-wrapper {
            @apply w-full;
        }
    }
</style>