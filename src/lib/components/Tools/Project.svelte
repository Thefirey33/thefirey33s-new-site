<script lang="ts">
	import BaseTexture from '$lib/assets/favicon.ico';
	import BaseButton from '../General/BaseButton.svelte';

	let {
		title = 'NO TITLE',
		description = 'NO DESCRIPTION',
		imgSource = '',
		hrefSource = 'https://example.com'
	}: { title: string; description: string; imgSource: string; hrefSource: string } = $props();
</script>

<div
	class="bg-black h-fit justify-center w-fit p-5 ring-2 m-3 ml-auto mr-auto rounded-md shadow-2xl shadow-white/3 border-2 border-dashed flex flex-col items-center"
>
	<h1 class="text-center text-2xl">{title}</h1>
	<div class="flex flex-row items-center w-full">
		<img
			src={imgSource !== '' ? imgSource : BaseTexture}
			class="md:w-30 w-10 m-2 rounded-xl"
			alt="No Texture"
			width="20"
			draggable="false"
		/>
		<p class="w-full">{description}</p>
	</div>
	<BaseButton onclick={() => window.open(hrefSource, '_blank')}>Visit</BaseButton>
</div>
