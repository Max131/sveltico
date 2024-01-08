import { writable } from "svelte/store";

export const createDataStore = (data) => {
	const { subscribe, set, update } = writable({
		data: data,
		filtered: data,
		search: "",
	});

	return {
		subscribe,
		set,
		update,
	};
};

export const searchInDataStore = (store) => {
	const searchTerm = store.search.toLowerCase() || "";
	store.filtered = store.data.filter((item) =>
		item.searchTerms.toLowerCase().includes(searchTerm),
	);
};
