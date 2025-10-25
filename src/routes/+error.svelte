<script lang="ts">
	// the very cool error page.

	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import BaseButton from '$lib/components/General/BaseButton.svelte';
	import NikoYawn from '$lib/assets/imgs/error_imgs/niko_yawn.png';
	import { resolve } from '$app/paths';
</script>

<div
	class="m-auto self-center bg-black outline-2 absolute left-0 right-0 top-0 bottom-0 md:w-150 w-80 flex flex-col"
>
	<span class="flex justify-center items-center">
		<img src={NikoYawn} alt="angry ralsei" width="80" class="image-rendering-pixelated" />
		<h1 class="justify-center text-center md:text-4xl ml-5">{page.status}</h1>
	</span>
	<!-- explaining yourself -->
	<p class="text-center mt-5">whoops!</p>
	<p class="text-center mb-5 text-red-500 text-3xl">{page.error?.message}</p>
	<BaseButton className="ml-auto mr-auto" onclick={() => goto(resolve('/'))}
		>go back to main</BaseButton
	>
</div>
