import { env } from '../../env'
import axios from 'axios'

export class GollumApi {

    static domain = env['API_DOMAIN']
    static api_header_config = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    // authentication
    public static async access(username: string, password: string): Promise<object> {
		const login_endpoint = GollumApi.domain + '/api/access'
		const data = { username: username, password: password }
		const headers = {...GollumApi.api_header_config}
        let api_out = {}
		try {
			const fetched_value = await axios({ method: 'POST', headers: headers, data: data, url: login_endpoint })
			api_out = fetched_value.data
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
    }
    public static async revoke(access_token: string): Promise<object> {
        const logout_endpoint = GollumApi.domain + '/api/revoke'
        const headers = { 'Access-Token': access_token }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'GET',  headers: headers, url: logout_endpoint })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    // repo
    public static async createRepo(access_token: string, repo_name: string): Promise<object> {
        const create_repo_endpoint = GollumApi.domain + '/api/repo/create'
        const headers = {...GollumApi.api_header_config, 'Access-Token': access_token}
        const data = { 'repo_path': repo_name }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'POST', headers: headers, data: data, url: create_repo_endpoint })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    public static async deleteRepo(access_token: string, repo_name: string): Promise<object> {
        const delete_repo_endpoint = GollumApi.domain + '/api/repo/delete'
        const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
        const data = {'repo_path': repo_name}
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'DELETE', headers: headers, data: data, url: delete_repo_endpoint})
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    public static async listRepo(access_token: string): Promise<object> {
        const list_repo_endpoint = GollumApi.domain + '/api/repo/list'
        const headers = { 'Access-Token': access_token }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'GET', headers: headers, url: list_repo_endpoint })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    public static async treeRepo(access_token: string, repo_path: string, branch: string, tree_path: string) {
        const tree_repo_endpoint = GollumApi.domain + `/api/repo/get/${repo_path}/tree/${branch}` + ((tree_path) ? "/" + tree_path : "")
        console.log(tree_repo_endpoint)
        const headers = { 'Access-Token': access_token }
        let api_out = {}
        try {
            const fetched_value = await axios({method: 'GET', headers: headers, url: tree_repo_endpoint})
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    public static async blobRepo(access_token: string, repo_path: string, branch: string, file_path: string) {
        const blob_repo_endpoint = GollumApi.domain + `/api/repo/get/${repo_path}/blob/${branch}` + ((file_path) ? "/" + file_path : "")
        const headers = { 'Access-token': access_token }
        let api_out = {}
        try {
            const fetched_value = await axios({method: 'GET', headers: headers, url: blob_repo_endpoint })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    // contributors
    public static async addContrib(access_token: string, username: string, repo_path: string): Promise<object> {
        const add_contrib_endpoint = GollumApi.domain + `/api/contributors/add/${repo_path}`
        const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
        const data = { 'username': username }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'POST', headers: headers, url: add_contrib_endpoint, data: data })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    public static async deleteContrib(access_token: string, username: string, repo_path: string): Promise<object> {
        const delete_contrib_endpoint = GollumApi.domain + `/api/contributors/delete/${repo_path}`
        const headers = { ...GollumApi.api_header_config, 'Access-token': access_token }
        const data = { 'username': username }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'DELETE', headers:headers, url: delete_contrib_endpoint, data: data })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    // user
    public static async getUser(access_token: string, username: string): Promise<object> {
        const get_user_endpoint = GollumApi.domain + '/api/users/get/' + username
        const headers = { 'Access-Token': access_token }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'GET', headers: headers, url: get_user_endpoint })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }
    public static async deleteUser(access_token: string, username: string): Promise<object> {
        const delete_user_endpoint = GollumApi.domain + '/api/users/delete'
        const headers = { ...GollumApi.api_header_config, 'Access-Token': access_token }
        const data = { 'username': username }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'DELETE', headers: headers, url: delete_user_endpoint, data: data })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }
    public static async signup(username: string, email: string, password: string): Promise<object> {
        const signup_endpoint = GollumApi.domain + '/api/signup'
        const headers = { ...GollumApi.api_header_config }
        const data = { 'username': username, 'email': email, 'password': password }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'POST', headers: headers, url: signup_endpoint, data: data })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

    public static async listUser(access_token: string): Promise<object> {
        const list_user_endpoint = GollumApi.domain + '/api/users/list'
        const headers = { 'Access-Token': access_token }
        let api_out = {}
        try {
            const fetched_value = await axios({ method: 'GET', headers: headers, url: list_user_endpoint })
            api_out = fetched_value.data
        } catch (error: any) {
            api_out = error.response.data
        }
        return api_out
    }

}