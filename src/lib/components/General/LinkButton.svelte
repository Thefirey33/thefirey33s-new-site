<script lang="ts">
	import ClickSound from '$lib/assets/sounds/confirm.wav';
	import { BASE_CSS_FOR_BUTTON } from '$lib';
	import { resolve } from '$app/paths';

	let { linkTowards, children, disabled = false } = $props();
	let computerClickSound: HTMLAudioElement;
</script>

<!-- cool link button -->
<a
	href={resolve(linkTowards)}
	onclick={() => {
		computerClickSound.currentTime = 0;
		computerClickSound.play();
	}}
	draggable="false"
	class={`${BASE_CSS_FOR_BUTTON} ${disabled ? 'pointer-events-none outline-red-500 text-red-500' : 'pointer-events-auto'}`}
>
	{@render children()}
	<audio src={ClickSound} bind:this={computerClickSound} volume="0.4"></audio>
</a>
