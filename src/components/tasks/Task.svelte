<script>
  import Badge from "../Badge.svelte";
  export let taskDetails = null;
</script>

<div>
  <div class="diplay-flex espace-content align-items-center">
    <div><h1>{taskDetails.label}</h1></div>
    <div class="flex-end">
      <Badge label={taskDetails.status} color="gray-alt-color" />
    </div>
  </div>
  <div>
      <p class="font-bold"> Descrição da atividade:</p>
      {taskDetails.description}
  </div>
</div>
