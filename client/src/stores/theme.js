import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import themes from '../routes/themes.json';

if (browser) {
	const bodyStyles = document.body.style;
	const savedTheme = localStorage.getItem('theme')
	if (savedTheme !== null) {
			const themeBases = themes[savedTheme];
		for (let base in themeBases) {
			if (base === 'type') continue;
			for (let property in themeBases[base]) {
				bodyStyles.setProperty(`--${base}-${property}`, `${themeBases[base][property]}`);
			}
		}
	}
}

export const themeStore = writable((browser && localStorage.getItem('theme')) || 'vscode_dark');
themeStore.subscribe((val) => {
	if (browser) {
		localStorage.theme = val;
	}
});
