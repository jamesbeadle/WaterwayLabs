<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fade, scale } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';
 
  interface ModalOptions {
    selector?: string;
    backdropClass?: string;
    onClickOutside?: (event: MouseEvent) => void;
    onEscape?: (event: KeyboardEvent) => void;
  }

  function modal(node: HTMLElement, options?: ModalOptions) {
    const { selector, backdropClass, onClickOutside, onEscape } = options || {};

    const onClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) onClickOutside?.(e);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape?.(e);
    };

    let modalParent: HTMLElement;
    if (selector) {
      const query = document.querySelector(selector);
      if (query) modalParent = query as HTMLElement;
      else throw new Error(`No existing node that matches selector "${selector}"`);
    } else {
      modalParent = document.body;
    }

    const backdrop = document.createElement('div');
    // Split backdropClass into individual classes
    if (backdropClass) {
      const classes = backdropClass.split(' ').filter(Boolean);
      backdrop.classList.add(...classes);
    }
    if (onClickOutside) backdrop.addEventListener('click', onClick);
    if (onEscape) window.addEventListener('keydown', onKeyDown);

    backdrop.append(node);
    modalParent.append(backdrop);

    // Focus trapping
    const focusableElements = node.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    node.addEventListener('keydown', trapFocus);
    firstFocusable?.focus();

    return {
      destroy() {
        backdrop.remove();
        window.removeEventListener('keydown', onKeyDown);
        node.removeEventListener('keydown', trapFocus);
      }
    };
  }

  interface Props {
    onClose: () => void;
    title: string;
    children: Snippet;
  }

  let { children, onClose, title }: Props = $props();
  let visible = $state(true);

  const close = () => {
    visible = false;
    onClose();
  };

  const onCloseHandler = (event: MouseEvent) => {
    event.stopPropagation();
    close();
  };

  const onEscapeHandler = (event: KeyboardEvent) => {
    close();
  };

  onMount(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

{#if visible}
  <div
    class="modal-background"
    use:modal={{
      backdropClass: 'fixed inset-0 bg-black bg-opacity-50 cursor-pointer z-40',
      onClickOutside: onCloseHandler,
      onEscape: onEscapeHandler
    }}
    out:fade={{ duration: 200 }}
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalContent"
    tabindex="-1"
  >
    <div
      transition:scale={{ delay: 25, duration: 150, easing: quintOut }}
      class="relative w-full max-w-4xl mx-auto p-4 sm:p-6 z-50"
    >
      <div
        class="bg-gray-800 border border-gray-600 rounded-lg h-[80vh] shadow-2xl flex flex-col"
      >
        <div class="flex-none px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-600">
          <div class="flex items-center justify-between">
            <h3 id="modalTitle" class="text-2xl text-white md:text-3xl font-semibold">{title}</h3>
            <button
              onclick={close}
              class="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-6 h-6" fill="white" />
            </button>
          </div>
        </div>
        <div id="modalContent" class="flex-1 px-6 py-6 overflow-y-auto sm:px-8 sm:py-6">
          {@render children()}
        </div>
      </div>
    </div>
  </div>
{/if}