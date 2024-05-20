import { get } from "svelte/store";
import { active_aside_component } from "../../store/store";

export class RightButtons implements IButtons{
    public name: string
    public icon: string
    /**
     * @param name - nom du boutton = nom du composant à activer
     * @param icon - Remixicon className
     */
    constructor(name: string, icon: string) {
        this.name = name
        this.icon = icon
    }
    public onClick() {
        if (get(active_aside_component) !== this.name) {
            active_aside_component.update(() => this.name)
        } else {
            active_aside_component.update(() => '')
        }
    }
}
