<script>
  import "../css/app.css";
  export let label = "Clique Aqui";
  export let onClick = () => {};
</script>

<button class="border-radius padding-1 ma-1 bg-dark text-white dark-hover" on:click={onClick}>
  {label}
</button>
