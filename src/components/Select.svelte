<script>
  import "../css/app.css";
  export let value = "";

  export let options = [];
</script>

<select class="border-radius ma-1 padding-1 dark-hover" bind:value>
  {#each options as op}
    <option value={op}> {op}</option>
  {/each}
</select>
