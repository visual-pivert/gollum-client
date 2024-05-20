import type { Writable } from 'svelte/store'
import { current_page, somethingIsOpen } from './store/store'

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
