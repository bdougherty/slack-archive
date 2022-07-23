<script>
	import Emoji from './Emoji.svelte';
	import UserTag from './UserTag.svelte';

	export let block;
</script>

{#if block.type === 'rich_text'}
	{#each block.elements as section}
		<div class:quote={section.type === 'rich_text_quote'}>
			{#each section.elements as element}
				{#if element.type === 'text'}
					{@html element.text.replace('\n', '<br>')}
				{:else if element.type === 'link'}
					<a href={element.url} rel="nofollow noopener">{element.text ?? element.url}</a>
				{:else if element.type === 'user'}
					<UserTag id={element.user_id} />
				{:else if element.type === 'broadcast'}
					<span class="highlight">@{element.range}</span>
				{:else if element.type === 'emoji'}
					:<Emoji name={element.name} />:
				{/if}
			{/each}
		</div>
	{/each}
{:else}
	unknown block {block.type}
{/if}
