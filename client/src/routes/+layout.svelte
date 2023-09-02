<script lang="ts">
	import './styles.css';
	import CommandK from './CommandKContainer.svelte';
</script>

<CommandK />
<slot />

<style>
	:global(*) {
		box-sizing: border-box;
		font-family: 'JetBrains Mono', monospace;
	}
</style>
