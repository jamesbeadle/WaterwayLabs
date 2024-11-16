<script lang="ts">
    import { contactStore } from "$lib/stores/contact-store";
    import { isError } from "$lib/utils/helpers";
    import type { SubmitContactFormDTO } from "../../../../../declarations/backend/backend.did";
    import LocalSpinner from "../shared/local-spinner.svelte";

    let isLoading = false;
    let alreadyExists = false;
    let success = false;
    let unknownError = false;
    let name = "";
    let email = "";
    let message = "";
  
    async function handleSubmit() {
      alreadyExists = false;
      success = false;
      unknownError = false;

      isLoading = true;
      let dto: SubmitContactFormDTO = {
        contact: email,
        name,
        message
      };
      let result = await contactStore.submitContactForm(dto);
      let submitError = isError(result);

      if(submitError){
        let submitError = result.err;
        alreadyExists = Object.keys(submitError)[0] == "AlreadyExists";
        unknownError = !alreadyExists;
        isLoading = false;
        return;
      }

      clearForm();
      success = true;
      isLoading = false;
    }

    function clearForm(){
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
              bg-WaterwayLightBlue text-black rounded-md hover:bg-WaterwayGreen 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              lg:w-full lg:max-w-md"
        >
        Send Message
        </button>
      {/if}
  
      {#if alreadyExists}
        <p class="mt-6 text-lg font-medium text-red-400">
          A submission for your contact information is outstanding and we will reply to you as soon as possible.
        </p>
      {/if}

      {#if unknownError}
        <p class="mt-6 text-lg font-medium text-red-400">
          There was an error submitting your form.
        </p>
      {/if}
  
      {#if success}
        <p class="mt-6 text-lg font-medium text-green-400">
          Form Successfully submitted.
        </p>
      {/if}
    </form>
  </div>
