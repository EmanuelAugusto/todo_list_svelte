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

    clearAllList() {
        localStorage.removeItem(this.KEYLOCALSTORAGE)
    }

    setItensInLocalStorage(value) {
        const FromLocalStorage = this.#getItensFromLocalStorage();
        const TodoAlreadySaved = FromLocalStorage ? FromLocalStorage : [];

        const NewsTodos = [...TodoAlreadySaved, value]

        localStorage.setItem(this.KEYLOCALSTORAGE, JSON.stringify(NewsTodos))
    }
}

export default new TodoRepository