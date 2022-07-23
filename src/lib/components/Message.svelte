<script lang="ts">
	import type { Channel, Message, User } from '$lib/types';
	import BlockRenderer from './BlockRenderer.svelte';
	import Emoji from './Emoji.svelte';
	import ReactionPill from './ReactionPill.svelte';

	export let message: Message;
	export let channel: Channel;
	export let user: User;
	export let first = true;

	const timeFormatter = new Intl.DateTimeFormat('default', {
		timeStyle: 'short'
	});

	$: isSystem = message.type === 'message' && message.subtype;
	$: date = new Date(Number.parseFloat(message.ts) * 1000);
</script>

<div class="message">
	{#if first}
		<div class="avatar">
			<img src={user.profile.image_72} width="36" height="36" alt="" />
		</div>
	{:else}
		<div class="date">
			<time datetime={date.toISOString()} title={date.toISOString()}>
				{date.getHours() % 12}:{`${date.getMinutes()}`.padStart(2, '0')}
			</time>
		</div>
	{/if}

	<div class="content">
		{#if first}
			<div class="meta">
				<span class="name">
					{user.profile.real_name ?? user.profile.display_name}
				</span>&nbsp;
				<span class="date">
					<time datetime={date.toISOString()} title={date.toISOString()}>
						{timeFormatter.format(date)}
					</time>
				</span>
			</div>
		{/if}
		<div class="blocks" class:system={isSystem}>
			{#if message.blocks}
				{#each message.blocks as block (block.block_id)}
					<BlockRenderer {block} />
				{/each}
			{:else if message.subtype === 'channel_join'}
				joined #{channel.name}.
			{:else if message.subtype === 'channel_name'}
				renamed the channel from “{message.old_name}” to “{message.name}”
			{:else}
				<strong>{message.subtype ?? ''}</strong>{message.text}
			{/if}
		</div>
		{#if message.files}
			{#each message.files as file}
				<div class="file">
					{file.title}
					<img src={file.thumb_720} width={file.thumb_720_w} height={file.thumb_720_h} alt="" />
				</div>
			{/each}
		{/if}
		{#if message.reactions}
			<div class="reactions">
				{#each message.reactions as reaction (reaction.name)}
					<ReactionPill {reaction} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.message {
		/* max-width: 70ch; */
		font-size: 15px;
		padding: 8px 20px;
		display: grid;
		grid-template-columns: 36px 1fr;
		gap: 8px;
	}

	.avatar img {
		border-radius: 4px;
	}

	.message > .date {
		text-align: right;
	}

	.message > .date time {
		display: none;
	}

	.message:hover > .date time {
		display: block;
	}

	.content {
		margin-block-start: -4px;
		line-height: 1.46668;
	}

	.name {
		font-weight: 900;
	}

	.date {
		font-size: 12px;
		color: #666;
	}

	.blocks,
	.reactions {
		margin-bottom: 4px;
	}

	.system {
		color: #666;
	}

	.quote {
		border-inline-start: 4px solid #ddd;
		padding-inline-start: 0.75rem;
	}

	.highlight {
		font-weight: 600;
		background-color: #fae8b4;
		border-radius: 3px;
		padding: 0.1rem 0.2rem;
	}

	.reactions {
		list-style-type: none;
		padding: 0;
		display: flex;
		gap: 0.3rem;
	}

	.file {
		max-width: 320px;
	}

	.file img {
		max-width: 100%;
		max-height: 100%;
		height: auto;
		border-radius: 8px;
		/* object-fit: cover; */
	}
</style>
