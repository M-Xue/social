<script lang="ts">
	import CommandKPalette from './CommandKPalette.svelte';
	let isCommandKOpen = false;
	const onMetaKPress = (e: KeyboardEvent) => {
		if (e.key === 'k' && e.metaKey) {
			e.preventDefault();
			isCommandKOpen = !isCommandKOpen;
			return;
		}
	};
</script>

<svelte:document on:keydown={onMetaKPress} />

{#if isCommandKOpen}
	<button
		class="backdrop"
		on:click={() => {
			isCommandKOpen = false;
		}}
	>
		<CommandKPalette bind:isCommandKOpen />
	</button>
{/if}

<style>
	.backdrop {
		all: unset;
		position: absolute;
		height: 100vh;
		width: 100vw;
		justify-content: center;
		align-items: center;
		background-color: transparent;

		display: flex;
		z-index: 999;
	}
</style>
