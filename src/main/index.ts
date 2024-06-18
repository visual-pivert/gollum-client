import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { Auth } from './domain/auth/Auth'
import { Account } from './domain/account/Account'
import { init } from './init'
import { GollumGit } from './domain/gollum_git/GollumGit'
import { GollumApi } from './domain/gollum_api/GollumApi'
import { LocalRepo } from './domain/local_repo/LocalRepo'
import { env } from './env'

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		},
		useContentSize: false
	})

	mainWindow.setMinimumSize(670, 360)

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

    // init the application
    init()

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// IPC test
	ipcMain.on('ping', () => console.log('pong'))

	// IPC local(local)
	ipcMain.handle('local:list', async (_) => {
		const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
		return local_repo.getLocalRepoList()
	})
	ipcMain.handle('local:tree', async (_, sub_dir) => {
		const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
		return local_repo.getTree(sub_dir)
	})
	ipcMain.handle('local:branch_list', async (_, sub_dir) => {
		const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
		return await local_repo.getBranchList(sub_dir)
	})
	ipcMain.handle('local:checkout', async (_, sub_dir, branch_name) => {
		const local_repo = new LocalRepo(env['LOCAL_REPO_PATH'])
		await local_repo.checkout(sub_dir, branch_name)
	})

    // IPC gollum api(gapi)
	ipcMain.handle('gapi:login-submit', async (_, form_data) => await Auth.login(form_data['username'], form_data['password']))
	ipcMain.handle('gapi:logged-user', async (_) => await Auth.getLoggedUser())
    ipcMain.handle('gapi:signup-submit', async (_, form_data) => await Account.createAccount(form_data['username'], form_data['password'], form_data['cpassword'], form_data['email']))

    ipcMain.handle('gapi:tree', async (_, access_token, repo_path, branch, tree_path) => {
        try {
            return await GollumApi.treeRepo(access_token, repo_path, branch, tree_path)
        } catch (error: any) {
            return error.message
        }
    })

    ipcMain.handle('gapi:blob', async (_, access_token, repo_path, branch, file_path) => {
        try {
            return await GollumApi.blobRepo(access_token, repo_path, branch, file_path)
        } catch (error: any) {
            return error.message
        }
    })

	ipcMain.handle('gapi:list', async (_, access_token) => {
		try {
			return await GollumApi.listRepo(access_token)
		} catch (error: any) {
			return error.message
		}
	})

	ipcMain.handle('gapi:branches', async (_, access_token, repo_path) => {
		try {
			return await GollumApi.listBranches(access_token, repo_path)
		} catch (error: any) {
			return error.message
		}
	})

	ipcMain.handle('gapi:log', async (_, access_token, repo_path, branch) => {
		try {
			return await GollumApi.listCommit(access_token, repo_path, branch)
		} catch (error : any) {
			return error.message
		}
	})

	ipcMain.handle('gapi:list-user', async (_, access_token) => {
		try {
			return await GollumApi.listUser(access_token)
		} catch (error : any) {
			return error.message
		}
	})

	ipcMain.handle('gapi:create-repo', async (_, access_token, username, password ,repo_name) => {
		try {
			return await GollumApi.createRepo(access_token, username, password, repo_name)
		} catch (error: any) {
			return error.message
		}
	})

	ipcMain.handle('gapi:add-contrib', async (_, access_token, username, repo_path) => {
		try {
			return await GollumApi.addContrib(access_token, username, repo_path)
		} catch (error: any) {
			return error.message
		}
	})


    //IPC git
    ipcMain.handle('git:commit', async (_, basedir, credentials, message, file_or_dir_to_add, amend) => {
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
        try {
            await gollum_git.commit(message, file_or_dir_to_add, amend)
            return "OK"
        } catch (error: any) {
            return error.message
        }
    })

    ipcMain.handle('git:checkout', async(_, basedir, credentials, branch) => {
        const gollum_git = new GollumGit(basedir, credentials)
        try {
            await gollum_git.checkout(branch)
            return "OK"
        } catch (error: any) {
            return error.message
        }
    })

    ipcMain.handle('git:merge', async(_, basedir, credentials, branch) => {
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
        try {
			await gollum_git.merge(branch)
			console.log(env['LOCAL_REPO_PATH'] + '/' + basedir)
            return "OK"
        } catch(error: any) {
            return error.message
        }
    })

    ipcMain.handle('git:clone', async(_, basedir, credentials, repo_path, local_path) => {
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
		let message
        try {
            await gollum_git.clone(env['REPO_LINK'] + '/' + repo_path, local_path)
            message = 'OK'
        } catch (error: any) {
            message = error
        } finally {
			return message
		}
    })

    ipcMain.handle('git:push', async (_, basedir, credentials, remote, branch_name) => {
		console.log(env['LOCAL_REPO_PATH'] + '/' + basedir)
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
        try {
            await gollum_git.push(remote, branch_name)
            return "OK"
        } catch (error: any) {
            return error.message
        }
    })

    ipcMain.handle('git:pull', async (_, basedir, credentials, remote, branch_name) => {
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
        try {
            await gollum_git.pull(remote, branch_name)
            return "OK"
        } catch (error: any) {
            return error.message
        }
    })

    ipcMain.handle('git:status', async(_, basedir, credentials) => {
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
        try {
			const status = await gollum_git.status()
            return status
        } catch (error: any) {
            return error.message
        }
    })

    ipcMain.handle('git:log', async(_, basedir, credentials) => {
        const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
        try {
            return await gollum_git.log()
        } catch (error: any) {
            return error.message
        }
    })

	ipcMain.handle('git:new-branch', async(_, basedir, credentials, branch_name) => {
		const gollum_git = new GollumGit(env['LOCAL_REPO_PATH'] + '/' + basedir, credentials)
		try {
			return await gollum_git.newBranch(branch_name)
		} catch (error: any) {
			return error.message
		}
	})

	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
