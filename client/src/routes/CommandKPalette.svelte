<script lang="ts">
	import themes from './themes.json';
	import { themeStore } from '../stores/theme.js';
	import { onMount } from 'svelte';
	import { fuzzyFind } from '../util/fuzzy-find';

	let themeNames = Object.keys(themes).sort();

	let themeSearchInput = '';
	let themeSearchBar: HTMLInputElement | undefined;

	export let isCommandKOpen: boolean;

	onMount(() => {
		if (isCommandKOpen === true && themeSearchBar !== undefined) {
			themeSearchBar.focus();
		}
	});

	const selectTheme = (theme: string) => {
		if (!(theme in themes)) return;
		themeStore.set(theme);
		const bodyStyles = document.body.style;
		const themeBases = themes[theme];
		for (let base in themeBases) {
			if (base === 'type') continue;
			for (let property in themeBases[base]) {
				bodyStyles.setProperty(`--${base}-${property}`, `${themeBases[base][property]}`);
			}
		}
		isCommandKOpen = false;
	};

	const capitalizeWords = (string: string) => {
		const words = string.split(' ');
		const capitalWords = words
			.map((word) => {
				return word[0].toUpperCase() + word.substring(1);
			})
			.join(' ')
			.split('-')
			.map((word) => {
				return word[0].toUpperCase() + word.substring(1);
			})
			.join('-');
		return capitalWords;
	};
</script>

<!-- TODO: make dropdown accessible with arrow keys: https://medium.com/lego-engineering/building-accessible-select-component-in-react-b61dbdf5122f -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="command-k" on:click={(e) => e.stopPropagation()}>
	<div class="search-bar">
		<div>Themes</div>
		<input type="text" bind:value={themeSearchInput} bind:this={themeSearchBar} />
	</div>
	<div class="themes-container">
		{#if themeSearchInput === ''}
			{#each themeNames as theme}
				<button class="theme" on:click={() => selectTheme(theme)}
					>{capitalizeWords(theme.replace('_', ' '))}</button
				>
			{/each}
		{:else if fuzzyFind( themeNames.map( (t) => t.replace('_', ' ') ), themeSearchInput.toLowerCase() ).length !== 0}
			{#each fuzzyFind( themeNames.map( (t) => t.replace('_', ' ') ), themeSearchInput.toLowerCase() ) as theme}
				<button class="theme" on:click={() => selectTheme(theme.replace(' ', '_'))}
					>{capitalizeWords(theme.replace('_', ' '))}</button
				>
			{/each}
		{:else}
			<div class="no-match-msg">No match</div>
		{/if}
	</div>
</div>

<style>
	.command-k {
		border: solid 3px var(--base_30-line);
		position: absolute;
		padding: 10px 15px;

		background-color: var(--base_30-darker_black);
		color: var(--base_16-base05);

		width: 500px;
		max-height: 300px;
		overflow: hidden;

		display: flex;
		flex-direction: column;

		font-size: 16px;
		font-family: 'JetBrains Mono', monospace;
	}

	.search-bar {
		margin-bottom: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.search-bar div {
		padding: 5px 10px;
		margin-bottom: 10px;
		background-color: var(--base_30-green);
		color: var(--base_30-black);
	}

	.search-bar input {
		all: unset;
		width: 100%;
		background-color: var(--base_16-base03);
		color: var(--base_30-white);
		padding: 5px 10px;

		box-sizing: border-box;
	}

	.themes-container {
		flex-direction: column;
		overflow-y: auto;

		display: flex;

		/* Hide scrollbar */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}
	.themes-container::-webkit-scrollbar {
		display: none;
	}

	.theme {
		all: unset;
		padding: 5px 10px;
		display: flex;
	}
	.theme:hover {
		background-color: var(--base_16-base03);
		color: var(--base_30-white);
	}

	.no-match-msg {
		padding: 5px 10px;
		color: var(--base_30-red);
	}
</style>
