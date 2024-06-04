import { get, writable, type Writable } from 'svelte/store'

export const current_page = writable('login-page')

// export const logged_user = writable(null)

export const active_project_dropdown = writable(false)
export const active_branch_dropdown = writable(false)

export const current_view = writable('project_page')

export const active_aside_component = writable('')

export const project_tree_path: Writable<string[]> = writable([''])

interface Directory {
	type: string
	name: string
}

export const current_directory: Writable<Directory[] | undefined> = writable(undefined)

class Branches {
	name: string
	commits: { id: string; author: string; message: string; date: number }[]
	contents: Directory[]
	constructor(name: string) {
		this.name = name
	}
	public commit(message: string, author: string) {
		this.commits.push({ id: '000', message: message, author: author, date: Date.now() })
	}
}

class Repo {
	name: string
	branch_list: { [key: string]: Branches } = { master: new Branches('master') }
	active_branch: Branches = this.branch_list['master']
	constructor(name: string) {
		this.name = name
	}
	public createBranch(name: string) {
		if (!(name in this.branch_list)) {
			this.branch_list[name] = new Branches(name)
		}
	}
}

const p1 = new Repo('Project 1')
p1.createBranch('test')
// p1.active_branch = p1.branch_list.test
p1.branch_list.master.contents = [
	{ type: 'folder', name: 'src' },
	{ type: 'folder', name: 'build' },
	{ type: 'file', name: 'README' }
]
p1.branch_list.test.contents = [{ type: 'file', name: 'README' }]
const p2 = new Repo('project name 2')
const p3 = new Repo('project3')
const p4 = new Repo('project 4')
export const local_project_list = writable([p1, p2])
// export const not_cloned_project_list = writable([])

// branches
// export const branch_list = writable([])
// export const current_branch = writable({})

export const logged_user = writable(null)

export const not_cloned_project_list = writable([])
export const current_project = writable('')

export const branch_list = writable([])
export const current_branch = writable({})

export const project_tree = writable(null)

export const cloned_project_list = writable([])

export const is_local_repo = writable(true)


export async function storeLoggedUser () {
	const fetched_logged_user = await window.api.getLoggedUser()
	logged_user.update(() => fetched_logged_user)
}

export async function storeNotClonedListProject() {
	const repo_list = await window.api.apiRepoList(get(logged_user).access_token)
	not_cloned_project_list.update(() => repo_list.datas)
	console.log(get(not_cloned_project_list))
}

export async function storeClonedListProject() {
	const repo_list = await window.api.localRepoList()
	cloned_project_list.update(() => repo_list)
	console.log(get(cloned_project_list))
}

export async function storeCurrentProject(project) {
	console.log(project)
	current_project.update(() => project)
}

export async function storeBranchList() {
	if (get(is_local_repo)) {
		const getted_branch_list = await window.api.localBranchList(get(project_tree_path).join('/'))
		branch_list.update(() => getted_branch_list)
	} else {
		const fetched_branch_list = await window.api.apiListBranches(get(logged_user).access_token, get(current_project).repo_path)
		console.log(fetched_branch_list)
		branch_list.update(() => fetched_branch_list.datas)
	}
}


export async function storeCurrentBranch(branch) {
	current_branch.update(() => branch)
	if (get(is_local_repo)) {
		console.log(branch)
		await window.api.localCheckout(get(project_tree_path).join('/') , branch.branch_name)
	}
}

export async function storeTree() {
	if (get(is_local_repo)) {
		let get_tree = null
		get_tree = await window.api.localRepoTree(get(project_tree_path).join('/'))
		project_tree.update(() => get_tree)
	} else {
		let fetch_tree = null
		if (get(project_tree_path).length > 1) {
			fetch_tree = await window.api.apiRepoTree(get(logged_user).access_token, get(current_project).repo_path, get(current_branch).branch_name, get(project_tree_path).slice(1).join('/'))
		} else {
			fetch_tree = await window.api.apiRepoTree(get(logged_user).access_token, get(current_project).repo_path, get(current_branch).branch_name)
		}
		project_tree.update(() => fetch_tree.datas)
	}
	console.log(get(project_tree))
}
