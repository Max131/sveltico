<script>
  import SearchBar from "./SearchBar.svelte";
  export let data = [];
  export let itemsPerPage = 10;
  export let isTable;

  let results = data;
  let currentPage = 0;

  itemsPerPage ||= results.length;
  const handleClickPagination = ({ currentTarget }) => {
    const { page } = currentTarget.dataset;
    currentPage = +page;
  };

  $: paginatedData = results?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  $: PAGES = Math.ceil(results?.length / itemsPerPage);
</script>

<SearchBar {data} fields={["first_name", "email"]} bind:results />
{#if isTable}
  <table class="striped">
    <slot name="head" />
    <tbody>
      {#each paginatedData ?? [] as item}
        <slot {item} />
      {/each}
    </tbody>
  </table>
{:else}
  <slot name="head" />
  {#each paginatedData ?? [] as item}
    <slot {item} />
  {/each}
{/if}

{#if itemsPerPage !== results?.length}
  <figure>
    <div role="group">
      {#if PAGES}
        {#each Array(PAGES) as _, index}
          <button
            class={currentPage !== index ? "" : "outline secondary"}
            data-page={index}
            on:click={handleClickPagination}>{index + 1}</button
          >
        {/each}
      {/if}
    </div>
  </figure>
{/if}

<style>
  table {
    table-layout: fixed;
  }
</style>
