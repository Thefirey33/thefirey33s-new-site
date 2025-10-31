<script lang="ts">
	import { onMount } from 'svelte';
	import BlackKnifeShop from '$lib/assets/sounds/black_knife_shop.mp3';
	import WebsiteGuyJam from '$lib/assets/imgs/website_guy_jam.gif';
	import WebsiteGuy from '$lib/assets/imgs/website_guy.gif';
	import ArchiveWalpaper from '$lib/assets/imgs/walpapers/actual_archive.jpg';
	import BarrensWalpaper from '$lib/assets/imgs/walpapers/barrens.png';

	import { BACKGROUND_CSS_VAL, websiteIconURL } from '$lib';
	import Archive from '$lib/components/Archive/Archive.svelte';
	import Archives from '$lib/assets/archives.json';

	onMount(() => {
		$websiteIconURL = WebsiteGuyJam;
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${ArchiveWalpaper})`);

		return () => {
			$websiteIconURL = WebsiteGuy;
			document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${BarrensWalpaper})`);
		};
	});
</script>

<div class="grid grid-rows-2 grid-cols-2">
	{#each Archives as archiveData, i (i)}
		<Archive title={archiveData.name} link={archiveData.link}></Archive>
	{/each}
</div>
<audio src={BlackKnifeShop} autoplay loop></audio>
