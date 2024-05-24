import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {

    // La partie api de gollum
	loginSubmit: (login_value: {}) => ipcRenderer.invoke('gapi:login-submit', login_value),
    signupSubmit: (signup_value: {}) => ipcRenderer.invoke('gapi:signup-submit', signup_value),

    // La partie GIT
    gitCommit: (basedir: string, credentials:{username: string, password: string}, message: string, file_or_dir_to_add: [], amend = false) => ipcRenderer.invoke('git:commit', basedir, credentials, message, file_or_dir_to_add, amend),
    gitCheckout: (basedir: string, credentials:{username: string, password: string}, branch: string) => ipcRenderer.invoke("git:checkout", basedir, credentials, branch),
    gitMerge: (basedir: string, credentials:{username: string, password: string}, branch: string) => ipcRenderer.invoke("git:merge", basedir, credentials, branch),
    gitClone: (basedir: string, credentials:{username: string, password: string}, repo_path: string, local_path: string) => ipcRenderer.invoke('git:clone', basedir, credentials, repo_path, local_path),
    gitPush: (basedir: string, credentials:{username: string, password: string}, remote: string, branch_name: string) => ipcRenderer.invoke('git:push', basedir, credentials, remote, branch_name),
    gitPull: (basedir: string, credentials:{username: string, password: string}, remote: string, branch_name: string) => ipcRenderer.invoke('git:pull', basedir, credentials, remote, branch_name),
    gitStatus: (basedir: string, credentials:{username: string, password: string}) => ipcRenderer.invoke('git:status', basedir, credentials),
    gitLog: (basedir: string, credentials:{username: string, password: string}) => ipcRenderer.invoke('git:log', basedir, credentials),

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
	} catch (error) {
		console.error(error)
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI
	// @ts-ignore (define in dts)
	window.api = api
}
