<script lang="ts">
	let { children, className = '', onclick = () => {}, enabled = true } = $props();
	import ClickSound from '$lib/assets/sounds/confirm.wav';
	let computerClickSound: HTMLAudioElement;
	let buttonElement: HTMLButtonElement;
</script>

<button
	bind:this={buttonElement}
	disabled={!enabled}
	onclick={() => {
		computerClickSound.currentTime = 0;
		computerClickSound.play();
		onclick();
		buttonElement.blur();
	}}
	class={`${enabled ? 'text-white' : 'text-gray-700'} bg-black md:text-xl text-xs outline-2 m-2 p-2 rounded-md ${enabled ? 'cursor-pointer' : 'cursor-not-allowed'} duration-75 focus:bg-white hover:scale-110 hover:rounded-2xl transition-all ${className}`}
>
	{@render children()}
	<audio src={ClickSound} bind:this={computerClickSound} volume={0.4}></audio>
</button>
