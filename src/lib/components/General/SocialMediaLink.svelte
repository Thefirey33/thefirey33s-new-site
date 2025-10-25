<script lang="ts">
	let { socialMediaName, socialMediaIcon, href } = $props();
</script>

<a {href}>
	<div
		class="w-full h-full bg-black p-2 rounded-md border-2 hover:scale-105 shadow-xl grid grid-rows-1 items-center"
	>
		<img fetchpriority="high" src={socialMediaIcon} class="md:w-fit w-8" alt={socialMediaName} />
		<h1 class="text-center md:text-xl text-xs select-none">{socialMediaName}</h1>
	</div>
</a>
