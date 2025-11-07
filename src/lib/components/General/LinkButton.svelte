<script lang="ts">
	import ClickSound from '$lib/assets/sounds/confirm.wav';
	import { BASE_CSS_FOR_BUTTON, tooltip } from '$lib';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { linkTowards, children, disabled = false } = $props();
	let computerClickSound: HTMLAudioElement;
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
	}}
	draggable="false"
	style="scale: {page.url.pathname == linkTowards ? 1.3 : 1};"
	class={`${BASE_CSS_FOR_BUTTON} w-fit ${disabled ? 'pointer-events-none outline-red-500 text-red-500' : 'pointer-events-auto'}`}
>
	{@render children()}
	<audio src={ClickSound} bind:this={computerClickSound} volume="0.4"></audio>
</a>
