import { current_page } from "../store"


/**
 * Class that contains many stuff for routing service
 */
export class RouteUtil {

    /**
     * electron redirection that change current_page from store
     * @param {string} page_key
     * @returns {any}
     */
    public static redirectTo (page_key: string) {
        current_page.update(() => page_key)
    }
}
