<script>
  import "../css/app.css";
  export let label = "";
  import Badge from "./Badge.svelte";
  export let onClick = () => {};
  export let onDragStart = () => {};
</script>

<div
  class="cursor-pointer max-height-item padding-05 bg-dark text-white border-radius dark-hover diplay-flex espace-content ma-05 "
  on:click={onClick}
  draggable="true"
  on:dragstart={onDragStart}
  id={label._id}
>
  <div class="padding-05 font-bold text-ellips">
    {label.label}
  </div>
  <Badge label={label.status} />
</div>
