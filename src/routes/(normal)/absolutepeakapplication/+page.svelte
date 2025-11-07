<script lang="ts">
	import CalcButton from '$lib/components/AbsolutePeak/CalcButton.svelte';
	import DiddyBlud from '$lib/assets/sounds/diddyblud.mp3';
	import { onMount } from 'svelte';
	const topButtonTailwind = 'bg-[#757575] outline-[#a7a7a7]';
	const actionButtonTailwind = 'bg-amber-500 outline-amber-300';
	import GokuReadingABook from '$lib/assets/imgs/walpapers/goku-reading-book-goku.png';
	import Refuge from '$lib/assets/imgs/walpapers/barrens.png';
	import { BACKGROUND_CSS_VAL } from '$lib';

	let boxLocation = $state({ x: 0, y: 0 });
	let shakeAmount = $state(10);

	function getRandom() {
		return Math.random() * shakeAmount - Math.random() * shakeAmount;
	}
	onMount(() => {
		shakeAmount = 0;
		let currentInterval = setInterval(() => {
			boxLocation = { x: getRandom(), y: getRandom() };
			shakeAmount += 0.01;
		}, 1);
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${GokuReadingABook})`);
		return () => {
			clearInterval(currentInterval);
			document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${Refuge})`);
		};
	});
</script>

<p>i hate brainrot.</p>

<div
	class="bg-black w-fit rounded-xl m-auto p-3 overflow-hidden transition-all duration-5 shadow-4xl shadow-black/20"
	style={`transform: translate(${boxLocation.x}px, ${boxLocation.y}px) rotate(${getRandom() / 10}deg)`}
>
	<h1 class="text-right text-4xl mb-5 mt-5">67 THOSE WHO SNOW</h1>
	<span class="grid grid-cols-4">
		<CalcButton className={topButtonTailwind}>E</CalcButton>
		<CalcButton className={topButtonTailwind}>C</CalcButton>
		<CalcButton className={topButtonTailwind}>%</CalcButton>
		<CalcButton className={actionButtonTailwind}>÷</CalcButton>
		{#each { length: 3 } as _, i (i)}
			<CalcButton>{9 - i}</CalcButton>
		{/each}
		<CalcButton className={actionButtonTailwind}>×</CalcButton>
		{#each { length: 3 } as _, i (i)}
			<CalcButton>{6 - (2 - i)}</CalcButton>
		{/each}
		<CalcButton className={actionButtonTailwind}>−</CalcButton>
		{#each { length: 3 } as _, i (i)}
			<CalcButton>{3 - i}</CalcButton>
		{/each}
		<CalcButton className={actionButtonTailwind}>+</CalcButton>
		<CalcButton>+/-</CalcButton>
		<CalcButton>0</CalcButton>
		<CalcButton>.</CalcButton>
		<CalcButton className={actionButtonTailwind}>=</CalcButton>
	</span>
</div>
<audio src={DiddyBlud} autoplay loop></audio>
