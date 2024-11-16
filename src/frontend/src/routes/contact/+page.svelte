<script lang="ts">
    import Layout from "../Layout.svelte";
    import ContactPage from "$lib/components/contact/contact-page.svelte";
</script>

<Layout>
    <div class="mx-auto">

        <div class="responsive-row-col">
            <div class="text-left lg:w-1/2">
                <span class="status">CONTACT US</span>
                <h1 class="mt-6 mb-4 text-4xl leading-tight lg:mt-2 lg:mb-0 lg:text-5xl xl:text-6xl">
                    WE'D LOVE TO HEAR FROM YOU!
                </h1>
            </div>
            <div class="lg:w-1/2 lg:pl-12">
                <p class="main-paragraph">
                    At Waterway Labs, your feedback is important to us! Whether you have a question, a suggestion, or simply want to share your experience, we're all ears. Our goal is to make sure you have the best possible experience, and your input helps us get there. Feel free to send us a message, and we'll get back to you as soon as possible.         
                </p>
            </div>
        </div>
        <div class="horizontal-divider"></div>
        <ContactPage />
    </div>
</Layout>

