import axios from 'axios'
import { env } from '../../env'
import { GolSession } from '../session/GolSession'
import { AccessData, GollumApi, GollumApiResponse } from '../gollum_api/GollumApi'

export class Auth {
	/**
	 * Take user credentials, add it in session, and return an object (response from fetch) or null
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<GollumApiResponse<AccessData> | null>}
	 */
	public static async login(username: string, password: string): Promise<GollumApiResponse<AccessData> | null> {
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

	/**
	 * Get logged user (user from the sesion)
	 * @returns {Promise<AccessData | null>}
	 */
	public static async getLoggedUser ():  Promise<AccessData | null>{
		const gol_session = new GolSession(env['VAR_PATH'])
		const auth_user = gol_session.get('AUTH_USER') as string
		const auth_token = gol_session.get('AUTH_TOKEN') as string
		if (auth_user && auth_token) {
			const out_data: AccessData = {
				access_token: auth_token,
				username: auth_user
			}
			return out_data
		}
		return null
	}

	public static logout(): string {
		return 'Logout message'
	}
}
