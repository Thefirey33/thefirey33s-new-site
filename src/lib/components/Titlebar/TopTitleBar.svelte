<script lang="ts">
	import IconOfWebsite from '$lib/assets/favicon.ico';
	import LinkButton from '../General/LinkButton.svelte';
	import ConfirmSound from '$lib/assets/sounds/confirm.wav';
	import Hamber from '$lib/assets/imgs/general/hamber.ico';

	import ImageLinkButton from '$lib/components/General/ImageLinkButton.svelte';
	import Programming from '$lib/assets/toolbar/programming.png';
	import Projects from '$lib/assets/toolbar/projects.png';
	import About from '$lib/assets/toolbar/about.png';
	import SocialMedia from '$lib/assets/toolbar/social_media.png';
	import Opinions from '$lib/assets/toolbar/speech.png';
	import { resolve } from '$app/paths';
	import { isMobile } from '$lib';
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
	class="bg-black md:w-full w-(--max-titlebar) md:h-fit h-full min-h-15 outline-2 pl-3 outline-white rounded-r-md flex md:flex-row flex-col md:items-center mb-5 fixed"
>
	<a
		class="flex flex-col text-white md:text-3xl font-bold m-3 select-none hover:bg-gray-800"
		href={resolve('/')}
		draggable="false"
		onclick={() => {
			confirmAudio.currentTime = 0;
			confirmAudio.play();
		}}
	>
		<div class="flex flex-row items-center">
			<img
				src={IconOfWebsite}
				alt="thefirey33"
				draggable="false"
				width="30"
				height="30"
				class="image-rendering-pixelated w-10 h-10 mr-3"
			/>
			{#if !$isMobile}
				thefirey33
			{/if}
		</div>
		{#if !$isMobile}
			<h3 class="text-xs">developing garbage since 2018.</h3>
		{/if}
	</a>
	<LinkButton linkTowards="/toolz">
		<span class="flex flex-row items-center">
			<img src={Hamber} width="30" alt="hamber" />
		</span>
	</LinkButton>
	<ImageLinkButton hrefSource="/prog" imageSourceLink={Programming} />
	<ImageLinkButton hrefSource="/projects" imageSourceLink={Projects} />
	<ImageLinkButton hrefSource="/socialMedia" imageSourceLink={SocialMedia} />
	<ImageLinkButton hrefSource="/opinions" imageSourceLink={Opinions} />
	<ImageLinkButton hrefSource="/about" imageSourceLink={About} />
	{#if showTurkiye}
		<LinkButton linkTowards="/turkiye">???</LinkButton>
	{/if}
	<audio bind:this={confirmAudio} src={ConfirmSound} volume={1}></audio>
</div>
