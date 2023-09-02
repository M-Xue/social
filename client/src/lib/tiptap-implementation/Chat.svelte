<script lang="ts">
	import type { Message } from '../../routes/messenger/types';
	import Tiptap from './Tiptap.svelte';
	import MessageBubble from '../../routes/messenger/MessageBubble.svelte';
	import type { Editor } from '@tiptap/core';

	let messages: Message[] = [
		{ message: 'test', senderId: 'not me', timestamp: new Date() },
		{ message: 'baz <strong>foo</strong> <em>bar</em>', senderId: 'not me', timestamp: new Date() }
	];
	let editor: Editor;

	const enterMessage = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		sendMessage();
	};
	const sendMessage = () => {
		if (!editor) return;
		if (!editor.state.doc.textContent.trim().length) return; // Check if content is empty

		console.log(editor.getHTML());
		let newMessage: Message = {
			message: editor.getHTML(),
			senderId: 'me',
			timestamp: new Date()
		};
		messages = [...messages, newMessage];
		editor.commands.clearContent();
	};
</script>

<div class="container">
	<div class="messages">
		{#each messages as message}
			<MessageBubble {message} />
		{/each}
	</div>
	<div class="bottom-bar">
		<button>+</button>
		<!-- <input type="text" bind:value={input} on:keypress={enterMessage} placeholder="Aa" /> -->
		<Tiptap bind:editor {enterMessage} />
		<button on:click|preventDefault={sendMessage}>></button>
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
</style>
