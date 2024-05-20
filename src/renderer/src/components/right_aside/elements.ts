import { RightButtons } from "./RightButtons";
import CommitPannel from "../CommitPannel.svelte";
import CommitsList from "../CommitsList.svelte";
import { get } from "svelte/store";
import { active_aside_component } from "../../store/store";




const aside_components: {name: string, component: any, btn_icon: string, btn_position: 'top' | 'bottom'}[] = [
    {name: 'commit', component: CommitPannel, btn_icon: 'ri-git-commit-line', btn_position: 'top'},
    {name: 'commit_list', component: CommitsList, btn_icon: 'ri-list-check-2', btn_position: 'top'},
    {name: 'merge', component: null, btn_icon: 'ri-git-merge-line', btn_position: 'top'},
    {name: 'upload', component: null, btn_icon: 'ri-upload-2-line', btn_position: 'top'},
    {name: 'notification', component: null, btn_icon: 'ri-notification-2-line', btn_position: 'bottom'},

]



export const top_buttons: RightButtons[] = []
export const bottom_buttons: RightButtons[] = []

// aside_components.forEach((item) => {
//     if(item.btn_position == 'top') {
//         top_buttons.push(new RightButtons(item.name, item.btn_icon))
//     } else {
//         bottom_buttons.push(new RightButtons(item.name, item.btn_icon))
//     }
// })

export const contents = aside_components.reduce((acc, item) => {

    if(item.btn_position == 'top') {
        top_buttons.push(new RightButtons(item.name, item.btn_icon))
    } else {
        bottom_buttons.push(new RightButtons(item.name, item.btn_icon))
    }
    
    acc[item.name] = item.component;
    return acc;
}, {} as { [key: string]: any });



const all_buttons = [...top_buttons, ...bottom_buttons]

export const right_events = all_buttons.reduce((acc, button) => {
    acc[button.name] = new CustomEvent(button.name)
    document.addEventListener(button.name, () => {
        if(get(active_aside_component) != button.name) {
            button.onClick()
        }
    })
    return acc
}, {} as {[key: string]: CustomEvent})
