import { writable } from "svelte/store";

export const somethingIsOpen = writable(false)
export const active_project_dropdown = writable(false)
export const active_branch_dropdown = writable(false)

export const current_page = writable('project_page')

export const active_aside_component = writable('')
