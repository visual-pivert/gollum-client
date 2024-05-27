import { current_page } from "../store"

export class RouteUtil {
    public static redirectTo (page_key: string) {
        current_page.update((value) => page_key)
    }
}