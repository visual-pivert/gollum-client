<script>
	import Dropdown from '../Dropdown.svelte'
	import { openDropdown } from '../../event'
	import { active_branch_dropdown } from './store'
	import { onDestroy, onMount } from 'svelte'
	import { rx_selected_project } from '../project_dropdown/model'
	import { rx_selected_branch } from './model'


	let branch_list
	let selected_project //rx
	let selected_branch //rx

	// pure function
	const fetchBranch = async () => {
		const branch_list_mock = [
			[
				{ branch_name: 'b1' },
				{ branch_name: 'b2' },
				{ branch_name: 'b3' },
				{ branch_name: 'b4' }
			],
			[
				{ branch_name: 'c1' },
				{ branch_name: 'c2' },
				{ branch_name: 'c3' },
				{ branch_name: 'c4' }
			]
		]
		function getRandomInt(max) {
			return Math.floor(Math.random() * max)
		}
		if (selected_project)
			return branch_list_mock[getRandomInt(branch_list_mock.length)]
		else
			return []
	}

	// Not pure function
	const defineBranch = (branch) => {
		rx_selected_branch.next(branch)
	}

	const onDropdownOpen = async () => {
		branch_list = await fetchBranch()
	}


	// lifecycles
	let subscribers = []
	onMount(() => {
		const project_sub = rx_selected_project.subscribe( async (value) => {
			selected_project = value
			const fetched_branch = await fetchBranch()
			defineBranch(fetched_branch[0])
		})

		const branch_sub = rx_selected_branch.subscribe((value) => {
			selected_branch = value
		})

		subscribers = [project_sub, branch_sub]
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
