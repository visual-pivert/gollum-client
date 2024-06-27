import { AsideButtons } from "../../assets/ts/AsideButtons";
import CommitPannel from "../CommitPannel.svelte";
import CommitsList from "../CommitsList.svelte";
import { get } from "svelte/store";
import { active_aside_component } from "../../store";
import { activeAsideComponent } from "../../event";
import Ftp from "../FTP/Ftp.svelte";
import MergePannel from "../MergePannel.svelte";
import { notify, show_notif } from "../notification/store";
import Contributor from "../contributor/Contributor.svelte";




const right_components: {name: string, component: any, btn_icon: string, btn_position: 'top' | 'bottom', on_click: () => void | null}[] = [
    {
        name: 'commit',
        btn_icon: 'ri-git-commit-line',
        btn_position: 'top',
        component: CommitPannel,
        on_click: null
    },
    {name: 'commit_list', component: CommitsList, btn_icon: 'ri-list-check-2', btn_position: 'top', on_click: null},
    {name: 'merge', component: MergePannel, btn_icon: 'ri-git-merge-line', btn_position: 'top', on_click: null},
    {name: 'contributor', component: Contributor, btn_icon: 'ri-user-add-line', btn_position: 'top', on_click: null},
    {name: 'ftp', component: Ftp, btn_icon: 'ri-server-line', btn_position: 'top', on_click: null},
    {name: 'notification', component: null, btn_icon: 'ri-notification-2-line', btn_position: 'bottom', on_click: () => {document.dispatchEvent(show_notif)}},
    {name: 'notifyy', component:null, btn_icon: 'ri-notification-badge-line', btn_position: 'bottom', on_click: () => {document.dispatchEvent(notify)}}
]



export class RightButtons extends AsideButtons {
    constructor(name: string, icon: string, on_click: ((() => void) | null) = null) {
        super(name, icon)
        if(on_click) {
            this.onClick = on_click
        }
    }
    public onClick() {
        activeAsideComponent(this.name);
        
    }
}



export const top_buttons: RightButtons[] = []
export const bottom_buttons: RightButtons[] = []

// right_components.forEach((item) => {
//     if(item.btn_position == 'top') {
//         top_buttons.push(new RightButtons(item.name, item.btn_icon))
//     } else {
//         bottom_buttons.push(new RightButtons(item.name, item.btn_icon))
//     }
// })

export const contents = right_components.reduce((acc, item) => {

    let button = (item.on_click) ? 
        new RightButtons(item.name, item.btn_icon, item.on_click) 
        : new RightButtons(item.name, item.btn_icon);

    (item.btn_position == 'top')? top_buttons.push(button) : bottom_buttons.push(button)
    
    acc[item.name] = item.component;
    return acc;

}, {} as { [key: string]: any });



const all_buttons = [...top_buttons, ...bottom_buttons]

export const right_buttons_events = all_buttons.reduce((acc, button) => {
    acc[button.name] = new CustomEvent(button.name)
    document.addEventListener(button.name, () => {
        if(get(active_aside_component) != button.name) {
            button.onClick()
        }
    })
    return acc
}, {} as {[key: string]: CustomEvent})
