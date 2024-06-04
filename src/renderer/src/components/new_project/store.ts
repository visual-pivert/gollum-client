import { writable } from "svelte/store"
import { updateCurrentView } from "../../event"
import { page_list } from "../left_aside/left_aside_buttons"
import NewProjectPage from "./NewProjectPage.svelte"

export const new_project = new CustomEvent('new_project')

page_list['new_project'] = NewProjectPage

document.addEventListener('new_project', () => {
    updateCurrentView('new_project')
})

// export const show_tech_list = writable(false)

