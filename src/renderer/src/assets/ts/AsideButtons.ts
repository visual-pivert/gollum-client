
export abstract class AsideButtons {
    public name: string
    public icon: string
    public isActive = false
    /**
     * @param name - nom du boutton = nom du composant à activer
     * @param icon - Remixicon className
     */
    constructor(name: string, icon: string) {
        this.name = name
        this.icon = icon
    }
    public abstract onClick(): void
}
