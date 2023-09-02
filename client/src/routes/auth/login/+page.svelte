<script lang="ts">
	import { Eye, EyeOff, Mouse } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { z, type typeToFlattenedError } from 'zod';

	let email = '';
	let password = '';

	let hidePassword = true;

	let emailRef: HTMLInputElement | undefined;

	onMount(() => {
		emailRef?.focus();
	});

	const loginSchema = z.object({
		email: z
			.string()
			.min(1, 'Please enter your email')
			.email({ message: 'Please enter a valid email' }),
		password: z.string().min(1, 'Please enter your password')
	});

	type loginSchemaType = z.infer<typeof loginSchema>;
	let formError: null | typeToFlattenedError<loginSchemaType> = null;

	const onLogin = () => {
		const result = loginSchema.safeParse({ email, password });
		if (!result.success) {
			formError = result.error.flatten();
			return;
		}
	};
</script>

<h1 class="title">Log In</h1>
<form action="">
	<div class="form-field">
		<label for="email">Email</label>
		<input type="text" name="email" id="email" bind:value={email} bind:this={emailRef} />
		{#if formError?.fieldErrors.email}
			<p class="err-msg">{formError?.fieldErrors.email[0]}</p>
		{/if}
	</div>
	<div class="form-field">
		<label for="password">Password</label>
		<div class="input-container">
			{#if hidePassword}
				<input type="password" name="password" id="password" bind:value={password} />
			{:else}
				<input type="text" name="password" id="password" bind:value={password} />
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
	<button class="submit-btn" on:click={onLogin}>Log In</button>
</form>
<p class="sign-up-redirect">
	Don't have an account?&nbsp; <a class="sign-up-link" href="/auth/sign-up">Sign Up</a>
</p>

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

	.sign-up-redirect {
		font-size: 14px;
		display: flex;
	}
	.sign-up-link {
		text-decoration: none;
		cursor: pointer;
		color: var(--base_30-blue);
		display: block;
		overflow: hidden;
	}

	.sign-up-link::after {
		content: '';
		display: block;
		width: 100%;
		background-color: var(--base_30-blue);
		height: 1.5px;
		transform: translate3d(-100%, 0, 0);
		transition: transform 200ms;
	}

	.sign-up-link:hover::after,
	.sign-up-link:focus::after {
		transform: translate3d(0, 0, 0);
	}
</style>
