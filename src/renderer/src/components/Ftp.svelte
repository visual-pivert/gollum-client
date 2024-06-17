<script>
	import Buttons from './Buttons.svelte'

	let port_field

	const connection = {
		host: '',
		username: '',
		password: '',
		port: ''
	}

	function formatPort() {
		port_field.value = port_field.value.replace(/[^\d]/g, '').substring(0, 6)
	}

	function connectFTP() {
		console.log(connection)
	}
</script>

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
		<Buttons label="Se Connecter" bg_color="--blue-btn" on:click={() => connectFTP()} />
	</div>
</div>

<style>
</style>
