// import { get } from "svelte/store"
import { get } from "svelte/store"
import { updateCurrentView } from "../../event"
import ProjectPage from "../ProjectPage.svelte"
import SettingsPage from "../settings_page/SettingsPage.svelte"
import { RightButtons } from "../right_aside/right_aside_buttons"
import { current_view } from "../../store"



let left_components: {name: string, component: any, btn_icon: string, btn_position: 'top' | 'bottom', on_click: () => void | null}[] = [
    {name: 'project_page', btn_icon: 'ri-folder-line', btn_position: 'top', component: ProjectPage, on_click: null},
    {name: 'settings_page', btn_icon: 'ri-settings-3-line', btn_position: 'top', component: SettingsPage, on_click: null},
    {name: 'quit', btn_icon: 'ri-arrow-left-line', btn_position: 'bottom', component: null, on_click: () => document.dispatchEvent(left_buttons_events.project_page)}
    
]




class LeftButtons extends RightButtons  {
    constructor(name: string, icon: string, on_click: ((() => void) | null) = null) {
        super(name, icon, on_click)
    }
    public onClick() {
        updateCurrentView(this.name)
        this.setIsActive()
    }
    protected setIsActive(): void {
        this.isActive = get(current_view) == this.name
    }
}

export const top_left_buttons: LeftButtons[] = []
export const bottom_left_buttons: LeftButtons[] = []


export const page_list = left_components.reduce((acc, item) => {

    let button = (item.on_click) ?
        new LeftButtons(item.name, item.btn_icon, item.on_click)
        : new LeftButtons(item.name, item.btn_icon);

    (item.btn_position == 'top')? top_left_buttons.push(button) : bottom_left_buttons.push(button)

    try {
        if(item.name in acc) {
            throw new Error('key '+item.name+' aleready exist')
        }
        acc[item.name] = item.component
    } catch (error) {
        alert(error)
    }
    
    // acc[item.name] = item.component
    return acc

}, {} as { [key: string]: any })

const all_buttons = [...top_left_buttons, ...bottom_left_buttons]

export const left_buttons_events = all_buttons.reduce((acc, button) => {

    // TODO: on doit tester si le cle existe déjà 
    acc[button.name] = new CustomEvent(button.name)
    document.addEventListener(button.name, () => {
        button.onClick()
    })
    return acc
}, {} as {[key: string]: CustomEvent})

