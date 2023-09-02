<script lang="ts">
	import type { Message } from './types';
	import MessageBubble from './MessageBubble.svelte';
	import { Image, Folder, SendHorizontal } from 'lucide-svelte';

	let messages: Message[] = [
		{ message: 'test', senderId: 'not me', timestamp: new Date() },
		{ message: 'baz foo bar', senderId: 'not me', timestamp: new Date() }
	];

	let input = '';
	const onEnter = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		if (input.trim() === '') return;
		sendMessage(input);
		input = '';
	};
	const handleSendButton = (e: MouseEvent) => {
		if (input.trim() === '') return;
		sendMessage(input);
		input = '';
	};
	const sendMessage = (message: string) => {
		let newMessage: Message = {
			message: message,
			senderId: 'me',
			timestamp: new Date()
		};
		messages = [...messages, newMessage];
	};
</script>

<div class="container">
	<div class="messages">
		{#each messages as message}
			<MessageBubble {message} />
		{/each}
	</div>
	<div class="bottom-bar">
		<button class="img-btn"><Image /></button>
		<button class="file-btn"><Folder /></button>
		<input type="text" bind:value={input} on:keypress={onEnter} placeholder="Aa" />
		<button class="send-btn" on:click|preventDefault={handleSendButton}><SendHorizontal /></button>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 16px;
	}

	.messages {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		background-color: var(--base_16-base00);
		overflow-y: scroll;

		padding: 10px;

		/* Hide scrollbar */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}
	.messages::-webkit-scrollbar {
		display: none;
	}

	.bottom-bar {
		display: flex;
		padding: 15px 20px;
		background-color: var(--base_16-base01);
	}

	.img-btn {
		all: unset;
		margin-right: 15px;
		color: var(--base_30-light_grey);
		transition: color 50ms ease-in;
		color: var(--base_30-yellow);
	}

	.img-btn:hover {
		color: var(--base_30-sun);
	}

	.file-btn {
		all: unset;
		color: var(--base_30-light_grey);
		transition: color 50ms ease-in;
		color: var(--base_30-blue);
	}

	.file-btn:hover {
		color: var(--base_30-nord_blue);
	}

	.send-btn {
		all: unset;
		margin-right: 5px;
		color: var(--base_30-light_grey);
		transition: color 50ms ease-in;
		color: var(--base_30-red);
	}

	.send-btn:hover {
		color: var(--base_30-baby_pink);
	}

	input {
		line-height: 16px;
		flex-grow: 1;
		margin: 0 25px;
		padding: 10px 15px;
		border-radius: 20px;
		border: none;
		outline: none;
		font-size: 16px;
		font-family: 'JetBrains Mono', monospace;

		background-color: var(--base_16-base03);
		color: var(--base_30-white);
	}
</style>
