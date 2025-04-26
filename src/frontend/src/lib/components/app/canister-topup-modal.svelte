<script lang="ts">
    import { onDestroy, type Snippet } from "svelte";

    interface Props {
      showModal: boolean;
      onClose: () => void;
      children: Snippet
    }

    let { showModal, onClose, children } : Props = $props();
  
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        onClose();
      }
    };
  
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeydown);
    }
  
    onDestroy(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeydown);
      }
    });
  
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  </script>
  
  {#if showModal}
    <div
      class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
      aria-hidden="true"
      onclick={handleBackdropClick}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-auto relative text-black"
        role="dialog"
        aria-modal="true"
      >
        <button
          onclick={onClose}
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ×
        </button>
        {@render children()}
      </div>
    </div>
  {/if}
  