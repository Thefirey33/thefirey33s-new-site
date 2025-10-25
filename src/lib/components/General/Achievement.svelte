<script lang="ts">
	let { achieved = false, children } = $props();
</script>

<div class="grid w-full grid-cols-2 h-fit items-center ring-2 p-5 rounded-xl select-none mt-5">
	<h1 class="text-center text-5xl {achieved ? 'text-green-500' : 'text-red-500'}">
		{achieved ? 'YUP.' : 'NOPE.'}
	</h1>
	<h1 class="text-center">{@render children()}</h1>
</div>
