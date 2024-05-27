
import { SimpleGit, simpleGit, Options } from "simple-git";
import { env } from "#main/env"
import { type } from "os";

export class StatusType {
    public not_added: []
    public conflicted: []
    public created: []
    public delete: []
    public ignored: any
    public modified: []
    public renamed: []
    public files: []
    public staged: []
    public ahead: number
    public behind: number
    public current: string
    public tracking: string
    public detached: boolean
    public isClean: () => boolean
}

export class GollumGit {

    protected path = ''
    protected config = {} 
    protected git_obj:SimpleGit
    protected credentials = {}
    
    public constructor(path: string, credentials: {username: string, password: string}) {
        this.path = path
        this.config = { binary: 'git' }
        this.git_obj = simpleGit(this.path, this.config)
        this.credentials = credentials
    }

    public async clone(repo_path: string, local_path: string) {
        const url = this.makeRemote(
            this.credentials['username'], 
            this.credentials['password'], 
            repo_path
        )
        const repo_name = repo_path.split('/').at(-1)
        const the_local_path = (local_path) ? local_path + '/' +`${repo_name}` : `${repo_name}`
        await this.git_obj.clone(url, the_local_path).then(() => console.log('finished')).catch((err) => console.error('failed: ', err))
    }

    public async push(remote: string, branch_name: string) {
        await this.git_obj.push(remote, branch_name).then(() => console.log('finished')).catch((err) => console.error('failed: ', err))
    }

    public async pull(remote: string, branch_name: string) {
        return await this.git_obj.pull(remote, branch_name).then(() => console.log('finished')).catch((err) => console.error('failed: ', err))
    }

    public async status(): StatusType {
        // TODO: Mise en place d'une partie interface pour eviter qu'un objet inconnu ressort de cette fonction
        const status = await this.git_obj.status() as unknown as StatusType
        return status
    }

    public async log() {
        // TODO: Mise en place d'une partie interface pour eviter qu'un objet inconnu ressort de cette fonction
        const log = await this.git_obj.log()
        return log
    }

    public async commit(message: string, file_or_dir_to_add: [], amend = false) {
        this.git_obj.add(file_or_dir_to_add)
        let commit = await this.git_obj.commit(message)
        if (amend) 
            commit = await this.git_obj.commit(message, ['--amend'])
    }

    public async checkout(branch: string){
        await this.git_obj.checkout(branch)
    }

    public async merge(branch: string){
        await this.git_obj.merge(['--no-ff', branch])
    }

    private makeRemote(username: string, password: string, repo_path: string) {
        return `${env['PROTOCOL']}://${username}:${password}@${repo_path}`
    }
}