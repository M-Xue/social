<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { z, type typeToFlattenedError } from 'zod';

	export let page;
	let username = '';

	let usernameRef: HTMLInputElement | undefined;

	onMount(() => {
		usernameRef?.focus();
	});

	const usernameSchema = z.object({
		username: z
			.string()
			.min(1, 'Username required')
			.max(64, 'Username must be less than 64 characters')
		// TODO: need to check if the username is unique
	});
	type usernameSchemaType = z.infer<typeof usernameSchema>;
	let formError: null | typeToFlattenedError<usernameSchemaType> = null;

	const isUsernameUnique = () => {};

	const onPrev = () => {
		page = 'details';
	};
	const onNext = () => {
		const result = usernameSchema.safeParse({ username });
		if (!result.success) {
			formError = result.error.flatten();
			return;
		}
		page = 'password';
	};
</script>

<button class="prev-btn" on:click={onPrev}><ChevronLeft /></button>
<form action="">
	<div class="form-field">
		<label for="username">Please Enter a Username</label>
		<input
			type="text"
			name="username"
			id="username"
			bind:value={username}
			bind:this={usernameRef}
		/>
		{#if formError?.fieldErrors.username}
			<p class="err-msg">{formError?.fieldErrors.username[0]}</p>
		{/if}
	</div>
	<button class="submit-btn" on:click={onNext}>Next</button>
</form>

<style>
	form {
		width: 100%;
	}
</style>
