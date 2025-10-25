<script lang="ts">
	import socialMediaDetails from '$lib/assets/socialMedia.json';
	import SocialMediaLink from '$lib/components/General/SocialMediaLink.svelte';
</script>

<div
	class="md:w-100 h-full grid grid-cols-3 gap-2 grid-rows-3 justify-items-center m-auto bg-black rounded-xl outline-2 p-2"
>
	{#each socialMediaDetails as m_socialMedia (m_socialMedia.id)}
		<SocialMediaLink
			socialMediaName={m_socialMedia.socialMediaName}
			socialMediaIcon={m_socialMedia.socialMediaIcon}
			href={m_socialMedia.href}
		></SocialMediaLink>
	{/each}
	<h1 class="text-center">Discord: @thefirey33</h1>
</div>
