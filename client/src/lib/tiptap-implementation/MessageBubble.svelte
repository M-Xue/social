<script>
	// import type { Message } from './types';
	export let message;
</script>

<div class="message {message.senderId === 'me' ? 'user-message' : 'other-message'}">
	{@html message.message}
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
	}
	.user-message {
		align-self: end;
	}

	.message :global(h1) {
		padding: 0;
		margin: 0;
		margin-bottom: 6px;
	}
	.message :global(h2) {
		padding: 0;
		margin: 0;
		margin-bottom: 5px;
	}
	.message :global(h3) {
		padding: 0;
		margin: 0;
		margin-bottom: 4px;
	}
	.message :global(h4) {
		padding: 0;
		margin: 0;
		margin-bottom: 3px;
	}
	.message :global(h5) {
		padding: 0;
		margin: 0;
		margin-bottom: 2px;
	}
	.message :global(h6) {
		padding: 0;
		margin: 0;
		margin-bottom: 1px;
	}

	.message :global(p) {
		line-height: 24px;
		font-size: 16px;
		padding: 0;
		margin: 0;
	}

	.message :global(em) {
		color: var(--base_30-sun);
	}

	.message :global(strong) {
		color: var(--base_30-red);
	}

	.message :global(li) {
		padding: 0;
		margin-left: 20px;
	}
	.message :global(ul) {
		padding: 0;
		margin: 0;
	}
	.message :global(ol) {
		padding: 0;
		margin: 0;
	}
</style>
