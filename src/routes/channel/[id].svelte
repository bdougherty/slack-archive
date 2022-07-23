<script lang="ts">
	import { session } from '$app/stores';
	import DayDivider from '$lib/components/DayDivider.svelte';
	import Message from '$lib/components/Message.svelte';
	import type { Channel, Message as TMessage } from '$lib/types';
	export let channel: Channel;
	export let messages: TMessage[];

	function getLocalIsoDate(message: TMessage) {
		const date = new Date(Number.parseFloat(message.ts) * 1000);

		const year = date.getFullYear();
		const month = `${date.getMonth() + 1}`;
		const day = `${date.getDate()}`;

		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}

	function shouldDisplayMessage(message: TMessage) {
		// Threaded message
		if (message.thread_ts) {
			const isParent = message.thread_ts === message.ts;
			return isParent;
		}

		return true;
	}

	function getPreviousDisplayedMessage(index: number) {
		if (index < 2) {
			return messages[index];
		}

		while (index > 0) {
			const previous = messages[index - 1];
			if (previous && shouldDisplayMessage(previous)) {
				return previous;
			}

			index--;
		}

		return undefined;
	}

	function isDifferentDay(message: TMessage, message2: TMessage) {
		return getLocalIsoDate(message) !== getLocalIsoDate(message2);
	}

	function isFirstInSequence(message: TMessage, index: number) {
		const previous = getPreviousDisplayedMessage(index);

		if (!previous) {
			return true;
		}

		if (isDifferentDay(message, previous)) {
			return true;
		}

		if (previous.user === message.user && !previous.subtype) {
			return false;
		}

		return true;
	}
</script>

<svelte:head>
	<title>Slack Archive | {channel.name} | {import.meta.env.VITE_WORKSPACE_NAME}</title>
</svelte:head>

<header>
	<h2># {channel.name}</h2>
	<p>{channel.topic.value}</p>
</header>

<ol>
	{#each messages as message, index (message.ts)}
		{#if shouldDisplayMessage(message)}
			{@const previousMessage = getPreviousDisplayedMessage(index)}
			{@const firstInSequence = isFirstInSequence(message, index)}
			{@const user = $session.users.find((user) => user.id === message.user)}

			{#if !previousMessage || isDifferentDay(message, previousMessage)}
				<DayDivider timestamp={message.ts} />
			{/if}

			<li>
				<Message {message} {user} {channel} first={firstInSequence} />
			</li>
		{/if}
	{/each}
</ol>

<style>
	header {
		display: flex;
		gap: 1rem;
		align-items: baseline;
		border-block-end: 1px #ddd solid;
		position: sticky;
		inset-block-start: 0;
		background-color: #fff;
		z-index: 10;
		padding-inline-start: 1rem;
	}

	h2 {
		font-weight: 900;
		font-size: 18px;
	}

	header p {
		color: rgba(29, 28, 29, 0.7);
		font-size: 13px;
	}

	ol {
		list-style-type: none;
		padding: 0;
	}
</style>
