<script lang="ts">
	import { ChevronLeft, Eye, EyeOff } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { z, type typeToFlattenedError } from 'zod';

	export let page;
	let password = '';
	let confirm = '';

	let hidePassword = true;
	let hideConfirm = true;

	let passwordRef: HTMLInputElement | undefined;

	onMount(() => {
		passwordRef?.focus();
	});

	const passwordSchema = z
		.object({
			password: z
				.string()
				.min(1, 'Password required')
				.max(64, 'Password must be less than 64 characters'),
			confirm: z.string().min(1, 'Please confirm your password')
		})
		.refine((data) => data.password === data.confirm, {
			message: "Passwords don't match",
			path: ['confirm'] // path of error
		});
	type passwordSchemaType = z.infer<typeof passwordSchema>;
	let formError: null | typeToFlattenedError<passwordSchemaType> = null;

	const onPrev = () => {
		page = 'username';
	};
	const onNext = () => {
		const result = passwordSchema.safeParse({ password, confirm });
		if (!result.success) {
			formError = result.error.flatten();
			return;
		}
		// handleSubmit();
	};
	// const handleSubmit = () => {};
</script>

<button class="prev-btn" on:click={onPrev}><ChevronLeft /></button>
<form action="">
	<div class="form-field">
		<label for="password">Please Enter a Password</label>

		<div class="input-container">
			{#if hidePassword}
				<input
					type="password"
					name="password"
					id="password"
					bind:value={password}
					bind:this={passwordRef}
				/>
			{:else}
				<input
					type="text"
					name="password"
					id="password"
					bind:value={password}
					bind:this={passwordRef}
				/>
			{/if}
			<button
				class="toggle-pwd"
				type="button"
				on:click|preventDefault={() => {
					hidePassword = !hidePassword;
				}}
			>
				{#if hidePassword}
					<Eye />
				{:else}
					<EyeOff />
				{/if}
			</button>
		</div>
		{#if formError?.fieldErrors.password}
			<p class="err-msg">{formError?.fieldErrors.password[0]}</p>
		{/if}
	</div>
	<div class="form-field">
		<label for="confirm-password">Confirm Password</label>
		<div class="input-container">
			{#if hideConfirm}
				<input type="password" name="confirm-password" id="confirm-password" bind:value={confirm} />
			{:else}
				<input type="text" name="confirm-password" id="confirm-password" bind:value={confirm} />
			{/if}
			<button
				class="toggle-pwd"
				type="button"
				on:click|preventDefault={() => {
					hideConfirm = !hideConfirm;
				}}
			>
				{#if hideConfirm}
					<Eye />
				{:else}
					<EyeOff />
				{/if}
			</button>
		</div>
		{#if formError?.fieldErrors.confirm}
			<p class="err-msg">{formError?.fieldErrors.confirm[0]}</p>
		{/if}
	</div>
	<button class="submit-btn" type="button" on:click|preventDefault={onNext}>Submit</button>
</form>

<style>
	.input-container {
		width: 100%;
		position: relative;
	}
	.toggle-pwd {
		all: unset;
		position: absolute;
		right: 7.5px;
		top: 4px;
	}
</style>
