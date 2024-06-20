

export class Timer {
    private delay: number
    private timer_id: NodeJS.Timeout
    private callback: () => void

    /**
     *
     * @param callback function à executer après delay
     * @param delay temps en millisecond
     */
    constructor(callback: () => void, delay: number) {
        this.callback = callback
        this.delay = delay
    }

    
    /**
     * démarre le timer
     *
     * @param {number} [delay=this.delay] (optionel) par defaut this.delay
     */
    public start(delay = this.delay) {
        if (this.timer_id) {
            this.stop()
        }
        this.timer_id = setTimeout(() => {
            this.callback()
        }, delay)
    }

    public stop() {
        clearTimeout(this.timer_id)
    }
}