import { expect, test } from 'vitest'
import { TemplateEngine } from '../TemplateEngine'

import fs from 'node:fs'

test('Get buffered variable', () => {
	const text = fs.readFileSync('src/main/domain/template_engine/tests/wp-config-engine.php').toString()
    const template_engine = new TemplateEngine(text)
	console.log(template_engine.getAllBufferStringDetails())
})

test('Change buffer value', () => {
	const text = fs.readFileSync('src/main/domain/template_engine/tests/wp-config-engine.php').toString()
    const template_engine = new TemplateEngine(text)
	const values = {
		DB_NAME: 'DB_NAME_VALUE_2',
		// DB_USER: 'DB_USER_VALUE',
		DB_PASSWORD: 'DB_PASSWORD_VALUE'
	}
	console.log(template_engine.apply(values))
})
