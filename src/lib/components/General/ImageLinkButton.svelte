<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	let { hrefSource, imageSourceLink, important = false } = $props();
</script>

<LinkButton linkTowards={hrefSource} {important}>
	<img src={imageSourceLink} alt="Link Button" draggable="false" />
</LinkButton>
