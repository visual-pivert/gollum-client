import { GolSession } from '../GolSession'
import { GollumApi } from '../GollumApi'

import { expect, test } from 'vitest'
import { sum } from './sum'

// test('Access', async () => {
//     const out = await GollumApi.access('username', 'password')
//     console.log(JSON.stringify(out))
// })

// test('Revoke', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiA0NzgwMSwgIl90aW1lc3RhbXAiOiAxNzE2MjcyMTkxfQ=='
//     const out = await GollumApi.revoke(access_token)
//     console.log(JSON.stringify(out))
// })

// test('Create repository', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiA0NDk1NSwgIl90aW1lc3RhbXAiOiAxNzE2MjcyNzY2fQ=='
//     const out = await GollumApi.createRepo(access_token, 'test_new_repo')
//     console.log(JSON.stringify(out))
// })

// test('Delete repository', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.deleteRepo(access_token, 'test_new_repo')
//     console.log(JSON.stringify(out))
// })

// test('List repository', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.listRepo(access_token)
//     console.log(JSON.stringify(out))
// })

// test('List branches', async () => {
// 	const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiA3MzExMywgIl90aW1lc3RhbXAiOiAxNzE3MDUzNjg5fQ=='
// 	const out = await GollumApi.listBranches(access_token, 'username/new_repo2')
// 	console.log(out)
// })

// test('Add contributors', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.addContrib(access_token, 'username3', 'username/first')
//     console.log(JSON.stringify(out))
// })

// test ('Delete contributors', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.deleteContrib(access_token, 'username3', 'username/first')
//     console.log(JSON.stringify(out))
// })

// test ('Get users', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.getUser(access_token, 'username3')
//     console.log(JSON.stringify(out))
// })

// test ('Delete users', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.deleteUser(access_token, 'username3')
//     console.log(JSON.stringify(out))
// })

// test ('Signup', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.signup('susermane2', 'susername2@gmail.com', 'password')
//     console.log(JSON.stringify(out))
// })

// test('List user', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.listUser(access_token)
//     console.log(JSON.stringify(out))
// })

test('Tree repo', async () => {
    const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAyNjk3MiwgIl90aW1lc3RhbXAiOiAxNzE3MTQzMzE3fQ=='
    const out = await GollumApi.treeRepo(access_token, 'username/first', 'master', 'test3')
    console.log(JSON.stringify(out))
})

// test('Blob repo', async () => {
//     const access_token = 'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ=='
//     const out = await GollumApi.blobRepo(access_token, 'username/new_repo2', 'master', 'blob')
//     console.log(JSON.stringify(out))
// })
