import { writable, get } from "svelte/store"
import { selected_project, is_local_project, branch_list, selected_branch, current_directory, current_directory_path } from "../../store"
import { defineDir } from "../project_page/store"


export const active_branch_dropdown = writable(false)


export async function openBranchDropdown() {
	const logged_user = await window.api.getLoggedUser()

	const getted_branch_list = await fetchBranchList()

	branch_list.update(() => getted_branch_list)
}

export async function defineBranch (branch_name: string) {
	const logged_user = await window.api.getLoggedUser()

	selected_branch.update(() => branch_name)

	await defineDir()
}

export async function fetchBranchList() {
	const logged_user = await window.api.getLoggedUser()
	let getted_branch_list
	if (get(is_local_project)) {
		getted_branch_list = await window.api.localBranchList(get(selected_project).repo_path)
		return getted_branch_list
	}
	else {
		getted_branch_list = await window.api.apiListBranches(logged_user.access_token, get(selected_project).repo_path)
		return getted_branch_list.datas
	}
}
