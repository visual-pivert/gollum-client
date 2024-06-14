<script>
	import Dropdown from '../Dropdown.svelte'
	import { openDropdown } from '../../event'
	import { active_branch_dropdown } from './store'
	import { onDestroy, onMount } from 'svelte'
	import { rx_is_local_project, rx_selected_project } from '../project_dropdown/model'
	import { rx_selected_branch } from './model'


	let branch_list
	let selected_project //rx
	let selected_branch //rx
	let is_local_project //rx
	let logged_user

	// pure function
	const fetchBranch = async (repo_name) => {
		let bl = []
		if (is_local_project) {
			bl = await window.api.localBranchList(repo_name)
			console.log(bl)
		} else {
			bl = await window.api.apiListBranches(logged_user.access_token, repo_name)
			bl = bl.datas
		}

		if (selected_project)
			return bl
		else
			return []
	}

	// Not pure function
	const defineBranch = (branch) => {
		rx_selected_branch.next(branch)
	}

	const onDropdownOpen = async () => {
		branch_list = await fetchBranch(selected_project.repo_path)
	}


	// lifecycles
	let subscribers = []
	onMount( async () => {
		logged_user = await window.api.getLoggedUser()
		const is_local_project_sub = rx_is_local_project.subscribe((value) => {
			is_local_project = value
		})
		const project_sub = rx_selected_project.subscribe( async (value) => {
			selected_project = value
			const fetched_branch = await fetchBranch(selected_project.repo_path)
			console.log(fetched_branch)
			defineBranch(fetched_branch[0])
		})

		const branch_sub = rx_selected_branch.subscribe((value) => {
			selected_branch = value
		})


		subscribers = [project_sub, branch_sub, is_local_project_sub]
	})

	onDestroy(() => {
		for (const sub of subscribers) {
			sub.unsubscribe()
		}
	})

</script>

<Dropdown
	label={selected_branch ? selected_branch.branch_name : null}
	icon="ri-git-branch-line"
	show_content={$active_branch_dropdown}
	on:click={ async () => {
		openDropdown(active_branch_dropdown, await onDropdownOpen())
	}}
>
	<div slot="content">
		<ul>
			{#each branch_list as branch}
				<li class="rounded hover:bg-background4">
					<a
						href="."
						class="px-3 py-2 flex"
						on:click|preventDefault={()=>defineBranch(branch)}
					>
						{branch.branch_name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Dropdown>

<style>
</style>
