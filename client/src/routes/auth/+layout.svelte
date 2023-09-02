<div class="container">
	<div class="form-container"><slot /></div>
</div>

<style>
	.container {
		height: 100vh;
		width: 100vw;
		background-color: var(--base_16-base00);

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form-container {
		background-color: var(--base_30-darker_black);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 65px;
		width: 480px;
		color: var(--base_30-white);
		position: relative;
	}

	.form-container :global(.title) {
		background-color: var(--base_30-green);
		color: var(--base_30-black);
		width: fit-content;
		padding: 5px 10px;
		font-size: 16px;
		font-weight: normal;
	}

	.form-container :global(.form-field) {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.form-container :global(label) {
		margin-bottom: 10px;
	}

	.form-container :global(input) {
		all: unset;
		background-color: var(--base_16-base03);
		color: var(--base_30-white);
		padding: 5px 10px;
		min-width: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.form-container :global(.submit-btn) {
		all: unset;
		padding: 5px 10px;
		box-sizing: border-box;
		background-color: var(--base_30-blue);
		color: var(--base_30-black);
		cursor: pointer;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.form-container :global(form) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		margin: 20px 0;
	}

	.form-container :global(.err-msg) {
		font-size: 12px;
		color: var(--base_30-red);
		margin: 3px 0 0 0;
	}
</style>
