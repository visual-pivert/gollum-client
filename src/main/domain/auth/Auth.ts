import axios from 'axios'
import { env } from '../../env'
import { GolSession } from '../session/GolSession'
import { GollumApi } from '../gollum_api/GollumApi'

export class Auth {
	public static async login(username: string, password: string) {
		// appele de l'api
		const gollum_api = await GollumApi.access(username, password)

		if (gollum_api["datas"]) {
			const {username, access_token} = gollum_api["datas"]
			const gol_session = new GolSession(env['VAR_PATH'])
			gol_session.addOrModify({AUTH_USER: username, AUTH_TOKEN: access_token})
            gol_session.persist()
			return gollum_api
		}
		return null
	}

	public static async getLoggedUser () {
		const gol_session = new GolSession(env['VAR_PATH'])
		const auth_user = gol_session.get('AUTH_USER')
		const auth_token = gol_session.get('AUTH_TOKEN')
		if (auth_user && auth_token) {
			return {'AUTH_USER': auth_user, 'AUTH_TOKEN': auth_token}
		}
		return {}
	}

	public static logout(): string {
		return 'Logout message'
	}
}
