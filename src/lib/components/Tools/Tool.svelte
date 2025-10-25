<script lang="ts">
	let { toolName, children = undefined } = $props();
</script>

<div
	class="bg-black outline-2 min-w-2 min-h-2 w-fit ml-auto mr-auto rounded-xl md:p-5 p-3 shadow-2xl shadow-black m-10"
>
	<h1 class="text-center md:text-2xl mb-5">{toolName}</h1>
	{@render children?.()}
</div>
