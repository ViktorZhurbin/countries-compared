<script lang="ts">
  import { View } from "./constants";

  let props: {
    setView: (view: View) => void;
  } = $props();
</script>

<nav>
  <button
    onclick={() => {
      props.setView(View.Map);
    }}
  >
    Map
  </button>
  <button
    onclick={() => {
      props.setView(View.Table);
    }}
  >
    Table
  </button>
</nav>
