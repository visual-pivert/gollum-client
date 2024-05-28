import { env } from "../../env"
import axios from "axios"

export class Account {
    public static async createAccount(username: string, password: string, cpassword: string, email: string) {
        const endpoint = env['API_DOMAIN'] + '/api/signup'
        const data = {
            username: username,
            password: password,
            email: email
        }
        const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        let api_out = {}
        if (password == cpassword) {
            try {
                const api_reponse = await axios({
                    url: endpoint,
                    method: "POST",
                    headers: headers,
                    data: data
                })
                api_out = api_reponse.data
                console.log(api_out)
            } catch (error: any) {
                api_out = error.response.data
            }
            return api_out
        }
        return {status_code: 422, message: "not the the same password"} //password not the same
    }
}