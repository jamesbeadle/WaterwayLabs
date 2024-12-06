<script lang="ts">
  import { contactStore } from "$lib/stores/contact-store";
  import { isError } from "$lib/utils/helpers";
  import type { SubmitContactFormDTO } from "../../../../../declarations/backend/backend.did";
  import LocalSpinner from "../shared/local-spinner.svelte";
  import { toasts } from '$lib/stores/toasts-store';

  let isLoading = false;
  let name = "";
  let email = "";
  let message = "";

  async function handleSubmit() {
    isLoading = true;
    const dto: SubmitContactFormDTO = {
      contact: email,
      name,
      message
    };

    const result = await contactStore.submitContactForm(dto);
    const submitError = isError(result);

    if (submitError) {
      const submitErr = result.err;
      const alreadyExists = Object.keys(submitErr)[0] == "AlreadyExists";

      if (alreadyExists) {
        toasts.error({
          text: "A submission for your contact information already exists and is pending a response." 
        });
        console.error("Form already submitted: ", submitErr);
      } else {
        toasts.error({ text: "There was an error submitting your form." });
        console.error("Error submitting form: ", submitErr);
      }

      isLoading = false;
      return;
    }

    clearForm();
    toasts.success("Form successfully submitted!");
    isLoading = false;
  }

  function clearForm() {
    name = "";
    email = "";
    message = "";
  }
</script>

<div class="px-4 lg:px-32">
  <h2 class="mb-6 text-2xl">Send us a message</h2>
  <form method="POST" on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="mb-4">
      <label for="name" class="form-label">Name</label>
      <input type="text" id="name" name="name" bind:value={name} required class="form-input">
    </div>

    <div class="mb-4">
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" name="email" bind:value={email} required class="form-input">
    </div>

    <div class="mb-4">
      <label for="message" class="form-label">Message</label>
      <textarea id="message" name="message" bind:value={message} required class="h-32 rounded-md resize-none form-textarea"></textarea>
    </div>

    {#if isLoading}
      <LocalSpinner />
    {:else}
      <button
        type="submit"
        class="w-[90%] mb-10 px-4 py-3 font-medium  
               bg-BrandLightBlue text-black rounded-md hover:bg-BrandGreen 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
               lg:w-full lg:max-w-md"
      >
        Send Message
      </button>
    {/if}
  </form>
</div>