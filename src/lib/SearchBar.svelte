<script>
  import { createDataStore, searchInDataStore } from "./stores/listSearch.js";
  import { onDestroy } from "svelte";

  export let data = [];
  export let results = [];
  export let fields = ["name"];

  const addSearchTerms = (item) => {
    const searchTerms = fields.map((field) => item[field]).join(" ");
    return searchTerms;
  };

  const normalizedData = data.map((item) => ({
    ...item,
    searchTerms: addSearchTerms(item),
  }));

  const searchableData = createDataStore(normalizedData);
  const unsubscribe = searchableData.subscribe((store) =>
    searchInDataStore(store),
  );

  onDestroy(() => {
    unsubscribe();
  });

  $: results = $searchableData.filtered;
</script>

<!-- svelte-ignore a11y-autofocus -->
<input type="search" bind:value={$searchableData.search} autofocus />
