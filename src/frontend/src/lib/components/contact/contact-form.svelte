<script lang="ts">
  import ContactButton from "./contact-button.svelte";

    let name = "";
    let email = "";
    let message = "";
    let formStatus = "";
  
    function handleSubmit() {
      formStatus = "Sending...";
    }
  </script>
  
  <div class="px-4 lg:px-32">
    <h2 class="mb-6 text-2xl font-med font-mona">Send us a message</h2>
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
  
      <ContactButton type="submit"/>
  
      {#if formStatus}
        <p class="mt-6 text-lg font-medium font-inter" class:text-green-400={formStatus.includes("success")} class:text-red-400={formStatus.includes("Failed")}>
          {formStatus}
        </p>
      {/if}
    </form>
  </div>
