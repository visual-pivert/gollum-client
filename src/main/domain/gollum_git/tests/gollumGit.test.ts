import { expect, test } from 'vitest'
import { GollumGit } from '../GollumGit'
import { env } from '../../../env'

test('Push repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', {username: 'username', password: 'password'})
    await gollum_git.push('origin', 'master')
})

test('Clone repository', async () => {
    const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'], {username: 'username', password: 'password'})
    await gollum_git.clone('192.168.122.144/git/username/new_repo2', '')
})

test('Pull repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', { username: 'username', password: 'password' })
    await gollum_git.pull('origin', 'master')
})

test('Status repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', { username: 'username', password: 'password' })
    console.log((await gollum_git.status()))
})

test('Log repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', { username: 'username', password: 'password' })
    console.log(await gollum_git.log())
})

test('Commit repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', { username: 'username', password: 'password' })
    await gollum_git.commit('test gollum commit222222', [], true)
})

test('Checkout repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', { username: 'username', password: 'password' })
    await gollum_git.checkout('a')
})

test('merge repository', async () => {
    const gollum_git = new GollumGit('/home/eliome/Test/ultime_git_test/first', { username: 'username', password: 'password' })
    await gollum_git.merge('a')
})
