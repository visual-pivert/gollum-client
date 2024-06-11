import { writable, type Writable } from "svelte/store";

export const current_page = writable('login-page')

export const close_function_overlays = writable([])

export const current_view = writable('project_page')

export const active_aside_component = writable('')

export const selected_project = writable('')

export const selected_branch = writable('')

export const current_directory_path: Writable<string[]> = writable([''])

export const new_project_data: Writable<{[key: string]: any}> = writable({
    project_name: "",
    readme: "",
    contributors: []
})


export const current_directory = writable([])

export const is_local_project = writable(false)

export const local_project_list = writable([])
export const not_cloned_project_list = writable([])

export const branch_list = writable([])
