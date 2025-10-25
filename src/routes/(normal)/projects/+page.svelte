<script lang="ts">
	import Project from '$lib/components/Tools/Project.svelte';
	import AllProjects from '$lib/assets/projects.json';
</script>

<div class="grid gap-5">
	{#each AllProjects as m_project (m_project.id)}
		<Project
			title={m_project.title}
			description={m_project.description}
			imgSource={m_project.image}
			hrefSource={m_project.link}
		/>
	{/each}
</div>
