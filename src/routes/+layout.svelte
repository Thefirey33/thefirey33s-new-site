<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import TopTitleBar from '$lib/components/Titlebar/TopTitleBar.svelte';
	import LoadingPleaseWaitOneHundredPercent from '$lib/assets/sounds/loading.wav';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	// the children...
	let { children } = $props();
	let isCurrentlyLoading = $state(true);
	const mysteryActive = $derived(page.route.id?.includes('mystery'));
	// easter egg with a chance.
	const showTurkiye = $derived(Math.random() < 0.1);

	// Check if we are currently navigating, or loading something.
	beforeNavigate(() => (isCurrentlyLoading = true));
	afterNavigate(() => (isCurrentlyLoading = false));

	// If the DOM successfully mounts, then the loading has finished.
	onMount(() => {
		window.addEventListener('load', () => {
			isCurrentlyLoading = false;
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

{#if isCurrentlyLoading}
	<!-- LOADING PLEASE WAIT, 100% -->
	<!-- DougDoug moment -->
	<div class=" bg-black w-full h-screen top-0 left-0 z-5 flex flex-col fixed">
		<span class="text-center m-auto">
			<h1 class="md:text-2xl">Loading Please Wait.... 100%</h1>
			<audio src={LoadingPleaseWaitOneHundredPercent} autoplay></audio>
		</span>
	</div>
{/if}

{#if !mysteryActive}
	<TopTitleBar {showTurkiye} />
{/if}
<!-- the top titlebar that loads practically everywhere -->
<div class={!mysteryActive ? 'md:ml-0 ml-(--max-titlebar) md:pt-40' : ''}>
	{@render children?.()}
</div>
