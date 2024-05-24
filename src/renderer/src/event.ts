import { get, type Writable } from 'svelte/store'
import { active_aside_component, current_page, current_view_path, somethingIsOpen } from './store'

function $<T>(writable: Writable<T>): T {
    let v: T
    writable.subscribe(value => v = value)
    return v
}

export function openDropdown(writable: Writable<boolean>): void {
    writable.update(() => !$(writable))
    somethingIsOpen.update(() => $(writable))
}

export function updateCurrentPage(page: string): void {
    current_page.update(() => page)
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

export function resetCurrentViewPath(folder: string) {
    current_view_path.set([folder])
}
export function updateCurrentViewPath(folder: string, level: number = 1) {
    if(get(current_view_path).length - 1 < level) {
        current_view_path.update(() => [...get(current_view_path), folder])     
    } else {
        get(current_view_path)[level] = folder
        current_view_path.update(() => [...get(current_view_path)])
    }
}

export function backCurrentView() {
    get(current_view_path).pop()
}
