<script lang="ts">
	let { programmingLanguageName, descriptionOfLanguage = 'no description.' } = $props();
</script>

<div class="bg-black hover:bg-gray-950 block outline-2 p-5 m-2 rounded-2xl text-3xl">
	<h1>{programmingLanguageName}</h1>
	<h2 class="justify-end-safe md:text-xl text-xs">{descriptionOfLanguage}</h2>
</div>
