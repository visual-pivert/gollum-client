import { BehaviorSubject } from "rxjs";

export type ProjectType = {
	repo_path: string
}

export const rx_selected_project = new BehaviorSubject<ProjectType>(null)
export const rx_is_local_project = new BehaviorSubject<boolean>(true)
