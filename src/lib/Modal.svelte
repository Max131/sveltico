<script>
  import { fade, fly } from "svelte/transition";
  export let open = false;
  export let hasCloseButton = true;

  const ANIMATION_DURATION = 200;
  const FLY_Y = -200;

  const handleCloseModal = () => {
    open = false;
  };

  const handleCloseWithEscape = ({ key }) => {
    if (!open) return;
    if (key !== "Escape") return;
    handleCloseModal();
  };

  const handleCloseOnBackgroundClick = ({ target, currentTarget }) => {
    if (target !== currentTarget) return;
    handleCloseModal();
  };

  $: document.documentElement.classList[open ? "add" : "remove"](
    "modal-is-open",
  );
</script>

<svelte:document on:keyup={handleCloseWithEscape} />

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if open}
  <dialog
    {open}
    on:click={handleCloseOnBackgroundClick}
    in:fade={{ duration: ANIMATION_DURATION }}
    out:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION }}
  >
    <article transition:fly|global={{ y: FLY_Y, duration: ANIMATION_DURATION }}>
      {#if $$slots.header}
        <header>
          {#if hasCloseButton}
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <a
              href="#!"
              aria-label="Close"
              class="close"
              on:click={handleCloseModal}
            ></a>
          {/if}
          <slot name="header" />
        </header>
      {/if}
      <slot />
      {#if $$slots.footer}
        <footer>
          <slot name="footer" />
        </footer>
      {/if}
    </article>
  </dialog>
{/if}

<style>
  article {
    --pico-border-radius: 0.5em;
  }
</style>
