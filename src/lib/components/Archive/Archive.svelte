<script lang="ts">
	let { title, link }: { title: string; link: string } = $props();
	import Folder from '$lib/assets/imgs/folder.png';
	import BaseButton from '../General/BaseButton.svelte';
</script>

<div class="bg-black min-h-30 binary-background grid md:m-5">
	<div class="bg-black/75 grid pl-5 pr-5 w-full h-full border-3">
		<img src={Folder} class="ml-auto mr-auto" alt="Folder Icon" />
		<h1 class="text-center md:text-xl text-xs">{title}</h1>
		<BaseButton
			className="w-full ml-auto"
			onclick={() => {
				window.open(link, '_blank');
			}}>Look Through...</BaseButton
		>
	</div>
</div>
