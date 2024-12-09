<script lang="ts">
	import { isNullish } from '@dfinity/utils';
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import CloseToast from '$lib/icons/CloseToast.svelte';
	import { toasts } from '$lib/stores/toasts-store';
	import type { ToastLevel, ToastMsg } from '$lib/types/toast';

	interface Props {
		msg: ToastMsg;
	}

	let { msg }: Props = $props();

	const close = () => toasts.hide();

	let text: string = $derived(msg.text);
	let level: ToastLevel = $derived(msg.level);
	let detail: string | undefined = $derived(msg.detail);

	let timer: number | undefined;

	onMount(() => {
		const { duration } = msg;

		if (!duration || duration <= 0) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore NodeJS.timeout vs number
		timer = setTimeout(close, duration);
	});

	onDestroy(() => clearTimeout(timer));

	let reorgDetail: string | undefined = $state(undefined);
	$effect(() => {
		if (isNullish(detail)) {
			reorgDetail = undefined;
			return;
		}

		const trapKeywords = 'trapped explicitly:' as const;

		if (!detail.includes(trapKeywords)) {
			reorgDetail = detail;
			return;
		}

		const splits = detail.split(trapKeywords);
		const last = splits.splice(-1);
		reorgDetail = `${last[0]?.trim() ?? ''}${
			splits.length > 0 ? ` | Stacktrace: ${splits.join('').trim()}` : ''
		}`;
	});

    let toastClasses = $state('');
	$effect(() => {
		if (level === 'error') {
			toastClasses = 'bg-BrandDeclineRed text-white';
		} else if (level === 'warn') {
			toastClasses = 'bg-BrandYellow text-black';
		} else if (level === 'info') {
			toastClasses = 'bg-BrandSuccess text-white';
		} else {
			toastClasses = 'bg-BrandGray text-white';
		}
	});
</script>

<div
	role="dialog"
	class={`fixed top-0 left-0 w-full flex justify-between items-center py-2 px-8 z-50 ${toastClasses}`}
	in:fly={{ y: 100, duration: 200 }}
	out:fade={{ delay: 100 }}
>
	<div class="overflow-y-auto leading-normal max-h-12">
		<p title={text} class="m-0">
			{text}{reorgDetail ? ` | ${reorgDetail}` : ''}
		</p>
	</div>

	<button class="ml-4" onclick={close} aria-label="Close">
		<CloseToast />
	</button>
</div>
