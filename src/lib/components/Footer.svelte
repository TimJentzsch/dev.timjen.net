<script>
	import { COPYRIGHT } from '$lib/properties';
</script>

<div class="footer-container">
	<footer>
		<nav>
			<div>
				<a href="/feed.xml" aria-label="RSS Feed">RSS</a>
				&nbsp;|&nbsp;
				<a href="/atom.xml" aria-label="Atom Feed">Atom</a>
			</div>
			<a href="https://github.com/TimJentzsch/dev.timjen.net/issues/new">Report an Issue</a>
		</nav>
		<p class="copyright">{COPYRIGHT}</p>
	</footer>
</div>

<style>
	.footer-container {
		display: flex;
		width: 100%;
		justify-content: center;

		margin-top: var(--spacing2);
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: var(--max-content-width);

		margin: var(--spacing1) var(--spacing2);
	}

	.copyright {
		color: var(--muted-color);
	}
</style>
