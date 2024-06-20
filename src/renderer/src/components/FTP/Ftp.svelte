<script>
	import { onDestroy, onMount } from 'svelte'
	import Buttons from '../Buttons.svelte'
	import { rx_ftp_connected } from './model'

	let FTP_connected //rx
	let port_field

	const connection = {
		host: '',
		username: '',
		password: '',
		port: ''
	}

	const formatPort = () => {
		port_field.value = port_field.value.replace(/[^\d]/g, '').substring(0, 6)
	}

	const connectFTP = () => {
		console.log(connection)

		rx_ftp_connected.next(connection.host)
	}

	const disconnectFTP = () => {
		//
		rx_ftp_connected.next('')
	}

	let subscribers = []
	onMount(() => {
		const FTP_connected_sub = rx_ftp_connected.subscribe((value) => (FTP_connected = value))
		subscribers = [FTP_connected_sub]
	})

	onDestroy(() => {
		subscribers.forEach((sub) => sub.unsubscribe())
	})

	const FTP_current_dir = [
		{ name: 'dir1', type: 'tree' },
		{ name: 'dir2', type: 'tree' },
		{ name: 'dir3', type: 'tree' },
		{ name: 'file', type: 'blob' }
	]
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
{:else}
	<div
		class="h-full w-96 p-3 absolute right-0 bg-background2 border-l border-solid border-background3"
	>
		<div class="flex flex-col gap-2 h-full">
			<div class="p-2 border border-solid border-background3 rounded text-font-color3">
				<p>/src/</p>
			</div>
			<div class="flex-grow">
				<ul class="flex flex-col">
					<li>
						<a
							href="."
							class="p-1 px-2 flex items-center gap-2 hover:bg-background4 rounded text-font-color3 hover:text-font-color"
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
							>
								{#if element.type == 'tree'}
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

			<Buttons
				label="Se Déconnecter"
				on:click={() => {
					disconnectFTP()
				}}
			/>
		</div>
	</div>
{/if}

<style>
</style>
