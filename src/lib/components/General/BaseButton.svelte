<script lang="ts">
	let { children, className = '', onclick = () => {}, enabled = true } = $props();
	import ClickSound from '$lib/assets/sounds/confirm.wav';
	import BuzzerSound from '$lib/assets/sounds/buzzer.wav';
	let computerClickSound: HTMLAudioElement;
	let buttonElement: HTMLButtonElement;
	let buzzerAudioSource: HTMLAudioElement;
</script>

<button
	bind:this={buttonElement}
	onclick={() => {
		if (!enabled) {
			buzzerAudioSource.currentTime = 0;
			buzzerAudioSource.play();
			return;
		}
		computerClickSound.currentTime = 0;
		computerClickSound.play().then(() => {
			onclick();
		});
		buttonElement.blur();
	}}
	class={`${enabled ? 'text-white' : 'text-red-500'} bg-black md:text-xl text-xs outline-2 m-2 p-2 <select-none></select-none> rounded-md ${enabled ? 'cursor-pointer' : 'cursor-not-allowed'} duration-75 focus:bg-white hover:scale-110 hover:rounded-2xl transition-all ${className}`}
>
	{@render children()}
	<audio src={ClickSound} bind:this={computerClickSound} volume={0.4}></audio>
	<audio src={BuzzerSound} bind:this={buzzerAudioSource} volume={0.8}></audio>
</button>
