<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, ...restProps }: { children: Snippet; onclick?: () => void } =
    $props();
</script>

<button class="outline" {...restProps}>
  {@render children()}
</button>

<style>
  button {
    border: unset;
    padding-block: var(--py, 3px);
    padding-inline: var(--px, 6px);
  }
</style>
