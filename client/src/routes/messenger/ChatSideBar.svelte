<script lang="ts">
	import { User } from 'lucide-svelte';
	import ChatPreview from './ChatPreview.svelte';
</script>

<div class="container">
	<div class="top-bar">
		<h1>Chats</h1>
		<div class="user-icon"><User size={30} strokeWidth={2} /></div>
	</div>
	<div class="chat-list">
		{#each [1, 2, 3, 4, 5] as item}
			<ChatPreview />
		{/each}
	</div>
</div>

<style>
	.container {
		min-width: 360px;
		background-color: var(--base_30-statusline_bg);
		border-right: solid 2px var(--base_30-line);
		font-family: 'JetBrains Mono', monospace;
	}

	.top-bar {
		margin: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top-bar .user-icon {
		margin-top: 10px;
		color: var(--base_30-white);
	}

	.top-bar h1 {
		color: var(--base_30-white);
	}
</style>
