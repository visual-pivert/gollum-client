<script>
	import { onDestroy, onMount, tick } from 'svelte'
	import Buttons from '../Buttons.svelte'
	import { rx_ftp_connected } from './model'
	import { rx_selected_project } from '../project_dropdown/model'

	let FTP_connected //rx
	let selected_project //rx
	let current_dir_path
	let FTP_current_dir = []
	let ready_to_send = false
	let port_field
	let cd_loader
	let connect_loader

	let connection = {
		host: '192.168.200.136',
		username: 'gollum',
		password: 'gollum',
		port: undefined
	}

	const formatPort = () => {
		port_field.value = port_field.value.replace(/[^\d]/g, '').substring(0, 6)
	}

	const connectFTP = async () => {
		console.log(connection)
		connect_loader.style.display = 'flex'
		const res = await window.api.connectFTP(
			connection.host,
			connection.username,
			connection.password,
			connection.port
		)
		if (220 == res.code) {
			await definePWD()
			await listCurentDir()
			rx_ftp_connected.next(connection.username + '@' + connection.host)
		}
		connect_loader.style.display = 'none'
		console.log(res)
	}

	const definePWD = async () => {
		current_dir_path = await window.api.pwdFTP()
	}

	const sortFiles = (files) => {
		return files.sort((a, b) => {
			if (a.type === b.type) {
				return a.name.localeCompare(b.name)
			}
			return a.type === 2 ? -1 : 1
		})
	}

	const listCurentDir = async () => {
		try {
			FTP_current_dir = await window.api.listDirFTP()
			FTP_current_dir = sortFiles(FTP_current_dir)
		} catch (error) {
			console.log(error)
		}
	}

	const changeDir = async (path) => {
		try {
			cd_loader.style.display = 'flex'
			FTP_current_dir = await window.api.changeDirFTP(path)
			FTP_current_dir = sortFiles(FTP_current_dir)
			await definePWD()
			cd_loader.style.display = 'none'
		} catch (error) {
			console.log(error)
		}
	}

	const send = async () => {
		// console.log(selected_project.repo_path)
		if (selected_project.repo_path) {
			const res = await window.api.sendFTP(selected_project.repo_path)
			await listCurentDir()
			console.log(res)
		}
	}

	const disconnectFTP = () => {
		const res = window.api.disconnectFTP()
		console.log(res)
		rx_ftp_connected.next('')
	}

	let subscribers = []
	onMount(async () => {
		const selected_project_sub = rx_selected_project.subscribe(
			(value) => (selected_project = value)
		)
		const FTP_connected_sub = rx_ftp_connected.subscribe((value) => (FTP_connected = value))
		subscribers = [selected_project_sub, FTP_connected_sub]

		console.log(selected_project)

		if (FTP_connected) {
			// cd_loader.style.display = 'flex'
			await definePWD()
			await listCurentDir()
			// cd_loader.style.display = 'none'
		}
	})

	onDestroy(() => {
		subscribers.forEach((sub) => sub.unsubscribe())
	})
</script>

{#if !FTP_connected}
	<div class="flex flex-col gap-2 p-3">
		<span class="font-bold mb-2">Connection à FTP :</span>
		<div class="flex flex-col gap-1">
			<label for="host">Host:</label>
			<input
				bind:value={connection.host}
				class="h-7 bg-transparent outline-none border focus:border-2 border-solid border-background3 focus:border-blue-btn p-1 rounded"
				type="text"
				id="host"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="port">Port:</label>
			<input
				bind:this={port_field}
				bind:value={connection.value}
				on:input={() => formatPort()}
				class="h-7 bg-transparent outline-none border focus:border-2 border-solid border-background3 focus:border-blue-btn p-1 rounded"
				type="text"
				id="port"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="username">Username:</label>
			<input
				bind:value={connection.username}
				class="h-7 bg-transparent outline-none border focus:border-2 border-solid border-background3 focus:border-blue-btn p-1 rounded"
				type="text"
				id="username"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="password">Password:</label>
			<input
				bind:value={connection.password}
				class="h-7 bg-transparent outline-none border focus:border-2 border-solid border-background3 focus:border-blue-btn p-1 rounded"
				type="password"
				id="password"
			/>
		</div>
		<div class="mt-2">
			<Buttons
				label="Se Connecter"
				bg_color="--blue-btn"
				on:click={() => {
					connectFTP()
				}}
			/>
		</div>
	</div>
	<div
		bind:this={connect_loader}
		class="hidden justify-center items-center absolute w-full h-full top-0 right-0"
	>
		<div class="loader"></div>
	</div>
{:else}
	<div
		class="h-full w-96 p-3 absolute right-0 bg-background2 border-l border-solid border-background3"
	>
		<div class="flex flex-col gap-2 h-full">
			<div
				class="breadcrumbs p-2 border border-solid border-background3 rounded text-font-color3 text-nowrap overflow-x-auto overflow-y-hidden"
				title={current_dir_path}
			>
				<p>
					{current_dir_path}
				</p>
			</div>
			<div class="file-explorer flex-grow overflow-auto">
				<ul class="flex flex-col">
					<li>
						<a
							href="."
							class="p-1 px-2 flex items-center gap-2 hover:bg-background4 rounded text-font-color3 hover:text-font-color"
							on:click|preventDefault={() => {
								changeDir('..')
							}}
						>
							<i class="ri-folder-fill text-base leading-none text-folder-color"></i>
							<span>..</span>
						</a>
					</li>
					{#each FTP_current_dir as element}
						<li>
							<a
								href="."
								class="p-1 px-2 flex items-end gap-2 text-font-color3 hover:text-font-color hover:bg-background4 rounded"
								on:click|preventDefault={() => {
									if (2 == element.type) {
										changeDir(element.name)
									}
								}}
								title={element.name}
							>
								{#if 2 == element.type}
									<i
										class="ri-folder-fill text-base leading-none text-folder-color"
									></i>
								{:else}
									<i
										class="ri-file-3-fill text-base leading-none text-font-color2"
									></i>
								{/if}
								<span class="text-nowrap w-max overflow-hidden overflow-ellipsis">
									{element.name}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="flex gap-2">
				<button
					class="bg-blue-btn rounded p-2 w-full text-font-color2 hover:text-font-color"
					on:click={() => {
						ready_to_send = true
					}}
				>
					Envoyer ici
				</button>
				<button
					class="bg-background3 rounded p-2 w-full text-font-color2 hover:text-font-color"
					on:click={disconnectFTP}
				>
					Se Déconnecter
				</button>
			</div>
		</div>
	</div>
	<div
		bind:this={cd_loader}
		class="hidden justify-center items-center absolute w-96 h-full top-0 right-0"
	>
		<div class="loader"></div>
	</div>
{/if}

{#if ready_to_send}
	<div
		class="w-full h-full bg-background bg-opacity-50 backdrop-blur-sm fixed top-0 left-0 z-50 flex items-center justify-center"
	>
		<div class="w-96 bg-background2 p-4 border border-solid border-background3 rounded-lg">
			{#if selected_project}
				<div class="flex flex-col">
					<p class="mb-3 font-bold text-lg leading-none">Confirmer le déploiement</p>
					<table class="table-fixed w-full">
						<tbody>
							<tr>
								<td class="w-1/3">
									<div class="p-2">Projet:</div>
								</td>
								<td>
									<div class="p-2 font-bold">{selected_project.repo_path}</div>
								</td>
							</tr>
							<tr>
								<td class="w-1/3">
									<div class="p-2">Server:</div>
								</td>
								<td>
									<div class="p-2 font-bold">{FTP_connected}</div>
								</td>
							</tr>
							<tr>
								<td class="w-1/3">
									<div class="p-2">Emplacement:</div>
								</td>
								<td>
									<div class="path-container p-2 max-h-20 overflow-auto">
										<p class="w-full break-words font-bold">
											{current_dir_path}
										</p>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="mt-5 flex gap-2 self-end">
						<button
							class="bg-background3 p-2 rounded text-font-color2 hover:text-font-color"
							on:click={() => (ready_to_send = false)}
						>
							Annuler
						</button>
						<button
							class="bg-blue-btn p-2 rounded text-font-color2 hover:text-font-color"
							on:click={() => {
								ready_to_send = false
								send()
							}}
						>
							Envoyer
						</button>
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center">
					<p class="my-3 font-bold">Veuillez séléctionner un projet à déployer</p>
					<button
						class="mt-3 bg-background3 p-2 px-5 rounded text-font-color2 hover:text-font-color"
						on:click={() => (ready_to_send = false)}
					>
						Ok
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.breadcrumbs::-webkit-scrollbar {
		height: var(--scrollbar-thinkness);
	}
	.breadcrumbs::-webkit-scrollbar-thumb,
	.file-explorer::-webkit-scrollbar-thumb,
	.path-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}

	.loader {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: var(--blue);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
