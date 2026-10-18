<script lang="ts">
	import type { Project } from '#lib/projects.js';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
	const { name, role, description, tags, links, image } = $derived(project);
</script>

<article>
	{#if image}
		<img class="visual" src={image.src} alt={image.alt} loading="lazy" />
	{:else}
		<div class="visual placeholder" aria-hidden="true">Image coming soon</div>
	{/if}

	<div class="title">
		<h3>
			<a href={links[0].href} target="_blank" rel="external noopener noreferrer">{name}</a>
		</h3>
		<span class="role">{role}</span>
	</div>
	<p>{description}</p>
	<p class="meta">{tags.join(' / ')}</p>

	<div class="links">
		{#each links as { label, href } (href)}
			<a {href} target="_blank" rel="external noopener noreferrer">{label}</a>
		{/each}
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.visual {
		aspect-ratio: 16 / 9;
		width: 100%;
		object-fit: cover;
		border-radius: var(--radius);
	}

	.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--mantle);
		color: var(--muted-color);
		font-size: 0.9rem;
	}

	.title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		column-gap: var(--spacing1);
		margin-top: var(--spacing2);
	}

	h3 {
		margin: 0;
	}

	h3 a {
		color: var(--primary-color);
		text-decoration: none;
	}

	h3 a:hover {
		text-decoration: underline;
	}

	.role {
		color: var(--muted-color);
		font-size: 1rem;
	}

	p {
		margin: var(--spacing1) 0 0;
	}

	.meta {
		flex-grow: 1;
		color: var(--muted-color);
		font-size: 0.9rem;
	}

	.links {
		display: flex;
		gap: var(--spacing2);
		margin-top: var(--spacing1);
	}
</style>
