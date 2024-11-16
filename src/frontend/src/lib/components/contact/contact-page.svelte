<script lang="ts">
    import ContactForm from './contact-form.svelte';
    import ContactInfo from './contact-info.svelte';
</script>
  
<div class="flex flex-col items-start gap-8 mx-auto md:flex-row mb-4">
    <div class="w-full mx-auto md:w-1/2">
        <ContactForm />
    </div>
    <div class="w-full md:w-1/2">
        <ContactInfo />
    </div>
</div>