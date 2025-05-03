<script lang="ts">
  import { isError } from "$lib/utils/helpers";
  import LocalSpinner from "../shared/global/local-spinner.svelte";
  import { toasts } from '$lib/stores/toasts-store';
    import type { CreateSupportQuery } from "../../../../../declarations/backend/backend.did";
    import { supportStore } from "$lib/stores/support-store";


  let isLoading = $state(false);
  let name = $state("");
  let email = $state("");
  let message = $state("");

  async function createSupportQuery() {
    isLoading = true;
    const dto: CreateSupportQuery = {
      contact: email,
      name,
      message,
    };

    const result = await supportStore.createSupportQuery(dto);
    const submitError = isError(result);

    if (submitError) {
      const submitErr = result.err;
      const alreadyExists = Object.keys(submitErr)[0] == "AlreadyExists";

      if (alreadyExists) {
        toasts.addToast({
          message: "A submission for your contact information already exists and is pending a response.",
          type: 'error'
        });
        console.error("Form already submitted: ", submitErr);
      } else {
        toasts.addToast({ message: "There was an error submitting your form.", type: 'error' });
        console.error("Error submitting form: ", submitErr);
      }

      isLoading = false;
      return;
    }

    clearForm();
    toasts.addToast({message: "Form successfully submitted!", type: 'success'} );
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
</div>