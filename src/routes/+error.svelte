<script lang="ts">
	// the very cool error page.

	import { onMount } from 'svelte';
	import { BACKGROUND_CSS_VAL } from '$lib';
	import BarrensWalpaper from '$lib/assets/imgs/walpapers/barrens.png';
	import DogCheck from '$lib/assets/imgs/annoying_dog.gif';
	import DanceOfDog from '$lib/assets/sounds/danceOfDog.ogg';

	onMount(() => {
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, 'none');
		return () => {
			document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${BarrensWalpaper})`);
		};
	});
</script>

<div class="m-auto absolute left-0 right-0 top-0 bottom-0 flex flex-col h-fit w-fit">
	<img src={DogCheck} alt="Dog." width="80" class="ml-auto mr-auto" />
</div>
<audio src={DanceOfDog} autoplay loop></audio>
