<script lang="ts">
	import ClickSound from '$lib/assets/sounds/confirm.wav';
	import { BASE_CSS_FOR_BUTTON, birthdayTime, tooltip, websitePosition } from '$lib';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	const MAXIMUM_SCALE = 10.0;

	let { linkTowards, children, disabled = false, important = false } = $props();
	let computerClickSound: HTMLAudioElement;
	let isCurrentlyClicked = $derived(page.url.pathname == linkTowards);
	let isSlower = $derived(important ? 0.5 : 1);
	let scale = $state(1.0);
	let isAnimationDone = true;

	onMount(() => {
		computerClickSound.preservesPitch = false;
	});
	function superCoolScaleFrame(callback: number) {
		scale += 0.1;
		isAnimationDone = false;
		function returnCoolRandom() {
			return Math.random() * (MAXIMUM_SCALE - scale) * 2;
		}
		// shake the whole website, for the cool effect
		$websitePosition = { x: returnCoolRandom(), y: returnCoolRandom() };
		document.documentElement.style.setProperty('--background-x', `${$websitePosition.x}px`);
		document.documentElement.style.setProperty('--background-y', `${$websitePosition.y}px`);
		// more lgoic
		if (scale < MAXIMUM_SCALE) requestAnimationFrame(superCoolScaleFrame);
		else {
			isAnimationDone = true;
			scale = 1.0;
		}
	}
	function onClicked() {
		// important buttons get this i guess
		scale = 1.0;
		if (isAnimationDone) requestAnimationFrame(superCoolScaleFrame);
	}
</script>

<!-- cool link button -->
<a
	href={resolve(linkTowards)}
	onmouseenter={() => tooltip.set('D:' + linkTowards)}
	onmouseleave={() => tooltip.set('')}
	onclick={() => {
		computerClickSound.currentTime = 0;
		computerClickSound.play();
		$tooltip = '';
		if (important) onClicked();
	}}
	draggable="false"
	style="scale: {isCurrentlyClicked ? 1.3 : 1};"
	class={`${BASE_CSS_FOR_BUTTON} bg-black ${important ? 'important-event' : ''} w-fit ${disabled ? 'pointer-events-none outline-red-500 text-red-500' : 'pointer-events-auto'}`}
>
	{#if important}
		<div class="fixed z-30" style="scale: {scale}; opacity: {1.0 - scale / MAXIMUM_SCALE};">
			{@render children()}
		</div>
	{/if}
	{@render children()}
	<audio src={ClickSound} bind:this={computerClickSound} volume="0.4" bind:playbackRate={isSlower}
	></audio>
</a>
