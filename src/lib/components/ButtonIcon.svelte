<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    loading = false,
    variant = "outline",
    tooltip,
    tooltipPosition,
    ...restProps
  }: {
    children: Snippet;
    loading?: boolean;
    disabled?: boolean;
    tooltip?: string;
    tooltipPosition?: "left" | "right" | "top" | "bottom";
    variant?: string;
    onclick?: () => void;
  } = $props();
</script>

<button
  class={variant}
  aria-busy={loading}
  data-tooltip={tooltip}
  data-placement={tooltipPosition}
  {...restProps}
>
  {@render children()}
</button>

<style>
  button {
    width: var(--width, auto);
    height: var(--height, auto);

    padding-block: var(--py, 3px);
    padding-inline: var(--px, 6px);

    border-width: var(--border-width, var(--pico-border-width));
  }
</style>
