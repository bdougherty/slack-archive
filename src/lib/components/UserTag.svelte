<script lang="ts">
	import { session } from '$app/stores';
	export let id: string;

	$: user = $session.users.find((user) => user.id === id);
</script>

<span>@{user?.real_name ?? user?.name ?? 'unknown'}</span>

<style>
	span {
		display: inline-flex;
		height: fit-content;
		width: fit-content;
		color: #0b4c8c;
		background-color: rgba(29, 155, 209, var(--background-opacity, 0.1));
		/* cursor: pointer; */
		border-radius: 3px;
		padding: 0 2px 1px;
	}

	/* span:hover {
		--background-opacity: 0.2;
	} */
</style>
