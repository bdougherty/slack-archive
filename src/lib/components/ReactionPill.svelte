<script lang="ts">
	import { session } from '$app/stores';
	import type { Reaction } from '$lib/types';
	import Emoji from '$lib/components/Emoji.svelte';

	export let reaction: Reaction;
	let showHover = false;

	const formatter = new Intl.ListFormat('default', { style: 'long', type: 'conjunction' });

	$: users = $session.users
		.filter((user) => reaction.users.includes(user.id))
		.sort((a, b) => reaction.users.indexOf(a.id) - reaction.users.indexOf(b.id));
	$: userNames = users.map((user) => user.profile.real_name ?? user.profile.display_name);
</script>

<div
	class="reaction"
	on:pointerenter={() => (showHover = true)}
	on:pointerleave={() => (showHover = false)}
>
	<Emoji name={reaction.name} />
	<span class="count">
		{reaction.count}
	</span>

	{#if showHover}
		<div class="hover">
			<div class="emoji">
				💯
				<!-- <Emoji name={reaction.name} /> -->
			</div>
			<p><strong>{formatter.format(userNames)}</strong> reacted with :{reaction.name}:</p>
		</div>
	{/if}
</div>

<style>
	.reaction {
		background-color: #f6f6f6;
		border-radius: 1rem;
		padding: 0.25rem;
		font-size: 0.8rem;
		cursor: pointer;
		position: relative;
	}

	.reaction:hover {
		background-color: #fff;
		box-shadow: inset 0 0 0 1px rgba(29, 28, 29, 0.5);
	}

	.count {
		font-size: 0.7rem;
		padding-inline-end: 0.2rem;
	}

	.hover {
		position: absolute;
		inset-block-end: 2.15rem;
		inset-inline-start: 50%;
		transform: translateX(-50%);
		background-color: black;
		border-radius: 8px;
		color: #ddd;
		width: max-content;
		max-width: 27ch;
		padding: 0.75rem;
		display: flex;
		gap: 0.25rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: 500;
	}

	.hover::before {
		content: '';
		background-color: inherit;
		transform: rotate(45deg);
		width: 1rem;
		height: 1rem;
		position: absolute;
		inset-block-end: -0.15rem;
	}

	.hover .emoji {
		display: inline-block;
		background-color: #fff;
		border-radius: 4px;
		width: 4rem;
		height: 4rem;
		display: grid;
		align-items: center;
		justify-content: center;
	}

	.hover strong {
		color: #fff;
	}

	.hover p {
		margin: 0;
	}
</style>
