import { get, type Writable } from 'svelte/store'
import { active_aside_component, current_page, somethingIsOpen } from './store'

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