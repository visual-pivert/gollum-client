import axios from 'axios'
import { env } from '../../env'
import { GolSession } from '../session/GolSession'

export class Auth {
	public static async login(username: string, password: string) {
		// appele de l'api
		const login_endpoint = env['API_DOMAIN'] + '/api/access'
		const data = { username: username, password: password }
		const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        const gol_session = new GolSession(env['VAR_PATH'])
        let api_out = {}
		try {
			const fetched_value = await axios({
				method: 'POST',
				headers: headers,
				data: data,
				url: login_endpoint
			})
			api_out = fetched_value.data
            gol_session.addOrModify({AUTH_USER: api_out["username"], AUTH_TOKEN: api_out["access_token"]})
            gol_session.persist()
		} catch (error: any) {
			api_out = error.response.data
		}
		return api_out
	}

	public static logout(): string {
		return 'Logout message'
	}
}
