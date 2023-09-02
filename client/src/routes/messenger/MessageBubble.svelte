<script lang="ts">
	import type { Message } from './types';
	export let message: Message;
</script>

<div class="message {message.senderId === 'me' ? 'user-message' : 'other-message'}">
	{message.message}
</div>

<style>
	.message {
		border-radius: 20px;
		padding: 10px 15px;
		margin: 1px 0;

		align-self: start;

		background-color: var(--base_16-base02);
		color: var(--base_30-white);

		font-size: 16px;
		font-family: 'JetBrains Mono', monospace;
	}
	.user-message {
		/* background-color: var(--base_30-vibrant_green); */
		/* color: var(--base_30-black); */
		align-self: end;
	}
</style>
