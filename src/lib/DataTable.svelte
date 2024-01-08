<script>
  import SearchBar from "./SearchBar.svelte";
  export let data = [];
  export let itemsPerPage = 10;
  export let isTable;

  itemsPerPage ||= data.length;

  let results;
  let currentPage = 0;

  const handlePagination = ({ currentTarget }) => {
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
      {#if paginatedData}
        {#each paginatedData as item}
          <slot {item} />
        {/each}
      {/if}
    </tbody>
  </table>
{:else}
  <slot name="head" />
  {#if paginatedData}
    {#each paginatedData as item}
      <slot {item} />
    {/each}
  {/if}
{/if}

{#if itemsPerPage !== data.length}
  <figure>
    <div role="group">
      {#if PAGES}
        {#each Array(PAGES) as _, index}
          <button
            class={currentPage !== index ? "" : "outline secondary"}
            data-page={index}
            on:click={handlePagination}>{index + 1}</button
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
