import { GolSession } from '../GolSession'
import { GollumApi } from '../GollumApi'
import { Auth } from '../Auth'

import { expect, test } from 'vitest'
import { sum } from './sum'
import { init } from '../../../init'

test('Access', async () => {
	init()
	await Auth.login('username', 'password')
    const logged_user = await Auth.getLoggedUser()
	console.log(logged_user)
})
