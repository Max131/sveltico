<script>
  import "./app.scss";
  import "./variables.css";
  import users from "./data.json";
  import DataTable from "./lib/DataTable.svelte";
  import Modal from "./lib/Modal.svelte";

  let open = false;
</script>

<main class="container">
  <h1>Sit voluptatibus adipisci</h1>
  <DataTable data={users} itemsPerPage={5} isTable let:item>
    <thead slot="head">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tr>
      <td data-title="ID">{item.id}</td>
      <td data-title="Name">{item.first_name}</td>
      <td data-title="email">{@html item.email}</td>
      <td data-title="Actions">
        <button on:click={() => alert(`Deleting: ${item.first_name}`)}
          >&times;</button
        >
        <button>&#128504;</button>
      </td>
    </tr>
  </DataTable>
  <!-- <button type="button" on:click={() => (tran = !tran)}>Animate</button> -->
  <button type="button" on:click={() => (open = !open)}>OpenModal</button>
  <Modal bind:open>
    <p slot="header">Lorem, ipsum dolor.</p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis libero
      aliquam consectetur, veniam repellat id et consequuntur, incidunt eum
      officia necessitatibus, sed sunt deleniti accusantium alias quasi
      delectus. Vitae, nulla!
    </p>
    <div slot="footer">
      <a
        href="#!"
        role="button"
        class="secondary"
        on:click={() => (open = false)}>Delete</a
      >
      <a href="#!" role="button">Save</a>
    </div>
  </Modal>
</main>

<style>
  main {
    margin-block: 3rem;
  }

  td button {
    --pico-border-radius: 0.25em;
  }

  [role="button"] {
    --pico-border-radius: 2em;
  }

  @media (width <= 36rem) {
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
    }

    tr:not(:last-child) {
      border-bottom: 2px solid;
    }

    td::before {
      content: attr(data-title) ": ";
      font-weight: bold;
    }
  }
</style>
