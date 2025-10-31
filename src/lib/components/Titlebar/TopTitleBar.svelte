<script lang="ts">
	import LinkButton from '../General/LinkButton.svelte';
	import ConfirmSound from '$lib/assets/sounds/confirm.wav';
	import Hammer from '$lib/assets/toolbar/tools.png';

	import ImageLinkButton from '$lib/components/General/ImageLinkButton.svelte';
	import Programming from '$lib/assets/toolbar/programming.png';
	import Projects from '$lib/assets/toolbar/projects.png';
	import About from '$lib/assets/toolbar/about.png';
	import SocialMedia from '$lib/assets/toolbar/social_media.png';
	import AbsolutePeakApplication from '$lib/assets/toolbar/absolute_peak_application.png';
	import Archive from '$lib/assets/toolbar/archive.png';
	import { resolve } from '$app/paths';
	import { isMobile, websiteIconURL } from '$lib';
	import { onMount } from 'svelte';

	let confirmAudio: HTMLAudioElement;

	let { showTurkiye = false } = $props();

	onMount(() => {
		$isMobile = window.innerWidth < 850;
		window.addEventListener('resize', () => {
			$isMobile = window.innerWidth < 850;
		});
	});
</script>

<!-- this is the top titlebar, responsible for playing stuff -->
<div
	class="bg-black md:w-full w-(--max-titlebar) md:h-fit h-full min-h-15 md:pl-3 border-2 rounded-r-md flex md:flex-row flex-col items-center mb-5 md:sticky fixed shadow-2xl shadow-black"
>
	<a
		class="flex flex-col text-white md:text-3xl font-bold m-3 select-none hover:bg-gray-500"
		href={resolve('/')}
		draggable="false"
		onclick={() => {
			confirmAudio.currentTime = 0;
			confirmAudio.play();
		}}
	>
		<div class="flex flex-row items-center">
			<img
				src={$websiteIconURL}
				alt="thefirey33"
				draggable="false"
				width="50"
				height="50"
				class="image-rendering-pixelated md:mr-5"
			/>
			{#if !$isMobile}
				thefirey33
			{/if}
		</div>
		{#if !$isMobile}
			<h3 class="text-xs">full-stack coding, game-design, game-programming.</h3>
		{/if}
	</a>
	<ImageLinkButton hrefSource="/about" imageSourceLink={About} />
	<LinkButton linkTowards="/toolz">
		<span class="flex flex-row items-center">
			<img src={Hammer} width="30" alt="hamber" />
		</span>
	</LinkButton>
	<ImageLinkButton hrefSource="/programming" imageSourceLink={Programming} />
	<ImageLinkButton hrefSource="/projects" imageSourceLink={Projects} />
	<ImageLinkButton hrefSource="/socialMedia" imageSourceLink={SocialMedia} />
	<ImageLinkButton hrefSource="/archive" imageSourceLink={Archive} />
	<ImageLinkButton
		hrefSource="/absolutepeakapplication"
		imageSourceLink={AbsolutePeakApplication}
	/>
	{#if showTurkiye}
		<LinkButton linkTowards="/turkiye">???</LinkButton>
	{/if}
	<audio bind:this={confirmAudio} src={ConfirmSound} volume={1}></audio>
</div>
