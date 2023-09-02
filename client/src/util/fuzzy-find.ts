// Source: https://www.30secondsofcode.org/js/s/levenshtein-distance
const levenshteinDistance = (s: string, t: string) => {
	if (!s.length) return t.length;
	if (!t.length) return s.length;
	const arr = [];
	for (let i = 0; i <= t.length; i++) {
		arr[i] = [i];
		for (let j = 1; j <= s.length; j++) {
			arr[i][j] =
				i === 0
					? j
					: Math.min(
							arr[i - 1][j] + 1,
							arr[i][j - 1] + 1,
							arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
					  );
		}
	}
	return arr[t.length][s.length];
};

export const fuzzyFind = (words: string[], search: string) => {
	// * This implementation allows misspelling of the word
	const inputMatches = words.filter((word) => {
		// const inputLen = search.length;

		if (levenshteinDistance(search, word.slice(0, search.length)) <= 1 || word.includes(search)) {
			return true;
		}
	});

	if (inputMatches?.length === 0) {
		return [];
	}

	const levenshteinDistanceSort: string[][] = []; // Could use an object here instead of an array to reduce space complexity but that would increase the time complexity because you need to check if the distance is in the object keys
	inputMatches?.forEach((match) => {
		const dist = levenshteinDistance(search, match);
		if (dist > levenshteinDistanceSort.length - 1) {
			for (const i in [...Array(dist - (levenshteinDistanceSort.length - 1)).keys()]) {
				levenshteinDistanceSort.push([]);
			}
		}
		levenshteinDistanceSort[dist].push(match);
	});

	if (inputMatches) {
		let res: string[] = [];

		levenshteinDistanceSort.forEach((order: string[]) => {
			res = res.concat(order);
		});

		return res;
	} else {
		return [];
	}
};
