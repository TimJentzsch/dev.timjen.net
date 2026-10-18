<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import SocialIcons from '#lib/components/SocialIcons.svelte';
</script>

<PageHead title="" description="Tim Jentzsch — open source developer." />

<section class="hero">
	<h1 id="name">Tim Jentzsch</h1>
	<span id="title">Software engineer</span>
	<div id="socials">
		<SocialIcons />
	</div>
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
</style>
