<script lang="ts">
	// the very cool error page.

	import { onMount } from 'svelte';
	import { BACKGROUND_CSS_VAL } from '$lib';
	import BarrensWalpaper from '$lib/assets/imgs/walpapers/barrens.png';
	import DogCheck from '$lib/assets/imgs/annoying_dog.gif';
	import DanceOfDog from '$lib/assets/sounds/dance_of_dog.ogg';
	import WebsiteGuyJam from '$lib/assets/imgs/website_guy_jam.gif';
	import WebsiteGuy from '$lib/assets/imgs/website_guy.gif';
	import { websiteIconURL } from '$lib';
	import { page } from '$app/state';
	onMount(() => {
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, 'none');
		$websiteIconURL = WebsiteGuyJam;

		return () => {
			document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${BarrensWalpaper})`);
			$websiteIconURL = WebsiteGuy;
		};
	});
</script>

<div class="m-auto absolute left-0 right-0 top-0 bottom-0 flex flex-col h-fit w-fit">
	<img src={DogCheck} alt="Dog." width="80" class="ml-auto mr-auto" />
	<h1 class="text-center text-2xl">{page.status}</h1>
</div>
<audio src={DanceOfDog} autoplay loop></audio>
