<script lang="ts">
	import { onMount } from 'svelte';
	import { z, type typeToFlattenedError } from 'zod';

	export let page;
	let firstName = '';
	let lastName = '';
	let email = '';

	let firstNameRef: HTMLInputElement | undefined;

	onMount(() => {
		firstNameRef?.focus();
	});

	const detailsSchema = z.object({
		firstName: z
			.string()
			.min(1, 'First name required')
			.max(64, 'First name must be less than 64 characters'),
		lastName: z
			.string()
			.min(1, 'Last name required')
			.max(64, 'Last name must be less than 64 characters'),
		email: z
			.string()
			.min(1, 'Email required')
			.max(64, 'Email name must be less than 64 characters')
			.email({ message: 'Please enter a valid email' })
		// TODO: need to check if the email is unique
	});
	type detailsSchemaType = z.infer<typeof detailsSchema>;
	let formError: null | typeToFlattenedError<detailsSchemaType> = null;

	const onNext = () => {
		const result = detailsSchema.safeParse({ firstName, lastName, email });
		if (!result.success) {
			formError = result.error.flatten();
			return;
		}
		page = 'username';
	};
</script>

<form action="">
	<div class="form-field">
		<div class="names">
			<label class="first-name-label" for="first-name">First Name</label>
			<input
				class="first-name-input"
				type="text"
				name="first-name"
				id="first-name"
				bind:value={firstName}
				bind:this={firstNameRef}
			/>
			{#if formError?.fieldErrors.firstName}
				<p class="err-msg fn-err">{formError?.fieldErrors.firstName[0]}</p>
			{/if}
			<label class="last-name-label" for="last-name">Last Name</label>
			<input
				class="last-name-input"
				type="text"
				name="last-name"
				id="last-name"
				bind:value={lastName}
			/>
			{#if formError?.fieldErrors.lastName}
				<p class="err-msg ln-err">{formError?.fieldErrors.lastName[0]}</p>
			{/if}
		</div>
	</div>
	<div class="form-field">
		<label for="email">Email</label>
		<input class="single-input" type="text" name="email" id="email" bind:value={email} />
		{#if formError?.fieldErrors.email}
			<p class="err-msg">{formError?.fieldErrors.email[0]}</p>
		{/if}
	</div>
	<button class="submit-btn" on:click={onNext}>Next</button>
</form>
<p class="log-in-redirect">
	Already have an account?&nbsp; <a class="log-in-link" href="/auth/login">Log In</a>
</p>

<style>
	.names {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		column-gap: 10px;

		grid-template-areas:
			'fn-label ln-label'
			'fn-input ln-input'
			'fn-err ln-err';
	}
	.first-name-label {
		grid-area: fn-label;
	}
	.first-name-input {
		grid-area: fn-input;
	}
	.last-name-label {
		grid-area: ln-label;
	}
	.last-name-input {
		grid-area: ln-input;
	}
	.fn-err {
		grid-area: fn-err;
	}
	.ln-err {
		grid-area: ln-err;
	}

	.log-in-redirect {
		font-size: 14px;
		display: flex;
	}
	.log-in-link {
		text-decoration: none;
		cursor: pointer;
		color: var(--base_30-blue);
		display: block;
		overflow: hidden;
	}

	.log-in-link::after {
		content: '';
		display: block;
		width: 100%;
		background-color: var(--base_30-blue);
		height: 1.5px;
		transform: translate3d(-100%, 0, 0);
		transition: transform 200ms;
	}

	.log-in-link:hover::after,
	.log-in-link:focus::after {
		transform: translate3d(0, 0, 0);
	}
</style>
