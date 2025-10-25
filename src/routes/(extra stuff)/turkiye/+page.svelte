<script lang="ts">
	import turkisEnginer from '$lib/assets/imgs/engineer-tf2.gif';
	import powerOfTurk from '$lib/assets/sounds/powerOfTurk.mp3';
	import { onMount } from 'svelte';

	const baseCSS = 'text-white z-20 text-6xl text-center select-none text-stroke-2';
	let isActive = $state(false);

	onMount(() => {
		const intervalVal = setInterval(() => {
			isActive = !isActive;
		}, 100);

		return () => {
			clearInterval(intervalVal);
		};
	});
</script>

<img
	src={turkisEnginer}
	fetchpriority="high"
	class="-z-1 fixed w-full h-screen top-0 left-0 select-none"
	alt="turkish engineer."
	draggable="false"
/>
{#if isActive}
	<h1 class={baseCSS}>THIS SHIT MADE IN <strong>TÜRKİYE</strong> DAWG</h1>
{/if}
<audio src={powerOfTurk} autoplay></audio>
