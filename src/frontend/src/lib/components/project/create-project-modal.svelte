<script lang="ts">
    import LocalSpinner from "../shared/local-spinner.svelte";
    import Modal from "../shared/modal.svelte";
  
    interface Props {
      onClose: () => void;
      title: string;
    }
  
    let { onClose, title }: Props = $props();
    let isSubmitDisabled = $state(true);
    let isLoading = $state(false);
  
    function createProject() {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        onClose();
      }, 2000);
    }
  </script>
  
  <Modal {onClose} {title}>
    <div class="flex flex-col items-center justify-start w-full space-y-4">
      {#if isLoading}
        <LocalSpinner />
      {:else}
        <div class="flex flex-col w-full space-y-4">
          {#if !isSubmitDisabled}
            <p class="text-orange-400 text-lg">
              Are you sure you want to create this project?
            </p>
            <button
              class="{isSubmitDisabled
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg w-full transition-colors"
              onclick={createProject}
              disabled={isSubmitDisabled}
            >
              Create Project
            </button>
          {:else}
            <p class="text-gray-300">Please fill out the form to enable project creation.</p>
            <!-- Add form fields here if needed -->
          {/if}
        </div>
      {/if}
    </div>
  </Modal>