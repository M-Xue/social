<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import type { EditorView } from '@tiptap/pm/view';
	import HardBreak from '@tiptap/extension-hard-break';

	let element: HTMLDivElement;
	export let editor: Editor;
	export let enterMessage: (e: KeyboardEvent) => void;

	onMount(() => {
		HardBreak.configure({
			keepMarks: false
		});

		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			editorProps: {
				handleKeyDown(view: EditorView, event: KeyboardEvent) {
					if (event.key === 'Enter' && !event.altKey && !event.metaKey && !event.shiftKey) {
						enterMessage(event);
						// this.commands.clearContent();
					}
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="input" bind:this={element} />

<style>
	.input {
		line-height: 16px;
		flex-grow: 1;
		margin: 0 25px;
		padding: 10px 15px;
		border-radius: 20px;
		border: none;
		outline: none;

		background-color: var(--base_16-base03);
		color: var(--base_30-white);
	}

	:global(.ProseMirror) {
		line-height: 24px;
	}

	:global(.ProseMirror:focus) {
		outline: none;
	}

	:global(.ProseMirror h1) {
		padding: 0;
		margin: 0;
		margin-bottom: 6px;
	}
	:global(.ProseMirror h2) {
		padding: 0;
		margin: 0;
		margin-bottom: 5px;
	}
	:global(.ProseMirror h3) {
		padding: 0;
		margin: 0;
		margin-bottom: 4px;
	}
	:global(.ProseMirror h4) {
		padding: 0;
		margin: 0;
		margin-bottom: 3px;
	}
	:global(.ProseMirror h5) {
		padding: 0;
		margin: 0;
		margin-bottom: 2px;
	}
	:global(.ProseMirror h6) {
		padding: 0;
		margin: 0;
		margin-bottom: 1px;
	}

	:global(.ProseMirror p) {
		font-size: 16px;
		padding: 0;
		margin: 0;
	}

	:global(.ProseMirror em) {
		color: var(--base_30-sun);
	}

	:global(.ProseMirror strong) {
		color: var(--base_30-red);
	}

	:global(.ProseMirror li) {
		padding: 0;
		margin-left: 20px;
	}
	:global(.ProseMirror ul) {
		padding: 0;
		margin: 0;
	}
	:global(.ProseMirror ol) {
		padding: 0;
		margin: 0;
	}
</style>
