import Uuid from "../libs/Uuid"

class TodoRepository {

    KEYLOCALSTORAGE = "TODO"

    STATESFROMTODOLIST = [
        "A fazer",
        "Fazendo",
        "Impedidas",
        "Concluidas"
    ]

    #getItensFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.KEYLOCALSTORAGE))
    }

    getList() {
        const result = this.#getItensFromLocalStorage();
        const ArrayWithKeys = {};

        if (result) {
            for (const status of this.STATESFROMTODOLIST) {
                const TodoWithStatus = result.filter((td) => td.status === status)
                ArrayWithKeys[status] = [...TodoWithStatus]
            }
        }

        return result ? ArrayWithKeys : []
    }

    #getIndex(_id) {
        const FromLocalStorage = this.#getItensFromLocalStorage();

        return FromLocalStorage.findIndex(t => t._id === _id)
    }

    clearAllList() {
        localStorage.removeItem(this.KEYLOCALSTORAGE)
    }

    #update(task) {
        const FromLocalStorage = this.#getItensFromLocalStorage();

        if (FromLocalStorage) {
            const index = this.#getIndex(task._id)

            FromLocalStorage[index] = task;

            this.#persist(FromLocalStorage)
        }
    }

    save(task) {
        if (task._id) {
            this.#update(task)
        } else {
            this.#create(task)
        }
    }

    delete(_id) {
        const FromLocalStorage = this.#getItensFromLocalStorage();
        const TodoAlreadySaved = FromLocalStorage ? FromLocalStorage : [];

        const index = this.#getIndex(_id)

        TodoAlreadySaved.splice(index, 1);

        this.#persist(TodoAlreadySaved)

    }

    #persist(data) {
        localStorage.setItem(this.KEYLOCALSTORAGE, JSON.stringify(data))
    }

    #create(value) {
        const FromLocalStorage = this.#getItensFromLocalStorage();
        const TodoAlreadySaved = FromLocalStorage ? FromLocalStorage : [];

        value._id = Uuid();

        const NewsTodos = [...TodoAlreadySaved, value]

        this.#persist(NewsTodos)
    }
}

export default new TodoRepository