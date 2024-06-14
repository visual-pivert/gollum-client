<script>
	import Dropdown from '../Dropdown.svelte'
	import { active_project_dropdown } from './store'
	import { openDropdown } from '../../event'
	import { rx_is_local_project, rx_selected_project } from './model'
	import { onDestroy, onMount } from 'svelte'

	// Vars
	let local_project_list
	let not_cloned_project_list
	let logged_user
	let selected_project //rx

	// functions
	const fetchLocalProject = async () => {
		let lpl = [
			{ repo_path: 'username/rp1' },
			{ repo_path: 'username/rp2' },
			{ repo_path: 'username/rp3' }
		]
		lpl = await window.api.localRepoList()
		return lpl
	}

	const fetchNotClonedProject = async () => {
		let ncpl = [
			{ repo_path: 'username/repo1' },
			{ repo_path: 'username/repo2' },
			{ repo_path: 'username/repo3' }
		]
		ncpl = await window.api.apiRepoList(logged_user.access_token)
		return ncpl.datas
	}

	// NOT pure function
	const defineProject = (project) => {
		rx_selected_project.next(project)
	}

	const defineIsLocalProject = (is_local) => {
		rx_is_local_project.next(is_local)
	}

	const onDropdownOpen = async () => {
		local_project_list = await fetchLocalProject()
		not_cloned_project_list = await fetchNotClonedProject()
	}

	// lifecycles
	let subscriber
	onMount( async () => {
		logged_user = await window.api.getLoggedUser()
		subscriber = rx_selected_project.subscribe((value) => {selected_project = value})
	})

	onDestroy(() => {
		subscriber.unsubscribe()
	})

	$: show = $active_project_dropdown
</script>

<Dropdown
	label={selected_project ? selected_project.repo_path : 'Project'}
	show_content={show}
	on:click={async() => {
		openDropdown(active_project_dropdown, await onDropdownOpen())
	}}
>
	<div class="dropdown-project" slot="content">
		<div>
			<span class="div-title">Projets local:</span>
			<ul>
				{#each local_project_list as project}
					<li class="rounded hover:bg-background4">
						<a href="." class="px-3 py-2 flex" on:click|preventDefault={async()=> {defineIsLocalProject(true); defineProject(project)}}>
							<span>{project.repo_path}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<span class="div-title">Projets non clonés:</span>
			<ul>
				{#each not_cloned_project_list as project}
					<li class="rounded hover:bg-background4">
						<a href="." class="px-3 py-2 flex" on:click|preventDefault={async()=> {defineIsLocalProject(false); defineProject(project)}}>
							<span>{project.repo_path}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Dropdown>

<style>
	.dropdown-project {
		width: 200px;
	}
	.dropdown-project > div:not(:last-child) {
		margin-bottom: 12px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--background3);
	}
	.div-title {
		display: inline-block;
		font-size: 0.9em;
		color: var(--font-color3);
		margin-bottom: 4px;
	}
</style>
