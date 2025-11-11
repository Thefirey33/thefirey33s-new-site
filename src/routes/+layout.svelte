<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import TopTitleBar from '$lib/components/Titlebar/TopTitleBar.svelte';
	import { page } from '$app/state';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { tooltip } from '$lib';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import LoadingPleaseWaitOneHundredPercent from '$lib/assets/sounds/loading.wav';
	// the children...
	let { children } = $props();
	const mysteryActive = $derived(page.route.id?.includes('mystery'));
	// easter egg with a chance.
	const showTurkiye = $derived(Math.random() < 0.1);
	let isLoading = $state(false);

	beforeNavigate(() => (isLoading = false));
	afterNavigate(() => (isLoading = true));

	// Inject the vercel speed insight system.
	injectSpeedInsights();

	let mouseLocation = $state({ x: 0, y: 0 });

	onMount(() => {
		document.addEventListener('mousemove', (event) => {
			mouseLocation = { x: event.clientX, y: event.clientY };
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>thefirey33</title>
	<meta property="description" content="Thefirey33's Personal Site" />
	<meta property="title" content="thefirey33's site" />
	<meta property="charset" content="utf-8" />
</svelte:head>

{#if !isLoading}
	<div class="bg-black w-screen h-screen left-0 top-0 fixed z-20 flex">
		<p class="text-white text-center m-auto">loading please wait, 100%</p>
		<audio src={LoadingPleaseWaitOneHundredPercent} autoplay></audio>
	</div>
{/if}
{#if !mysteryActive}
	<TopTitleBar {showTurkiye} />
{/if}
<span
	class="fixed left-0 top-8 bottom-0 right-0"
	style="transform: translate({mouseLocation.x}px, {mouseLocation.y}px);"
>
	<h1
		style="scale: {$tooltip !== '' ? 1 : 0}; "
		class="scroll-m-0 w-max h-max bg-black ring-2 rounded-md z-50 transition duration-150 origin-top-left"
	>
		{$tooltip}
	</h1>
</span>
<!-- the top titlebar that loads practically everywhere -->
<div class={!mysteryActive ? 'md:ml-0 ml-(--max-titlebar) pt-30 md:pt-0' : ''}>
	{@render children?.()}
</div>
<!-- the tooltip -->
