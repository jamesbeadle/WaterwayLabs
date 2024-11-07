<script lang="ts">
    let name = "";
    let email = "";
    let message = "";
    let formStatus = "";
  
    function handleSubmit() {
      formStatus = "Sending...";
    }
  </script>
  
  <div class="form-wrapper">
    <h2 class="form-heading">Send us a message</h2>
    <form method="POST" on:submit|preventDefault={handleSubmit} class="form-container">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" name="name" bind:value={name} required class="form-input">
      </div>
  
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" name="email" bind:value={email} required class="form-input">
      </div>
  
      <div class="form-group">
        <label for="message" class="form-label">Message</label>
        <textarea id="message" name="message" bind:value={message} required class="form-textarea"></textarea>
      </div>
  
      <button type="submit" class="form-button">
        Send Message
      </button>
  
      {#if formStatus}
        <p class="form-status" class:text-green-400={formStatus.includes("success")} class:text-red-400={formStatus.includes("Failed")}>
          {formStatus}
        </p>
      {/if}
    </form>
  </div>
  
  <style>
    .form-wrapper {
      @apply px-4 lg:px-32; 
    }
  
    .form-heading {
      @apply mb-6 text-2xl font-med font-mona;
    }
  
    .form-container {
      @apply space-y-6;
    }
  
    .form-group {
      @apply mb-4;
    }
  
    .form-label {
      @apply block mb-2 text-sm font-medium text-gray-300;
    }
  
    .form-input, .form-textarea {
      @apply w-[90%] p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter 
             focus:ring-2 focus:ring-blue-500 focus:outline-none 
             lg:w-full lg:max-w-md; 
    }
  
    .form-textarea {
      @apply resize-none h-32;
    }
  
    .form-button {
      @apply w-[90%] mb-10 px-4 py-3 font-medium text-white transition duration-150 
             ease-in-out bg-blue-600 rounded-md font-inter hover:bg-blue-700 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
             lg:w-full lg:max-w-md; 
    }
  
    .form-status {
      @apply mt-6 text-lg font-medium font-inter;
    }
</style>