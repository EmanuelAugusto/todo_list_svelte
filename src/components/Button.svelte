<script>
  import "../css/app.css";
  export let label = "Clique Aqui";
  export let onClick = () => {};
  export let colorBtn = "dark-hover";
</script>

<button
  class={`border-radius padding-1 ma-1 bg-dark text-white  cursor-pointer ${colorBtn}`}
  on:click={onClick}
>
  {label}
</button>
