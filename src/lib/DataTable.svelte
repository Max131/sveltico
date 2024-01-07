<script>
  export let data = [];
  export let itemsPerPage = 10;

  let currentPage = 0;
  let paginatedData = data;

  const PAGES = Math.ceil(data.length / itemsPerPage);

  const handlePagination = ({ currentTarget }) => {
    const { page } = currentTarget.dataset;
    currentPage = +page;
  };

  $: paginatedData = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );
</script>

<table class="striped">
  <slot name="head" />
  <tbody>
    {#each paginatedData as item}
      <slot {item} />
    {/each}
  </tbody>
</table>

<figure>
  <div role="group">
    {#each Array(PAGES) as _, index}
      <button
        class={currentPage !== index ? "" : "outline secondary"}
        data-page={index}
        on:click={handlePagination}>{index + 1}</button
      >
    {/each}
  </div>
</figure>

<style>
  table {
    table-layout: fixed;
  }
</style>
