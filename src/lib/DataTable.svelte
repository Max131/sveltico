<script>
  import SearchBar from "./SearchBar.svelte";
  export let data = [];
  export let itemsPerPage = 10;

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
