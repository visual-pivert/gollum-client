import { get, type Writable } from 'svelte/store'
import { active_aside_component, active_branch_dropdown, active_project_dropdown, current_view, current_directory_path, active_menu_dropdown } from './store'

export function closeAllDropdown() {
    active_project_dropdown.update(() => false)
    active_branch_dropdown.update(() => false)
    active_menu_dropdown.update(() => false)
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
    current_directory_path.set([folder])
}
export function updateCurrentDirectoryPath(folder: string, level: number = 1) {
    if(get(current_directory_path).length - 1 < level) {
        current_directory_path.update(() => [...get(current_directory_path), folder])     
    } else {
        get(current_directory_path)[level] = folder
        current_directory_path.update(() => [...get(current_directory_path)])
    }
}

export function backToPreviewsDirectory() {
    get(current_directory_path).pop()
}
