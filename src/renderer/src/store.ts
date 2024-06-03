import { writable, type Writable } from "svelte/store";

export const current_page = writable('login-page')

export const close_function_overlays = writable([])

export const current_view = writable('project_page')

export const active_aside_component = writable('')

export const selected_project: Writable<Repo | null> = writable(null)

export const current_directory_path: Writable<string[]> = writable([''])

interface Directory {
    type: string,
    name: string,
}

export const current_directory: Writable<Directory[] | undefined>= writable(undefined)

class Branches {
    name: string
    commits: {id: string, author: string, message: string, date: number}[]
    contents: Directory[]
    constructor(name: string) {
        this.name = name
    }
    public commit(message: string, author: string) {
        this.commits.push({id:'000', message: message, author: author, date: Date.now()})
    }
}

class Repo {
    name: string
    branch_list: {[key: string]: Branches} = {'master': new Branches('master')}
    active_branch: Branches = this.branch_list['master']
    constructor(name: string) {
        this.name = name
    }
    public createBranch(name: string) {
        if(!(name in this.branch_list)) {
            this.branch_list[name] = new Branches(name)
        }
    }
}

const p1 = new Repo('Project 1')
p1.createBranch('test')
// p1.active_branch = p1.branch_list.test
p1.branch_list.master.contents = [
    {type: 'folder',name: 'src'},
    {type: 'folder',name: 'build'},
    {type: 'file',name: 'README'}
]
p1.branch_list.test.contents = [
    {type: 'file',name: 'README'}
]
const p2 = new Repo('project name 2')
const p3 = new Repo('project3')
const p4 = new Repo('project 4')
export const local_project_list = writable([p1,p2])
export const not_cloned_project_list = writable([p3,p4])
