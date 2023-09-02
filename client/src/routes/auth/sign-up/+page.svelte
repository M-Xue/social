<script lang="ts">
	import DetailsForm from './DetailsForm.svelte';
	import PasswordForm from './PasswordForm.svelte';
	import UsernameForm from './UsernameForm.svelte';

	let page: 'details' | 'username' | 'password' = 'details';
</script>

<h1 class="title">Sign Up</h1>
<div class="form-container">
	{#if page === 'details'}
		<DetailsForm bind:page />
	{:else if page === 'username'}
		<UsernameForm bind:page />
	{:else if page === 'password'}
		<PasswordForm bind:page />
	{/if}
</div>
<div class="progress">
	<div class="progress-dot complete-dot" />
	<div
		class="progress-dot {(page === 'username' && 'complete-dot') ||
			(page === 'password' && 'complete-dot')}"
	/>
	<div class="progress-dot {page === 'password' && 'complete-dot'}" />
</div>

<style>
	.form-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-container :global(.prev-btn) {
		all: unset;
		position: absolute;
		top: 30px;
		left: 10px;

		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px 10px 5px 7.5px;
		color: var(--base_30-white);
		transition: all 100ms ease-in;
	}

	.form-container :global(.prev-btn):hover {
		color: var(--base_30-red);
	}

	.progress {
		display: flex;
	}

	.progress-dot {
		padding: 2.5px;
		margin: 7.5px;
		background-color: var(--base_30-grey_fg2);
	}

	.complete-dot {
		background-color: var(--base_30-green);
	}
</style>
