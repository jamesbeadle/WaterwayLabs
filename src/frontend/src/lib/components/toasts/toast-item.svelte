<script lang="ts">
	import { onMount } from 'svelte';
	import { toasts } from '$lib/stores/toasts-store';
	import type { Toast } from '$lib/stores/toasts-store';
    import { appStore } from '$lib/stores/app-store';
    import ArrowIcon from '$lib/icons/ArrowIcon.svelte';

	interface Props {
		toast: Toast;
    };
    
    let { toast } : Props = $props();

	let timer: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		if (toast.duration && toast.duration > 0) {
			timer = setTimeout(closeToast, toast.duration);
		}
	});

	function closeToast() {
		toasts.removeToast(toast.id);
	}

	function updateFrontend(){
		appStore.updateFrontend();
	}
</script>

<div class={`fixed top-0 left-0 right-0 z-[9999] p-4 text-black shadow-md flex justify-between items-center bg-${toast.type}`}>
  <span>{toast.message}</span>
  {#if toast.type == "frontend-update"}
	<button 
		class="p-1 transition-colors border border-white rounded-full group hover:bg-white hover:text-black flex flex-row items-center" 
		onclick={updateFrontend}>
		
		<span class="flex-1 text-xs semi-bold tracking-wide text-center lg:px-4">UPDATE SITE</span>
		<span class="w-8 h-8 flex items-center justify-center">
		  <ArrowIcon fill='#272727' className="w-8 h-8" />
		</span>
	</button>
  {/if}
  <button class="font-bold ml-4" onclick={closeToast}>
    &times;
  </button>
</div>
