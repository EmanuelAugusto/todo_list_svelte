<script>
  import "../css/app.css";
  export let label = "";
  import Badge from "./Badge.svelte";
</script>

<div
  class="padding-1 flex-container-row ma-1 bg-dark text-white border-radius dark-hover"
>
  <div class="ma-01 label">
    {label.label}
  </div>
  <Badge label={label.status} />
</div>
