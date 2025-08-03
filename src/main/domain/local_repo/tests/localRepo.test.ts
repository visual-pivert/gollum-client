import { expect, test } from 'vitest'
import { LocalRepo } from '../LocalRepo'
import { env } from '../../../env'

test('Get local repo tree', async () => {
    const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
    console.log(await local_repo.getTree('username/new_repo2'))
})

// test('Get local repo list', () => {
// 	const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
// 	console.log(local_repo.getLocalRepoList())
// })

// test('Get local branch list', async () => {
// 	const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
// 	console.log(await local_repo.getBranchList('username/repo2'))
// })
