<script>
  import Button from "./Button.svelte";
  export let value;
  export let onCloseModal = () => {};
  let classHide = "";

  function detect(newValue) {
    if (!newValue) {
      onCloseModal();
    } 
  }

  $: detect(value);
</script>

<dialog open={value} class={`bg-less-black`}>
  <div class={`diplay-flex espace-content`}>
    <div><slot name="title" /></div>
    <div class="flex-end">
      <Button
        label="X"
        onClick={() => {
          value = false;
        }}
      />
    </div>
  </div>
  <div><slot name="content" /></div>
</dialog>

<style>
  dialog {
    width: 75%;
    height: 80%;
    border: 0px;
    -webkit-box-shadow: 0px 0px 23px 6px #000000;
    box-shadow: 0px 0px 23px 6px #000000;
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 255, 0.2);
  }

  dialog[open] {
    opacity: 1;
    pointer-events: inherit;
    -webkit-animation: show 0.5s ease normal;
  }

  @-webkit-keyframes show {
    from {
      transform: translateX(-110%);
    }
    to {
      transform: translateY(0%);
    }
  }
</style>
