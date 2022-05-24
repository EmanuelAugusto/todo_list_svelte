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
        return result ? result : []
    }

    clearAllList() {
        localStorage.removeItem(this.KEYLOCALSTORAGE)
    }

    setItensInLocalStorage(value) {
        const TodoAlreadySaved = this.getList();

        const NewsTodos = [...TodoAlreadySaved, value]

        localStorage.setItem(this.KEYLOCALSTORAGE, JSON.stringify(NewsTodos))
    }
}

export default new TodoRepository