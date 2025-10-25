<script lang="ts">
	import { onMount } from 'svelte';
	import FacilityWalpaper from '$lib/assets/imgs/walpapers/deltaruneArt.gif';
	import Tool from '$lib/components/Tools/Tool.svelte';

	// tadaa!!! sound
	import TADAAA from '$lib/assets/sounds/tada.wav';
	import TYPE from '$lib/assets/sounds/type.wav';
	import { BACKGROUND_CSS_VAL } from '$lib';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import BaseButton from '$lib/components/General/BaseButton.svelte';

	// the first tool!
	let textBoxValue = $state('');

	let tadaaAudioPlayerElement: HTMLAudioElement;
	let typeAudioPlayerElement: HTMLAudioElement;

	const jumpscareState = 'no bitches';
	const thefirey33Name: string[] = ['thefirey33', 'lazy programmer', jumpscareState];

	function playTypingSound() {
		if (typeAudioPlayerElement) {
			typeAudioPlayerElement.currentTime = 0;
			typeAudioPlayerElement.play();
		}
	}
	// this code is the general function for the first tool.
	// because of reasons, it works.
	let isFirey = $derived.by(() => {
		playTypingSound();

		let result = 'no';
		// if the value is equal to thefirey33, then le' hooray.
		thefirey33Name.forEach((elemt) => {
			if (textBoxValue.includes(elemt)) {
				tadaaAudioPlayerElement.currentTime = 0;
				tadaaAudioPlayerElement.play();
				result = 'yes';
				if (textBoxValue.includes(jumpscareState))
					setTimeout(() => {
						if (textBoxValue.includes(jumpscareState)) goto(resolve('/mystery'));
					}, 3000);
			}
		});
		return result;
	});

	// the second tool
	let response = $state('');
	let coolUsernameTextBox = $state('');
	let isSpamProtection = $state(false);
	let coolnessValue = $state(0);
	const leastCoolString = 'mehhhhhhhhhh';
	const mostCoolString = '[[BIG SHOT!]]';

	// this plays the typing sound
	$effect(() => {
		if (coolUsernameTextBox) playTypingSound();
	});

	let howCoolItIs = $derived.by(() => {
		if (typeAudioPlayerElement) {
			typeAudioPlayerElement.currentTime = 0;
			typeAudioPlayerElement.play();
		}
		let generatedString = '';
		for (let i = 0; i < mostCoolString.length; i++) {
			if ((Math.random() % 10) + coolnessValue / 10 > 1) {
				generatedString += mostCoolString.charAt(i);
			} else {
				generatedString += leastCoolString.charAt(i);
			}
		}
		return generatedString;
	});

	onMount(() => {
		// when this component is mounted to DOM,
		// we get the original background image.
		// then store it, then use it later when the component is unmounted from dom
		const baseStyle = document.documentElement.style;
		const originalStyle = baseStyle.getPropertyValue(BACKGROUND_CSS_VAL);
		baseStyle.setProperty(BACKGROUND_CSS_VAL, `url('${FacilityWalpaper}')`);

		return () => {
			baseStyle.setProperty(BACKGROUND_CSS_VAL, `${originalStyle}`);
		};
	});
</script>

<span class="block gap-2">
	<h1 class="text-center text-2xl bg-yellow-500 text-black shadow-[2px]">
		stuff here is made out of pure boredom and <strong>despair.</strong>
	</h1>
	<!-- this is the thefirey33 detector tool. -->
	<Tool toolName="thefirey33 detector.">
		<div class="flex flex-col items-center">
			<input type="text" class="bg-black outline-2 border-0 rounded-md" bind:value={textBoxValue} />
			<h1 class={isFirey == 'yes' ? 'text-3xl flash-text' : 'text-xs'}>{isFirey}</h1>
			<audio src={TADAAA} bind:this={tadaaAudioPlayerElement}></audio>
			<audio src={TYPE} bind:this={typeAudioPlayerElement} volume={0.1}></audio>
		</div>
	</Tool>

	<!-- this is the cool username maker tool. -->
	<Tool toolName="cool username maker 2000">
		<div class="grid gap-5 items-center">
			<label for="coolness-factor">Coolness Factor: {howCoolItIs}</label>
			<input
				bind:value={coolnessValue}
				class="cursor-ew-resize"
				id="coolness-factor"
				type="range"
				min="0"
				max="10"
			/>
			<input
				bind:value={coolUsernameTextBox}
				type="text"
				class="bg-black outline-2 border-0 rounded-md"
			/>
			<BaseButton
				onclick={() => {
					// cool response maker
					response = 'please wait...';
					fetch('/api/generateCoolUsername/', {
						method: 'POST',
						body: JSON.stringify({ coolnessFactor: coolnessValue, username: coolUsernameTextBox }),
						headers: {
							'Content-Type': 'application/json'
						}
					})
						.then((r) => r.json())
						.then((text) => {
							response = text.response;
							// lazy ahh spam protection
							isSpamProtection = true;

							// wait for a second
							setTimeout(() => {
								isSpamProtection = false;
							}, 2000);
						});
				}}
				enabled={!isSpamProtection}
				>{isSpamProtection ? 'WAIT, NO SPAMMING!!' : 'Generate'}</BaseButton
			>
			<p>{response}</p>
		</div>
	</Tool>
</span>
