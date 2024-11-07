<script lang="ts">
    import Layout from "../Layout.svelte";
    import TitleDisplay from "$lib/components/shared/title-display.svelte";
    import Divider from "$lib/components/shared/divider.svelte";
    import ContactPage from "$lib/components/contact/contact-page.svelte";
    
    let headingText = "WE'D LOVE TO HEAR FROM YOU!";
    let subtitleText = "CONTACT US";
    let descriptionText = "At Waterway Labs, your feedback is important to us! Whether you have a question, a suggestion, or simply want to share your experience, we're all ears. Our goal is to make sure you have the best possible experience, and your input helps us get there. Feel free to send us a message, and we'll get back to you as soon as possible.";
</script>

<Layout overrideBackground={true}>
    <main>
        <TitleDisplay title={headingText} subtitle={subtitleText} description={descriptionText} />
        
        <Divider />

        <ContactPage />
    </main>
</Layout>

<style>
    body {
        overflow-x: hidden;
    }
</style>
