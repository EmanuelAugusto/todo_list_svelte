<script>
  import { onMount } from "svelte";
  import Input from "./components/Input.svelte";
  import Button from "./components/Button.svelte";
  import Item from "./components/Item.svelte";
  import Select from "./components/Select.svelte";
  import TodoRepository from "./repositorys/TodoRepository";
  import "./css/app.css";

  let TodoList = [];
  let optionsSelect = TodoRepository.STATESFROMTODOLIST;

  onMount(() => {
    TodoList = TodoRepository.getList();
  });

  let valueToInput = "";
  let valueToSelect = "A fazer";

  const save = () => {
    TodoRepository.setItensInLocalStorage({
      label: valueToInput,
      status: valueToSelect,
    });

    TodoList = TodoRepository.getList();
  };

  const ClearAllTasks = () => {
    TodoRepository.clearAllList();
    TodoList = TodoRepository.getList();
  };
</script>

<main>
  <h2>Todo List com Svelte</h2>
  <div class="diplay-flex width-100 justify-center espace-content">
    <Input bind:value={valueToInput} />
    <Select bind:value={valueToSelect} bind:options={optionsSelect} />
    <Button label="Salvar" onClick={save} />
    <Button label="Limpar todas tasks" onClick={ClearAllTasks} />
  </div>
  <div class="flex-container ">
    {#each TodoList as item}
      <Item label={item} />
    {/each}
  </div>
</main>

<style>
</style>
