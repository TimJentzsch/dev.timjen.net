<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import SocialIcons from '#lib/components/SocialIcons.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { projects } from '#lib/projects.js';
</script>

<PageHead title="" description="Tim Jentzsch — open source developer." />

<section class="hero">
	<h1 id="name">Tim Jentzsch</h1>
	<span id="title">Software engineer</span>
	<div id="socials">
		<SocialIcons />
	</div>
</section>

<section class="projects">
	<h2>Projects</h2>
	<ul>
		{#each projects as project (project.name)}
			<li>
				<ProjectCard {project} />
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100vh;
	}

	#name {
		font-size: 10vh;
		margin: 0;
	}

	#title {
		font-size: 5vh;
	}

	#socials {
		font-size: 4vh;
		margin-top: var(--spacing2);
	}

	.projects {
		margin-bottom: var(--spacing2);
	}

	.projects ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
		gap: calc(2 * var(--spacing2));
		padding: 0;

		list-style: none;
	}
</style>
