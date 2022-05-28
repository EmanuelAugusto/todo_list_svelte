<script>
  import "../css/app.css";
  export let value = "";
  export let required = false;
  export let placeholder = "";
  export let onInput = () => {};
</script>

<input
  class="border-radius ma-1 padding-1 border-radius-input"
  type="text"
  bind:value
  {placeholder}
  {required}
  on:input={onInput}
/>

<style>
</style>
