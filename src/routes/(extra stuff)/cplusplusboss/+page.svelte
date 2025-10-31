<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	import { GameEngine, GameEngineDrawing, saveState, Vector2 } from '$lib/gameEngine';
	import {
		achievementGet,
		BACKGROUND_CSS_VAL,
		getCurrentState,
		isDead,
		websiteIconURL
	} from '$lib';
	import BaseButton from '$lib/components/General/BaseButton.svelte';
	import BarrensWallpaper from '$lib/assets/imgs/walpapers/barrens.png';
	import NikoWallpaper from '$lib/assets/imgs/walpapers/niko_factory.png';
	import Achievement from '$lib/components/General/Achievement.svelte';
	import WebsiteGuy from '$lib/assets/imgs/website_guy.gif';

	let HTMLCanvas: HTMLCanvasElement;

	// difficulty slider stuff
	let diff = $state(0.0);
	$effect(() => {
		GameEngine.punishment_factor = diff;
	});

	// difficulty comments
	const diffComments: string[] = [
		'easy',
		'hard',
		'aw hell nah',
		'impossible',
		'you serious lil bro?'
	];

	let isGameRunning = $state(false);
	onMount(() => {
		// Set the wallpaper, please.
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${NikoWallpaper})`);
		// Check if the user has achieved said thing.
		$achievementGet = getCurrentState();
		let canvasRenderContext = HTMLCanvas.getContext('2d');
		if (!canvasRenderContext) {
			alert('Your browser does not support canvas rendering!');
			goto(resolve('/'));
		}

		// After the first check is done, then register the canvasContext.
		GameEngine.CanvasContext = canvasRenderContext;
		GameEngine.STOP_ENGINE = false;
		const fontSize = 20;
		const fontMeasurements = GameEngineDrawing.GetFontMeasurements(fontSize, 'Click to play!');
		if (!fontMeasurements) {
			alert('Font drawing failure! Resetting..');
			goto(resolve('/'));
			return;
		}

		// draw the first screen instance.
		GameEngine.CanvasContext?.fillRect(0, 0, HTMLCanvas.width, HTMLCanvas.height);
		GameEngineDrawing.DrawText(
			new Vector2(
				HTMLCanvas.width / 2 - fontMeasurements.width / 2,
				HTMLCanvas.height / 2 - fontSize
			),
			fontSize,
			'Click to play!'
		);

		if (isGameRunning) return;
		HTMLCanvas.style.cursor = 'pointer';
		HTMLCanvas.addEventListener('click', () => {
			if (GameEngine.ENGINE_RUNNING) return;
			GameEngine.GameEngineInit();
			HTMLCanvas.style.cursor = 'default';
			GameEngine.ENGINE_RUNNING = true;
			isGameRunning = true;
			requestAnimationFrame(GameEngine.GameEngineRender);
		});
		return () => {
			saveState();
			$websiteIconURL = WebsiteGuy;
			GameEngine.ENGINE_RUNNING = false;
			GameEngine.STOP_ENGINE = true;
			GameEngine.Dismount();
			document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${BarrensWallpaper})`);
		};
	});
</script>

<div class="w-full h-full flex xl:flex-row flex-col p-5 items-center">
	<canvas
		bind:this={HTMLCanvas}
		class="cplusplusbackground rounded-xl ring-2 md:w-3xl w-md"
		width="800"
		height="600"
	></canvas>
	<div class="flex flex-col w-full p-5">
		<BaseButton
			onclick={() => {
				GameEngine.Dismount();
				GameEngine.GameEngineInit();
				$isDead = false;
			}}
			enabled={$isDead}>restart</BaseButton
		>
		<label for="punishment_factor"
			>punishment factor: {diffComments[
				Math.floor((diff / 2.0) * (diffComments.length - 1))
			]}</label
		>
		<input
			type="range"
			name="punishment_factor"
			class="m-5"
			id="punishment_factor"
			min="0.0"
			max="2.0"
			step="0.1"
			bind:value={diff}
		/>
		<div class="bg-black w-full h-fit rounded-md ring-2 p-3">
			<h1 class="text-center text-2xl">Instruction:</h1>
			<ul class="list-disc ml-5">
				<li>WASD to move around.</li>
				<li>X to move faster.</li>
				<li>Use the 'reset' button to reset. Tragic, i know.</li>
			</ul>
			<h1 class="text-center text-2xl">Achievements:</h1>
			<Achievement achieved={$achievementGet}>Finished this mess.</Achievement>
		</div>
	</div>
</div>
