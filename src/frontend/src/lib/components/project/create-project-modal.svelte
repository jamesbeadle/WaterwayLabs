<script lang="ts">
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import type { Snippet } from "svelte";
    import Modal from "../shared/modal.svelte";
    

    interface Props {
        onClose: () => void;
        title: string;
        visible: boolean;
    }
    let { onClose, title, visible} : Props = $props();
    let isSubmitDisabled = $state(true);
    let isLoading = $state(false);

    function createProject(){

    }
  </script>
  
  <Modal {onClose} {title} {visible} >
    
  <div class="flex items-center justify-start w-full">
    {#if isLoading}
      <LocalSpinner />
    {:else}
        <div class="flex-col w-full mb-2 space-y-4">\

            {#if !isSubmitDisabled}
                <div class="flex items-center">
                    <p class="text-orange-400">
                    Are you sure you want to create this project?
                    </p>
                </div>
                <div class="flex items-center">
                    <button
                    class={`${isSubmitDisabled ? "brand-button-disabled" : "brand-button"} px-4 py-2 w-full`}
                    onclick={createProject}
                    disabled={isSubmitDisabled}
                    >
                    Create Project
                    </button>
                </div>
            {/if}

        </div>
    {/if}
  </div>
</Modal>