<script>
	import { current_directory, selected_project } from '../../store'
	import Dropdown from '../Dropdown.svelte'
	import { openDropdown } from '../../event'
	import { active_branch_dropdown, openBranchDropdown } from './store'
</script>

<Dropdown
	label={$selected_project.active_branch.name}
	icon="ri-git-branch-line"
	show_content={$active_branch_dropdown}
	on:click={() => openDropdown(active_branch_dropdown, openBranchDropdown)}
>
	<div slot="content">
		<ul>
			{#each Object.entries($selected_project.branch_list) as branch}
				<li class="rounded hover:bg-background4">
					<a
						href="."
						class="px-3 py-2 flex"
						on:click|preventDefault={() => {
							current_directory.update(() => branch[1].contents)
							$selected_project.active_branch = branch[1]
							console.log($current_directory)
						}}
					>
						{branch[1].name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Dropdown>

<style>
</style>
