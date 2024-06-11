import { writable } from 'svelte/store'
import { local_project_list, not_cloned_project_list, selected_project } from '../../store'
import { defineBranch, fetchBranchList } from '../branch_dropdown/store'
import { resetCurrentDirectoryPath } from '../../event'
export const active_project_dropdown = writable(false)

export async function openProjectDropdown() {
	const logged_user = await window.api.getLoggedUser()
	const repo_list = await window.api.apiRepoList(logged_user.access_token)
	const local_repo_list = await window.api.localRepoList()
	not_cloned_project_list.update(() => repo_list.datas)
	local_project_list.update(() => local_repo_list)
}

export async function defineProject(project) {
	selected_project.update(() => project)
	resetCurrentDirectoryPath(project.repo_path)
	const branch_list = await fetchBranchList()
	await defineBranch(branch_list[0].branch_name)
}
