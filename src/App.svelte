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
  import { TaskStore } from "./store/TasksStore";
  import "./css/app.css";

  let optionsSelect = [];
  let optionsSelectPriority = TodoRepository.PRIORITYLIST;

  let _id = null;
  let valueToInput = "";
  let valueToSelect = "A fazer";
  let valueTextArea = "";
  let valueToSelectPriority = "Baixa";

  let taskDetails = null;

  let modalStateDetailTask = false;
  let modalState = false;

  onMount(async () => {
    optionsSelect = TodoRepository.getStatusList();
  });

  const save = () => {
    TodoRepository.save({
      label: valueToInput,
      description: valueTextArea,
      status: valueToSelect,
      priority: valueToSelectPriority,
      _id,
    });

    clearForm();

    OpenOrCloseModal();
  };

  const ClearAllTasks = () => {
    TodoRepository.clearAllList();
  };

  const SetValues = (task) => {
    valueToInput = task.label;
    valueToSelect = task.status;
    valueTextArea = task.description;
    _id = task._id;
    valueToSelectPriority = task?.priority || "Baixa";
  };

  const clearForm = () => {
    SetValues({
      label: "",
      description: "",
      status: "A fazer",
      _id: null,
      priority: "Baixa",
    });
  };

  const OpenOrCloseModal = (task = null) => {
    modalState = !modalState;
    if (task) {
      SetValues(task);
    }
  };

  const DeleteTask = (_id) => {
    TodoRepository.delete(_id);
    OpenOrCloseModalDetailTask();
  };

  const OpenOrCloseModalDetailTask = (task) => {
    if (task) {
      taskDetails = task;
    }
    modalStateDetailTask = !modalStateDetailTask;
  };

  const EditTask = (task) => {
    OpenOrCloseModalDetailTask(null);
    OpenOrCloseModal(task);
  };
</script>

<main id="app-body">
  <Dialog
    bind:value={modalState}
    onCloseModal={() => {
      clearForm();
    }}
  >
    <h2 slot="title" class="text-white">{_id ? "Editar Task" : "Nova task"}</h2>
    <div slot="content">
      <div class="flex-container-wrap text-white max-width-mobile">
        Titulo:
        <Input bind:value={valueToInput} />
        Status da Atividade:
        <Select bind:value={valueToSelect} bind:options={optionsSelect} />
        Prioridade da Atividade:
        <Select
          bind:value={valueToSelectPriority}
          bind:options={optionsSelectPriority}
        />
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

  {#if taskDetails}
    <Dialog bind:value={modalStateDetailTask}>
      <div slot="title" class="diplay-flex align-items-center">
        <h2 class="text-white">Detalhes da task</h2>
        <div>
          <Button
            label="Editar"
            onClick={() => {
              EditTask(taskDetails);
            }}
          />
          <Button
            label="Apagar"
            colorBtn="dark-red"
            onClick={() => {
              DeleteTask(taskDetails._id);
            }}
          />
        </div>
      </div>
      <div slot="content" class="text-white">
        <TaskDetails bind:taskDetails />
      </div>
    </Dialog>
  {/if}

  <h2 class="text-white">Todo List com Svelte</h2>
  <div class="diplay-flex width-100 justify-center espace-content">
    <Button
      label="Criar Task"
      onClick={() => {
        OpenOrCloseModal();
      }}
    />

    <Button label="Limpar todas tasks" onClick={ClearAllTasks} />
  </div>
  <div class="flex-container overflow-x">
    {#each Object.entries($TaskStore) as item}
      <div class="flex-container-width height-column-items">
        <div class="text-center color-dark-grey ma-1  padding-03 border-radius">
          <h4 class="text-white">{item[0]}</h4>
        </div>
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
