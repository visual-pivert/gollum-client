<script>
	import { onDestroy, onMount } from 'svelte'
	import Button from './Buttons.svelte'
	import BranchDropdown from './branch_dropdown/BranchDropdown.svelte'
	import MenuDropdown from './menu_dropdown/MenuDropdown.svelte'
	import ProjectDropdown from './project_dropdown/ProjectDropdown.svelte'
	import { rx_is_local_project, rx_selected_project } from './project_dropdown/model'
	import { rx_selected_branch } from './branch_dropdown/model'
	import { right_buttons_events } from './right_aside/right_aside_buttons'
	import { rx_ftp_connected } from './FTP/model'

	let selected_project //rx
	let selected_branch //rx
	let is_local_project //rx
	let FTP_connected //rx
	let logged_user

	const gitPush = async () => {
		await window.api.gitPush(
			selected_project.repo_path,
			{ username: logged_user.username, password: logged_user.password },
			'origin',
			selected_branch.branch_name
		)
	}

	const gitPull = async () => {
		await window.api.gitPull(
			selected_project.repo_path,
			{ username: logged_user.username, password: logged_user.password },
			'origin',
			selected_branch.branch_name
		)
	}

	const gitClone = async () => {
		await window.api.gitClone(
			'',
			{ username: logged_user.username, password: logged_user.password },
			selected_project.repo_path,
			''
		)
	}

	let subscribers = []
	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
		const selected_project_sub = rx_selected_project.subscribe(
			(value) => (selected_project = value)
		)
		const selected_branch_sub = rx_selected_branch.subscribe(
			(value) => (selected_branch = value)
		)
		const is_local_project_sub = rx_is_local_project.subscribe(
			(value) => (is_local_project = value)
		)
		const FTP_connected_sub = rx_ftp_connected.subscribe((value) => (FTP_connected = value))
		subscribers = [
			selected_branch_sub,
			selected_project_sub,
			is_local_project_sub,
			FTP_connected_sub
		]
	})

	onDestroy(() => {
		for (const sub of subscribers) {
			sub.unsubscribe()
		}
	})
</script>

<div class="topbar relative z-50 flex justify-between">
	<div class="left">
		<MenuDropdown />
		<button id="reload-btn"><i class="ri-restart-line"></i></button>
		<div class="dropdown-container">
			<ProjectDropdown />
			{#if selected_project}
				<BranchDropdown />
			{/if}
		</div>
		{#if selected_project}
			<div class="button-container">
				{#if is_local_project}
					<Button
						icon="ri-arrow-left-down-line"
						icon_color="var(--blue)"
						label="Pull"
						on:click={async () => {
							await gitPull()
						}}
					/>
					<Button
						icon="ri-arrow-right-up-line"
						icon_color="var(--green)"
						label="Push"
						on:click={async () => {
							await gitPush()
						}}
					/>
				{:else}
					<Button
						icon="ri-file-copy-line"
						icon_color="var(--font-color)"
						label="Clone"
						on:click={async () => {
							await gitClone()
						}}
					/>
				{/if}
			</div>
		{/if}
	</div>
	<div class="right">
		<div class="flex items-center p-2 text-font-color2">
			<i class="ri-server-line {FTP_connected ? 'text-green' : 'text-red'} text-lg mr-1"></i>
			{#if FTP_connected}
				<button
					title="Se déconnecter"
					on:click={() => {
						document.dispatchEvent(right_buttons_events.ftp)
					}}
				>
					<span class="font-bold">ftp://</span>
					{FTP_connected}
				</button>
			{:else}
				<button
					class="text-green"
					title="Se connecter"
					on:click={() => {
						document.dispatchEvent(right_buttons_events.ftp)
					}}
				>
					<span>FTP Non Connecté</span>
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.topbar {
		width: 100vw;
		height: var(--bar-thinkness);
		display: flex;
		align-items: center;
		padding: 0 10px;
		background-color: var(--background2);
		border-bottom: 1px solid var(--background);
	}
	.left {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	button {
		all: unset;
		cursor: pointer;
	}
	.dropdown-container {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.button-container {
		display: flex;
		gap: 10px;
	}
</style>
