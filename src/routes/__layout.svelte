<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import { session, page } from '$app/stores';
	import '../app.css';

	afterNavigate(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});
</script>

<div class="shell">
	<nav>
		<h1>{import.meta.env.VITE_WORKSPACE_NAME}</h1>
		<ul>
			{#each $session.channels as channel (channel.id)}
				<li class:active={$page.params.id === channel.id}>
					<a href="/channel/{channel.id}"># {channel.name}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style>
	.shell {
		height: 100%;
		--sidebar-width: 260px;
	}

	nav {
		color: rgba(216, 222, 233, 0.7);
		background-color: var(--column-bg);
		position: fixed;
		inset-block: 0;
		width: var(--sidebar-width);
	}

	h1 {
		color: var(--top-nav-text);
		padding: 0 1rem;
		font-weight: 900;
	}

	nav ul {
		list-style-type: none;
		padding: 0;
	}

	nav :any-link {
		color: var(--text-color);
		text-decoration: none;
		padding: 0.3rem 1rem;
		display: block;
	}

	nav :any-link:hover {
		background: var(--hover-item);
	}

	nav .active :any-link,
	nav .active :any-link:hover {
		background: var(--active-item);
		color: var(--active-item-text);
	}

	main {
		margin-left: var(--sidebar-width);
	}
</style>
