import Uuid from "../libs/Uuid"
import { DateTime } from "../libs/moment"
import { TaskStore } from "../store/TasksStore"

class TodoRepository {

    KEYLOCALSTORAGE = "TODO"

    STATESFROMTODOLIST = [
        { status: "A fazer", color: "" },
        { status: "Fazendo", color: "" },
        { status: "Impedidas", color: "" },
        { status: "Concluidas", color: "" }
    ]

    PRIORITYLIST = [
        "Baixa",
        "Média",
        "Alta"
    ]

    #getItensFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.KEYLOCALSTORAGE))
    }

    #getIndex(_id) {
        const FromLocalStorage = this.#getItensFromLocalStorage();

        return FromLocalStorage.findIndex(t => t._id === _id)
    }

    #persist(data) {
        localStorage.setItem(this.KEYLOCALSTORAGE, JSON.stringify(data))
    }

    #create(value) {
        const FromLocalStorage = this.#getItensFromLocalStorage();
        const TodoAlreadySaved = FromLocalStorage ? FromLocalStorage : [];

        value._id = Uuid();
        value.updated_at = null;
        value.created_at = DateTime();

        const NewsTodos = [...TodoAlreadySaved, value]

        this.#persist(NewsTodos)
    }

    #update(task) {
        const FromLocalStorage = this.#getItensFromLocalStorage();

        if (FromLocalStorage) {
            const index = this.#getIndex(task._id)

            task.created_at = FromLocalStorage[index]?.created_at || DateTime()
            task.updated_at = DateTime();

            FromLocalStorage[index] = task;

            this.#persist(FromLocalStorage)
        }
    }

    getList() {
        const result = this.#getItensFromLocalStorage();
        const resultCloned = result ? result : [];
        const ArrayWithKeys = {};

        const STATESFROMTODOLIST = this.getStatusList()

        for (const status of STATESFROMTODOLIST) {
            const TodoWithStatus = resultCloned.filter((td) => td.status === status)
            ArrayWithKeys[status] = [...TodoWithStatus]
        }

        return ArrayWithKeys
    }

    clearAllList() {
        localStorage.removeItem(this.KEYLOCALSTORAGE)

        TaskStore.set(this.getList())
    }

    save(task) {
        if (task._id) {
            this.#update(task)
        } else {
            this.#create(task)
        }

        TaskStore.set(this.getList())
    }

    delete(_id) {
        const FromLocalStorage = this.#getItensFromLocalStorage();
        const TodoAlreadySaved = FromLocalStorage ? FromLocalStorage : [];

        const index = this.#getIndex(_id)

        TodoAlreadySaved.splice(index, 1);

        this.#persist(TodoAlreadySaved)

        TaskStore.set(this.getList())
    }

    getStatusList() {
        return this.STATESFROMTODOLIST.map(s => s.status)
    }

}

export default new TodoRepository