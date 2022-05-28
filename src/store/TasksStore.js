import { writable } from "svelte/store"
import TodoRepository from "../repositorys/TodoRepository"


export const TaskStore = writable({}, (set) => {
    set(TodoRepository.getList())
})