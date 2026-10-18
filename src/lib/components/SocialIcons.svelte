<script lang="ts">
	import HeaderIcon from './HeaderIcon.svelte';
</script>

<div class="icons">
	<HeaderIcon
		alt="GitHub"
		href="https://github.com/TimJentzsch"
		srcDark="/icons/github-dark.svg"
		srcLight="/icons/github-light.svg"
	/>
	<HeaderIcon
		alt="LinkedIn"
		href="https://www.linkedin.com/in/tim-jentzsch/"
		srcDark="/icons/linkedin-dark.svg"
		srcLight="/icons/linkedin-light.svg"
	/>
	<HeaderIcon
		alt="BlueSky"
		href="https://bsky.app/profile/dev.timjen.net"
		srcDark="/icons/bluesky-dark.svg"
		srcLight="/icons/bluesky-light.svg"
	/>
</div>

<style>
	.icons {
		display: flex;
		flex-flow: row;
		align-items: center;
		gap: var(--spacing2);
	}
</style>
