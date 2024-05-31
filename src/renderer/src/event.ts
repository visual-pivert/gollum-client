import { get, type Writable } from 'svelte/store'
import { active_aside_component, active_branch_dropdown, active_project_dropdown, current_view, project_tree_path } from './store'

export function closeAllDropdown() {
    active_project_dropdown.update(() => false)
    active_branch_dropdown.update(() => false)
}
export function openDropdown(writable: Writable<boolean>): void {
    if(get(writable)) {
        writable.update(() => false)
    } else {
        closeAllDropdown()
        writable.update(() => !get(writable))
    }
}

document.addEventListener('click', (e) => {
    if(!(e.target as HTMLElement).closest('.dropdown-btn')) {
        closeAllDropdown()
    }
})

export function updateCurrentView(page: string): void {
    current_view.update(() => page)
}

export function activeAsideComponent(component: string): void {
    if (get(active_aside_component) !== component) {
        active_aside_component.update(() => component)
    } else {
        active_aside_component.update(() => '')
    }
}

// export function changeCurrentTree(path: string): void {

// }

export function resetCurrentDirectoryPath(folder: string) {
    project_tree_path.set([folder])
}
export function updateCurrentDirectoryPath(folder: string, level: number = 1) {
    if(get(project_tree_path).length - 1 < level) {
        project_tree_path.update(() => [...get(project_tree_path), folder])
    } else {
        get(project_tree_path)[level] = folder
        project_tree_path.update(() => [...get(project_tree_path)])
    }
}

export function backToPreviewsDirectory() {
    get(project_tree_path).pop()
}
