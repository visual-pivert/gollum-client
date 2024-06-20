import fs from 'node:fs'
import { RepoBranchData, RepoData, RepoTreeData } from '../gollum_api/GollumApi'
import simpleGit from 'simple-git'

/**
 * Class that contains all methods and attr to manipulate local repository
 */

export class LocalRepo {

	protected local_path: string
	protected ignored_files: string[]

	public constructor (local_path: string) {
		this.local_path = local_path
		this.ignored_files = ['.git']
	}


 /**
  * Get folder content from the specified local_path and sub_dir_path
  * @param {string} sub_dir_path
  * @returns {RepoTreeData[]}
  */
	public async getTree (sub_dir_path: string = ''): RepoTreeData[] {
		const dir_content = fs.readdirSync(this.makePath(sub_dir_path), {
			withFileTypes: true
		})

		const out: RepoTreeData[] = []

		const simple_git = simpleGit(this.makePath(sub_dir_path))

		for (const element of dir_content) {
			if(this.ignored_files.indexOf(element.name) < 0) {
				const log = await simple_git.log(['--format=%aI<<%s', '-n 1', '--', element.name])
				const logs = log ? log.all[0].hash.split('<<') : []
				const tree_data: RepoTreeData = {
					name: element.name,
					type: element.isDirectory() ? 'tree' : 'blob',
					date: (logs.length > 1) ? logs[0] : '',
					log: (logs.length > 1) ? logs[1] : ''
				}
				out.push(tree_data)

				console.log(log)
			}
		}

		return out
	}

	/**
	 * Get all repo on local
	 * @returns {RepoData[]}
	 */
	public getLocalRepoList (): RepoData[] {
		const dir_content = fs.readdirSync(this.local_path)
		const out: RepoData[] = []
		for (const username of dir_content) {
			const repos = fs.readdirSync(this.makePath(username))
			for (const repo of repos) {
				const the_repo = username + '/' + repo
				const child_dir = fs.readdirSync(this.makePath(the_repo))
				if (child_dir.indexOf('.git') >= 0) {
					out.push({repo_path: the_repo})
				}
			}
		}
		return out
	}

 /**
  * Get all local branch from specified repo
  * @param {string} sub_dir_path
  * @returns {Promise<RepoBranchData[]>}
  */
	public async getBranchList (sub_dir_path: string): Promise<RepoBranchData[]> {
		const simple_git = simpleGit(this.makePath(sub_dir_path))
		const branches_details = await simple_git.branchLocal()
		const branch_out:RepoBranchData[] = []
		for (const branch of branches_details.all) {
			const branch_data: RepoBranchData = { branch_name: branch }
			branch_out.push(branch_data)
		}
		return branch_out
	}

	public async getCurrentBranch (sub_dir_path: string): Promise<RepoBranchData> {
		const simple_git = simpleGit(this.makePath(sub_dir_path))
		const branches_details = await simple_git.branchLocal()
		const branch_data: RepoBranchData = { branch_name: branches_details.current }
		return branch_data
	}

	public async checkout (sub_dir_path: string, branch_name: string) {
		const simple_git = simpleGit(this.makePath(sub_dir_path))
		await simple_git.checkout(branch_name)
	}


	private makePath(path: string) {
		return this.local_path + "/" + path
	}
}
