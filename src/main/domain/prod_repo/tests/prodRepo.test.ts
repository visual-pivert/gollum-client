import { expect, test } from 'vitest'
import { configFileGenerartor } from '../ConfigFileGenerator'
import { ProdRepo } from '../ProdRepo'


// test('Prod repo save config', async () => {
// 	const prod_repo = new ProdRepo('username/new_repo2', 'master')
// 	await prod_repo.createConfig('wordpress', {
// 		DB_NAME: 'blabla',
// 		DB_HOS: 'db-hos',
// 		DB_HOST: 'db-hosttt'
// 	}, 'wordpress')
// 	await prod_repo.saveConfig()
// })


// test('Prod repo use existing config', async () => {
// 	const prod_repo = new ProdRepo('username/new_repo2', 'master')
// 	const config = await prod_repo.useExistingConfig('wordpress')
// })

test ('Prod repo mise en production', async () => {
	const prod_repo = new ProdRepo('usr/wordpress', 'master')
	await prod_repo.useExistingConfig('wordpress')
	await prod_repo.cleanProdDir()
	await prod_repo.putOnProduction()
})
