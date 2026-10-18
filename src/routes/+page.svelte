<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
</script>

<PageHead title="" description="Tim Jentzsch — open source developer." />

<section class="hero">
	<h1 id="name">Tim Jentzsch</h1>
	<span id="title">Software engineer</span>
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
</style>
