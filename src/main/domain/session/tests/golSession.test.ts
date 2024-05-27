import { GolSession } from '../GolSession'

import { expect, test } from 'vitest'
import { sum } from './sum'

test('gol session initialisation', () => {
    const gol_session = new GolSession('./var')
	expect(true).toBe(true)
})

test('writing session', () => {
    const gol_session = new GolSession('./var')
    gol_session.addOrModify({coucou: 'el'})
    gol_session.persist()
	expect(true).toBe(true)
})

test('get all session', () => {
    const gol_session = new GolSession('./var')
    const session = gol_session.getAll()
    console.log(session)
})

// test('delete some session', () => {
//     const gol_session = new GolSession('./var')
//     gol_session.delete('coucou')
//     gol_session.persist()
//     console.log(gol_session.getAll())
// })

