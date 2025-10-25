<script lang="ts">
	import { isMobile } from '$lib';

	let { socialMediaName, socialMediaIcon, href } = $props();
</script>

<a {href}>
	<div
		class="w-full h-full bg-black p-2 rounded-md border-2 hover:scale-105 shadow-xl grid grid-rows-1 items-center"
	>
		<img fetchpriority="high" src={socialMediaIcon} class="md:w-fit w-fit" alt={socialMediaName} />
		{#if !$isMobile}
			<h1 class="text-center md:text-xl text-xs select-none">{socialMediaName}</h1>
		{/if}
	</div>
</a>
