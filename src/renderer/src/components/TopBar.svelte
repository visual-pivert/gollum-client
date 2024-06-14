<script>
	import { onDestroy, onMount } from 'svelte'
	import Button from './Buttons.svelte'
	import BranchDropdown from './branch_dropdown/BranchDropdown.svelte'
	import MenuDropdown from './menu_dropdown/MenuDropdown.svelte'
	import ProjectDropdown from './project_dropdown/ProjectDropdown.svelte'
	import { rx_selected_project } from './project_dropdown/model'
	import { rx_selected_branch } from './branch_dropdown/model'

	let selected_project //rx
	let selected_branch //rx
	let logged_user

	const gitPush = async () => {
		await window.api.gitPush(selected_project.repo_path, { username: logged_user.username, password: logged_user.password }, 'origin', selected_branch.branch_name)
	}


	const gitPull = async () => {
		await window.api.gitPull(selected_project.repo_path, { username: logged_user.username, password: logged_user.password }, 'origin', selected_branch.branch_name)
	}

	const gitClone = async () => {
		await window.api.gitClone('', { username: logged_user.username, password: logged_user.password }, selected_project.repo_path, '')
	}

	let subscribers = []
	onMount(async() => {
		logged_user = await window.api.getLoggedUser()
		const selected_project_sub = rx_selected_project.subscribe((value) => selected_project = value)
		const selected_branch_sub = rx_selected_branch.subscribe((value) => selected_branch = value)
		subscribers = [selected_branch_sub, selected_project_sub]
	})

	onDestroy(() => {
		for (const sub of subscribers) {
			sub.unsubscribe()
		}
	})

</script>

<div class="topbar relative z-50">
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
				<Button icon="ri-arrow-left-down-line" icon_color="var(--blue)" label="Pull" on:click={ async ()=> { await gitPull() }}/>
				<Button icon="ri-arrow-right-up-line" icon_color="var(--green)" label="Push" on:click={ async ()=> { await gitPush() }}/>
				<Button icon="ri-file-copy-line" icon_color="var(--font-color)" label="Clone" on:click={ async ()=> { await gitClone() } }/>
			</div>
		{/if}
	</div>
	<div class="right"></div>
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
		gap: 10px;
	}
	.button-container {
		display: flex;
		gap: 10px;
	}
</style>
