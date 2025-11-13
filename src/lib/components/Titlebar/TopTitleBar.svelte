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
	import ImportantEvent from '$lib/assets/toolbar/event.png';

	import { resolve } from '$app/paths';
	import { birthdayTime, isMobile, websiteIconURL, websitePosition } from '$lib';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

	let confirmAudio: HTMLAudioElement;
	let isLoading = $state(false);
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
	class="bg-black overflow-hidden me-background md:w-full w-(--max-titlebar) md:sticky fixed shadow-2xl shadow-black md:mb-5 border-2"
	style="transform: translate({$websitePosition.x}px, {$websitePosition.y}px);"
>
	<div class="left-0 w-full flex md:flex-row flex-col bg-black/90 md:pl-3 items-center">
		{#if isLoading}
			<h1>Loading...</h1>
		{/if}
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
		{#if $birthdayTime}
			<ImageLinkButton hrefSource="/bday" imageSourceLink={ImportantEvent} important={true} />
		{/if}
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
			hrefSource="/DEALZZ"
			imageSourceLink={AbsolutePeakApplication}
			important={true}
		/>
		{#if showTurkiye}
			<LinkButton linkTowards="/turkiye">???</LinkButton>
		{/if}
		<audio bind:this={confirmAudio} src={ConfirmSound} volume={1}></audio>
	</div>
</div>
