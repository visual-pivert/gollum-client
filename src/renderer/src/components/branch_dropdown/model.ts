import { BehaviorSubject } from "rxjs";

export type BranchType = {
	repo_path: string
}

export const rx_selected_branch = new BehaviorSubject<BranchType>(null)
