<script>
  import { onMount } from "svelte";
  import Input from "./components/Input.svelte";
  import Button from "./components/Button.svelte";
  import Item from "./components/Item.svelte";
  import Select from "./components/Select.svelte";
  import Dialog from "./components/Dialog.svelte";
  import Textarea from "./components/Textarea.svelte";
  import TaskDetails from "./components/tasks/Task.svelte";
  import TodoRepository from "./repositorys/TodoRepository";
  import "./css/app.css";

  let TodoList = {};
  let optionsSelect = TodoRepository.STATESFROMTODOLIST;

  onMount(() => {
    TodoList = TodoRepository.getList();
  });

  let valueToInput = "";
  let valueToSelect = "A fazer";
  let valueTextArea = "";

  let valueNewStatus = "";

  const save = () => {
    TodoRepository.setItensInLocalStorage({
      label: valueToInput,
      description: valueTextArea,
      status: valueToSelect,
    });

    TodoList = TodoRepository.getList();
    OpenOrCloseModal();
  };

  const AddStatus = () => {
    TodoRepository.STATESFROMTODOLIST.push(valueNewStatus);
    TodoList = TodoRepository.getList();
  };

  const ClearAllTasks = () => {
    TodoRepository.clearAllList();
    TodoList = TodoRepository.getList();
  };

  let modalState = false;

  const OpenOrCloseModal = () => {
    modalState = !modalState;
  };

  let taskDetails = null;

  let modalStateDetailTask = false;

  const OpenOrCloseModalDetailTask = (task) => {
    taskDetails = task;
    modalStateDetailTask = !modalStateDetailTask;
  };

  let modalStateAddStatus = false;

  const OpenOrCloseModalAddStatus = () => {
    modalStateAddStatus = !modalStateAddStatus;
  };
</script>

<main id="app-body">
  <Dialog bind:value={modalState}>
    <h2 slot="title">Nova task</h2>
    <div slot="content">
      <div class="flex-container-wrap">
        Titulo:
        <Input bind:value={valueToInput} />
        Status da Atividade:
        <Select bind:value={valueToSelect} bind:options={optionsSelect} />
        Descrição da atividade:
        <Textarea bind:value={valueTextArea} />
      </div>
      <div class="diplay-flex flex-end">
        <Button
          label="Cancelar"
          colorBtn="dark-red"
          onClick={OpenOrCloseModal}
        />
        <Button label="Salvar" onClick={save} />
      </div>
    </div>
  </Dialog>

  <Dialog bind:value={modalStateAddStatus}>
    <h2 slot="title">Adicionar Status</h2>
    <div slot="content">
      <div class="flex-container-wrap">
        Novo Status:
        <Input bind:value={valueNewStatus} />
        Depois ou antes de qual Status?
        <Select bind:value={valueToSelect} bind:options={optionsSelect} />
      </div>
      <div class="diplay-flex flex-end">
        <Button
          label="Cancelar"
          colorBtn="dark-red"
          onClick={OpenOrCloseModalAddStatus}
        />
        <Button label="Salvar" onClick={AddStatus} />
      </div>
    </div>
  </Dialog>

  {#if taskDetails}
    <Dialog bind:value={modalStateDetailTask}>
      <h2 slot="title">Detalhes da task</h2>
      <div slot="content">
        <TaskDetails bind:taskDetails />
      </div>
    </Dialog>
  {/if}

  <h2>Todo List com Svelte</h2>
  <div class="diplay-flex width-100 justify-center espace-content">
    <Button label="Criar Task" onClick={OpenOrCloseModal} />
    <Button label="Configurações" onClick={OpenOrCloseModalAddStatus} />
    <Button label="Limpar todas tasks" onClick={ClearAllTasks} />
  </div>
  <div class="flex-container overflow-x">
    {#each Object.entries(TodoList) as item}
      <div class="flex-container-width">
        <div class="text-center"><h4>{item[0]}</h4></div>
        <div class="padding-05">
          {#each item[1] as todo}
            <Item
              label={todo}
              onClick={() => {
                OpenOrCloseModalDetailTask(todo);
              }}
            />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
</style>
