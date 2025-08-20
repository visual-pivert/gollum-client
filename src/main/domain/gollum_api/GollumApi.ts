import { env } from '../../env'
import axios from 'axios'
import fs from 'node:fs'
import simpleGit from 'simple-git'

export type GollumApiResponse<T> = {
	message: string,
	datas: T | undefined,
	status_code: number
}

export type AccessData = {
	access_token: string,
	username: string
}

export type RepoData = {
	repo_path: string
}

export type RepoTreeData = {
	name: string,
	type: 'blob' | 'tree',
	date: string,
	log: string
}

export type RepoBlobData = {
	blob: string
}

export type RepoBranchData = {
	branch_name: string
}

export type UserData = {
	email: string,
	slug: string,
	username: string
}

export class GollumApi {

	static domain = env['API_DOMAIN']
	static api_header_config = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

	/**
	 * Get access_token from gollum serveur application
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<GollumApiResponse<AccessData>>}
	 */
	public static async access(username: string, password: string): Promise<GollumApiResponse<AccessData>> {
		const login_endpoint = GollumApi.domain + '/api/access'
		const data = { username: username, password: password }
		const headers = { ...GollumApi.api_header_config }
		let api_out: GollumApiResponse<AccessData>;
		try {
			const fetched_value = await axios({ method: 'POST', headers: headers, data: data, url: login_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}


	/**
	 * Make the access_token out to date and unusable
	 * @param {string} access_token
	 * @returns {Promise<GollumApiResponse<undefined>>}
	 */
	public static async revoke(access_token: string): Promise<GollumApiResponse<undefined>> {
		const logout_endpoint = GollumApi.domain + '/api/revoke'
		const headers = { 'Access-Token': access_token }
		let api_out: GollumApiResponse<undefined>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: logout_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}


	/**
	 * Create repository if good access_token entered
	 * @param {string} access_token
	 * @param {string} repo_name
	 * @returns {Promise<GollumApiResponse<undefined>>}
	 */
	public static async createRepo(access_token: string, username: string, password: string, repo_name: string): Promise<GollumApiResponse<undefined>> {
		const create_repo_endpoint = GollumApi.domain + '/api/repo/create'
		const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
		const data = { 'repo_path': repo_name }
		let api_out: GollumApiResponse<undefined>
		try {
			console.log("im here")
			const fetched_value = await axios({ method: 'POST', headers: headers, data: data, url: create_repo_endpoint })
			api_out = fetched_value.data
			await GollumApi.createAndPushTempRep('origin', GollumApi.makeRemote(username, password, env['REPO_LINK'] + '/' + username + '/' + repo_name))
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	private static makeRemote(username: string, password: string, repo_path: string) {
		return `${env['PROTOCOL']}://${username}:${password}@${repo_path}`
	}

	private static async createAndPushTempRep(remote_name: string, remote_link: string) {
		console.log("============================")
		console.log(remote_name)
		console.log(remote_link)
		const new_dir_path = env['TEMP_PATH'] + '/' + '_tmp_repo'
		const branch_name = 'master'
		try {
			// 1. Cloner le dépôt distant, même s'il est vide
			if (fs.existsSync(new_dir_path)) {
				fs.rmSync(new_dir_path, { recursive: true, force: true })
			}
			await simpleGit().clone(remote_link, new_dir_path);

			const git = simpleGit(new_dir_path);
			await git.checkoutLocalBranch(branch_name);
			fs.writeFileSync(new_dir_path + '/' + 'README.md', 'Created with gollum')
			await git.add('.')
			await git.commit('Initial commit')
			await git.push(remote_name, branch_name)
		} catch (e: any) {
			console.log(e)
		}
	}

	/**
	 * Delete repository if good access_token
	 * @param {string} access_token
	 * @param {string} repo_name
	 * @returns {Promise<GollumApiResponse<undefined>>}
	 */
	public static async deleteRepo(access_token: string, repo_name: string): Promise<GollumApiResponse<undefined>> {
		const delete_repo_endpoint = GollumApi.domain + '/api/repo/delete'
		const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
		const data = { 'repo_path': repo_name }
		let api_out: GollumApiResponse<undefined>
		try {
			const fetched_value = await axios({ method: 'DELETE', headers: headers, data: data, url: delete_repo_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}


	/**
	 * Take all repo contributed by the access_token owner
	 * @param {string} access_token
	 * @returns {Promise<GollumApiResponse<RepoData[]>>}
	 */
	public static async listRepo(access_token: string): Promise<GollumApiResponse<RepoData[]>> {
		const list_repo_endpoint = GollumApi.domain + '/api/repo/list'
		const headers = { 'Access-Token': access_token }
		let api_out: GollumApiResponse<RepoData[]>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: list_repo_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	/**
	 * Get file browser of specified repo et branch if access_token is good
	 * @param {string} access_token
	 * @param {string} repo_path
	 * @param {string} branch
	 * @param {string} tree_path
	 * @returns {Promise<GollumApiResponse<RepoTreeData[]>>}
	 */
	public static async treeRepo(access_token: string, repo_path: string, branch: string, tree_path: string): Promise<GollumApiResponse<RepoTreeData[]>> {
		const tree_repo_endpoint = GollumApi.domain + `/api/repo/get/${repo_path}/tree/${branch}` + ((tree_path) ? "/" + tree_path : "")
		console.log(tree_repo_endpoint)
		const headers = { 'Access-Token': access_token }
		let api_out: GollumApiResponse<RepoTreeData[]>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: tree_repo_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}


	/**
	 * Get content of specified file from specified repo and branch
	 * @param {string} access_token
	 * @param {string} repo_path
	 * @param {string} branch
	 * @param {string} file_path
	 * @returns {Promise<GollumApiResponse<RepoBlobData>>}
	 */
	public static async blobRepo(access_token: string, repo_path: string, branch: string, file_path: string): Promise<GollumApiResponse<RepoBlobData>> {
		const blob_repo_endpoint = GollumApi.domain + `/api/repo/get/${repo_path}/blob/${branch}` + ((file_path) ? "/" + file_path : "")
		const headers = { 'Access-token': access_token }
		let api_out: GollumApiResponse<RepoBlobData>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: blob_repo_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}


	/**
	 * List all branches from specified repo_path if good access_token
	 * @param {string} access_token
	 * @param {string} repo_path
	 * @returns {Promise<GollumApiResponse<RepoBranchData[]>>}
	 */
	public static async listBranches(access_token: string, repo_path: string): Promise<GollumApiResponse<RepoBranchData[]>> {
		const list_branches_endpoint = GollumApi.domain + `/api/repo/branches/${repo_path}`
		const headers = { 'Access-token': access_token }
		let api_out: GollumApiResponse<RepoBranchData[]>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: list_branches_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}


	/**
	 * Add specified username as contributor of specified repo if access_token is good
	 * @param {string} access_token
	 * @param {string} username
	 * @param {string} repo_path
	 * @returns {Promise<GollumApiResponse<undefined>>}
	 */
	public static async addContrib(access_token: string, username: string, repo_path: string): Promise<GollumApiResponse<undefined>> {
		const add_contrib_endpoint = GollumApi.domain + `/api/contributors/add/${repo_path}`
		const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
		const data = { 'username': username }
		let api_out: GollumApiResponse<undefined>
		try {
			const fetched_value = await axios({ method: 'POST', headers: headers, url: add_contrib_endpoint, data: data })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	/**
	 * Delete specified user from repo contribution
	 * @param {string} access_token
	 * @param {string} username
	 * @param {string} repo_path
	 * @returns {Promise<GollumApiResponse<undefined>>}
	 */
	public static async deleteContrib(access_token: string, username: string, repo_path: string): Promise<GollumApiResponse<undefined>> {
		const delete_contrib_endpoint = GollumApi.domain + `/api/contributors/delete/${repo_path}`
		const headers = { ...GollumApi.api_header_config, 'Access-token': access_token }
		const data = { 'username': username }
		let api_out: GollumApiResponse<undefined>
		try {
			const fetched_value = await axios({ method: 'DELETE', headers: headers, url: delete_contrib_endpoint, data: data })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	/**
	 * Get specified user if good access_token
	 * @param {string} access_token
	 * @param {string} username
	 * @returns {Promise<GollumApiResponse<UserData>>}
	 */
	public static async getUser(access_token: string, username: string): Promise<GollumApiResponse<UserData>> {
		const get_user_endpoint = GollumApi.domain + '/api/users/get/' + username
		const headers = { 'Access-Token': access_token }
		let api_out: GollumApiResponse<UserData>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: get_user_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	/**
	 * Delete user from the database
	 * @param {string} access_token
	 * @param {string} username
	 * @returns {GollumApiResponse<undefined>}
	 */
	public static async deleteUser(access_token: string, username: string): Promise<GollumApiResponse<undefined>> {
		const delete_user_endpoint = GollumApi.domain + '/api/users/delete'
		const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
		const data = { 'username': username }
		let api_out: GollumApiResponse<undefined>
		try {
			const fetched_value = await axios({ method: 'DELETE', headers: headers, url: delete_user_endpoint, data: data })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	/**
	 * Create new account in gollum server
	 * @param {string} username
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<GollumApiResponse<UserData>>}
	 */
	public static async signup(username: string, email: string, password: string): Promise<GollumApiResponse<UserData>> {
		const signup_endpoint = GollumApi.domain + '/api/signup'
		const headers = { ...GollumApi.api_header_config }
		const data = { 'username': username, 'email': email, 'password': password }
		let api_out: GollumApiResponse<UserData>
		try {
			const fetched_value = await axios({ method: 'POST', headers: headers, url: signup_endpoint, data: data })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	/**
	 * List all user from gollum server if good access_token
	 * @param {string} access_token
	 * @returns {Promise<GollumApiResponse<UserData[]>>}
	 */
	public static async listUser(access_token: string): Promise<GollumApiResponse<UserData[]>> {
		const list_user_endpoint = GollumApi.domain + '/api/users/list'
		const headers = { 'Access-Token': access_token }
		let api_out: GollumApiResponse<UserData[]>
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: list_user_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	public static async listCommit(access_token: string, repo_path: string, branch: string) {
		const list_commit_endpoint = GollumApi.domain + '/api/repo/log/' + repo_path + '/branch/' + branch
		const headers = { 'Access-Token': access_token }
		let api_out
		try {
			const fetched_value = await axios({ method: 'GET', headers: headers, url: list_commit_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

}
