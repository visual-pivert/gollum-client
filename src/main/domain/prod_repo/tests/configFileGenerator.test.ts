import { expect, test } from 'vitest'
import { ConfigFileGenerator } from '../ConfigFileGenerator'
import { env } from '../../../env'

// test('Get all buffer', () => {
// 	const prod_repo = new ConfigFileGenerator()
// 	prod_repo.defineTemplate('src/main/domain/prod_repo/tests/templates')
// 	console.log(prod_repo.getBuffers())
// })

test('Get all tokens', () => {
	const prod_repo = new ConfigFileGenerator()
	prod_repo.defineTemplate('src/main/domain/prod_repo/tests/templates')
	console.log(prod_repo.getAllTokens())
})

// test('GenerateConfig', () => {
// 	const prod_repo = new ConfigFileGenerator()
// 	prod_repo.defineTemplate('src/main/domain/prod_repo/tests/templates')
// 	console.log(prod_repo.generateConfig({
// 		DB_NAME: 'blabla',
// 		DB_HOS: 'db-hos',
// 		DB_HOST: 'db-hosttt'
// 	}))
// })

// test('configure', () => {
// 	const prod_repo = new configFileGenerartor()
// 	prod_repo.defineTemplate('src/main/domain/prod_repo/tests/templates')
// 	prod_repo.configure({
// 		DB_NAME: 'blabla',
// 		DB_HOS: 'db-hos',
// 		DB_HOST: 'db-hosttt'
// 	}, 'src/main/domain/prod_repo/tests/prod')
// })

// test('list template', () => {
// 	const prod_repo = new configFileGenerartor()
// 	const template_list = prod_repo.listTemplate(env['TEMPLATE_PATH'])
// 	console.log(template_list)
// })
