import { get, type Writable, } from 'svelte/store'
import { active_aside_component, current_view, current_directory_path, close_function_overlays } from './store'


export function closeAllDropdown() {
    get(close_function_overlays).forEach((func) => {
        func()
    })
    close_function_overlays.set([])
}


export function openDropdown(writable: Writable<Boolean>, onOpen: () => void = () => {}): void {
    if(get(writable)) {
        writable.update(() => false)
    } else {
        closeAllDropdown()
        
        close_function_overlays.update(() => [...get(close_function_overlays), () => writable.set(false) ])

        onOpen()  
        writable.update((value) => !value)   
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
export function updateCurrentDirectoryPath(folder: string) {
    current_directory_path.update(() => [...get(current_directory_path), folder])   
}

export function backToPreviewsDirectory() {
    get(current_directory_path).pop()
    current_directory_path.set([...get(current_directory_path)])
}
