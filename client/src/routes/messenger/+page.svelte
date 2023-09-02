<script lang="ts">
	import ChatSideBar from './ChatSideBar.svelte';
	import Chat from './Chat.svelte';
	import ChatInfo from './ChatInfo.svelte';
</script>

<div class="container">
	<ChatSideBar />
	<Chat />
	<!-- <ChatInfo/> -->
</div>

<style>
	.container {
		display: flex;
		height: 100vh;
	}
</style>
