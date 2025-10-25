<script lang="ts">
	import SpinningNoik from '$lib/assets/imgs/noik-spin.gif';

	// this was done to keep the code smaller.
	const BASE_CSS_DEF = 'md:left-0 absolute left-(--max-titlebar) right-0 top-0 bottom-0';
</script>

<!-- about text, center dead on -->

<img
	src={SpinningNoik}
	fetchpriority="high"
	draggable="false"
	alt="spinning noik"
	class="opacity-50 md:scale-300 m-auto {BASE_CSS_DEF} right-0"
/>
<div class="text-center m-auto w-fit h-fit {BASE_CSS_DEF} select-none">
	<h1 class="md:text-4xl text-2xl">About THEFIREY33</h1>
	<p>game engine maker,</p>
	<p>high school guy,</p>
	<p>programmer,</p>
	<p>game designer.</p>
</div>
