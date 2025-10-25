<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	let { hrefSource, imageSourceLink }: { hrefSource: string; imageSourceLink: string } = $props();
</script>

<LinkButton linkTowards={hrefSource}>
	<img src={imageSourceLink} alt="Link Button" draggable="false" />
</LinkButton>
