<script lang="ts">
	let { children, className = 'bg-[#121212] outline-[#464646]' } = $props();
</script>

<button
	class="{className} font-sans md:w-20 md:h-20 h-15 w-15 m-2 rounded-[100px] outline-1 flex hover:scale-120 transition-all ease-out cursor-pointer select-none"
>
	<p class="m-auto md:text-4xl text-2xl">{@render children()}</p>
</button>
