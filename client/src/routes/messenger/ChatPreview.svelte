<script lang="ts">
</script>

<div class="container">
	<div class="chat-img" />
	<div class="text-container">
		<div class="chat-name">Name</div>
		<div class="last-msg">You: yeet</div>
	</div>
</div>

<style>
	.container {
		height: 48px;
		padding: 10px;
		color: var(--base_30-white);
		margin: 0px 10px;
		display: flex;
	}
	.container:hover {
		background-color: var(--base_16-base01);
	}

	.chat-img {
		width: 48px;
		height: 48px;
		margin-right: 17.5px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
	}

	.text-container {
		margin-top: 4.5px;
	}

	.chat-name {
		font-size: 18px;
		font-weight: bold;
	}

	.last-msg {
		font-size: 14px;
	}
</style>
