import {
	type GameState,
	type WordDictionary,
	wordDictionary,
} from "@/schemas/word-schema";

export function getLocalStorage(date: Date) {
	const value = wordDictionary.safeParse(
		JSON.parse(localStorage.getItem("words") ?? "{}"),
	);
	if (value.success) {
		return value.data[date.toISOString().slice(0, 10)];
	}
	return null;
}

export function setLocalStorage({
	data,
	date,
}: {
	data: GameState;
	date: Date;
}): void {
	const storage = localStorage.getItem("words");
	let value = {} as WordDictionary;
	if (storage !== null) {
		value = wordDictionary.parse(JSON.parse(storage));
	}
	value[date.toISOString().slice(0, 10)] = data;
	localStorage.setItem("words", JSON.stringify(value));
}

export function getHistory(): WordDictionary {
	const storage = localStorage.getItem("words");
	if (storage !== null) {
		return wordDictionary.parse(JSON.parse(storage));
	}
	return {};
}
