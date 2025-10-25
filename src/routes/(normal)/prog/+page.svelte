<script lang="ts">
	import ProgrammingLanguageBox from '$lib/components/General/SubStuff/ProgrammingLanguageBox.svelte';
	import programmingDetails from '$lib/assets/programmingDetails.json';
</script>

<h1 class="text-center md:text-4xl text-2xl">stuff i use!</h1>
<div class="mt-5 flex flex-col gap-2">
	{#each programmingDetails as programmingDetails_m (programmingDetails_m.id)}
		<ProgrammingLanguageBox
			programmingLanguageName={programmingDetails_m.name}
			descriptionOfLanguage={programmingDetails_m.details}
		/>
	{/each}
</div>
