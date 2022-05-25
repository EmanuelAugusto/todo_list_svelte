<script>
  import Button from "./Button.svelte";
  export let value;
</script>

<dialog open={value} width="100%" height="100%">
  <div class="diplay-flex espace-content">
    <div><slot name="title"></slot></div>
    <div class="flex-end">
      <Button
        label="X"
        onClick={() => {
          value = false;
        }}
      />
    </div>
  </div>
  <div><slot name="content"></slot></div>
</dialog>

<style>
  dialog {
    width: 75%;
    height: 80%;
    border: 0px;
    -webkit-box-shadow: 0px 0px 23px 6px #000000;
    box-shadow: 0px 0px 23px 6px #000000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s;
  }
  dialog[open] {
    opacity: 1;
    pointer-events: inherit;
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 255, 0.2);
  }
</style>
