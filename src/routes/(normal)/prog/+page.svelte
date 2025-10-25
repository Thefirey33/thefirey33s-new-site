<script lang="ts">
	import ProgrammingLanguageBox from '$lib/components/General/SubStuff/ProgrammingLanguageBox.svelte';
	import programmingDetails from '$lib/assets/programmingDetails.json';

	let searchQuery = $state('');
</script>

<h1 class="text-center md:text-4xl text-2xl">stuff i use!</h1>
<div class="mt-5 flex flex-col gap-2">
	<input
		type="text"
		name="search"
		placeholder="Search..."
		class="border bg-black border-gray-300 rounded-md px-4 py-2 block m-5"
		bind:value={searchQuery}
	/>
	{#each programmingDetails as programmingDetails_m (programmingDetails_m.id)}
		{#if searchQuery === '' || programmingDetails_m.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase())}
			<ProgrammingLanguageBox
				programmingLanguageName={programmingDetails_m.name}
				descriptionOfLanguage={programmingDetails_m.details}
			/>
		{/if}
	{/each}
	{#if programmingDetails.findIndex((pred) => pred.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase())) === -1}
		<p class="text-center">No results found.</p>
	{/if}
</div>
