<script lang="ts">
	import CharaBackgroundMusic from '$lib/assets/jumpscareAssets/mus_zzz_c.ogg';
	import CharaJumpscare from '$lib/assets/jumpscareAssets/mus_zzz_c2.ogg';

	import CharaNormal from '$lib/assets/jumpscareAssets/chara_normal.png';
	import CharaJumpscareImage from '$lib/assets/jumpscareAssets/chara_jumpscare.gif';
	import CharaSuprisedImage from '$lib/assets/jumpscareAssets/chara_surprised.png';
	import { onMount } from 'svelte';
	import { BACKGROUND_CSS_VAL } from '$lib';

	let scawyMusicPlayer: HTMLAudioElement;

	let charaJumpscarePlayer: HTMLAudioElement;

	let charaHandler: HTMLImageElement;

	let charaSpeech = $state('');

	let epilepsyWarning = $state(false);

	let charaAttributes = $state({
		scale: 1,
		x: 0,
		y: 0
	});

	let allDialog = [
		'Greetings.',
		'I am Chara.',
		'You really like laughing. I can see that.',
		'And with this control, you triggered the detector.',
		'Well...',
		"Here's something that may trigger something, too."
	];

	let isCharaActive = $state(false);

	/**
	 * Store this blob elsewhere for the REALLL jumpscare
	 */
	let charaJumpscareImage: Blob;

	/**
	 * Store this blob elsewhere for the REALLL jumpscare
	 */
	let charaSurprisedImage: Blob;

	/**
	 * The current index of the dialog.
	 */
	let dialogIndex = 0;

	/**
	 * The delay of the current dialog.
	 */
	const dialogDelay = 100;

	/**
	 * The current width of the dialog we are doing.
	 */
	let currentStringWidth = 0;

	/**
	 * base image fetcher, to avoid latency issues.
	 * @param fetchingLink the link to fetch at
	 */
	async function fetchThisImage(fetchingLink: string) {
		let blobCurrent: Blob = new Blob();
		await fetch(fetchingLink, {
			method: 'GET'
		})
			.then((r) => r.blob())
			.then((r) => {
				blobCurrent = r;
			})
			.catch(() => {
				throw 404;
			});
		return blobCurrent;
	}

	function goThroughDialog() {
		if (dialogIndex > allDialog.length || dialogIndex < 0) throw 'out of range';
		const currentDialog = allDialog[dialogIndex];
		// Check for other states...
		if (dialogIndex == allDialog.length - 1) {
			epilepsyWarning = true;
			scawyMusicPlayer.pause();
			// Check if the handler is there.
			if (charaHandler) charaHandler.src = URL.createObjectURL(charaSurprisedImage);
		}
		if (dialogIndex >= allDialog.length) {
			epilepsyWarning = false;
			charaJumpscarePlayer.play();
			charaSpeech = '';
			document.documentElement.style.setProperty('--current-background-animation', 'scare');
			charaHandler.src = URL.createObjectURL(charaJumpscareImage);
			// Start scaling chara like a madman.
			setInterval(() => {
				charaAttributes.scale += 0.005;
				const fxScale = charaAttributes.scale * 2;
				charaAttributes.x = Math.random() * fxScale;
				charaAttributes.y = Math.random() * fxScale;
			}, 1);
		}

		// If the dialog finishes, then it finishes.
		if (currentDialog === undefined) return;
		for (let i = 0; i < currentDialog.length; i++) {
			setTimeout(
				() => {
					currentStringWidth++;
					charaSpeech = currentDialog.substring(
						0,
						Math.min(currentStringWidth, currentDialog.length)
					);
					// If the dialog is finished, then do this.
					if (currentStringWidth == currentDialog.length) {
						// Go through each dialog one by one.
						setTimeout(() => {
							currentStringWidth = 0;
							dialogIndex++;
							goThroughDialog();
						}, dialogDelay * 10);
					}
				},
				(i + 1) * dialogDelay
			);
		}
	}
	onMount(() => {
		// set the title and start playing the music.
		document.title = '???';
		// set the background as null, so it looks scarier.
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, 'none');
		fetchThisImage(CharaNormal).then((r) => {
			isCharaActive = true;
			setTimeout(() => {
				charaHandler.src = URL.createObjectURL(r);
				scawyMusicPlayer.play();
				setTimeout(() => {
					goThroughDialog();
				}, 1000);
			}, 1000);
		});
		// fetch the jumpscare image and store it somewhere.
		fetchThisImage(CharaJumpscareImage).then((r) => (charaJumpscareImage = r));
		fetchThisImage(CharaSuprisedImage).then((r) => (charaSurprisedImage = r));

		charaJumpscarePlayer.addEventListener('ended', () => {
			window.location.href = 'about:blank';
		});
	});
</script>

<audio src={CharaBackgroundMusic} bind:this={scawyMusicPlayer} loop></audio>
<audio src={CharaJumpscare} bind:this={charaJumpscarePlayer}></audio>
{#if epilepsyWarning}
	<h1 class="text-center">epilepsy warning!!!</h1>
{/if}
<div class={!isCharaActive ? 'hidden' : ''}>
	<img
		alt=""
		bind:this={charaHandler}
		class="absolute m-auto left-0 top-0 right-0 bottom-0 image-rendering-pixelated select-none"
		style={`scale: ${charaAttributes.scale}; transform: translate(${charaAttributes.x}px, ${charaAttributes.y}px)`}
		draggable={false}
	/>
	<p class="text-center absolute w-full bottom-50 text-2xl block select-none font-[Cool_Font]">
		{charaSpeech}
	</p>
</div>
