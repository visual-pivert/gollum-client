<script>
	import { current_directory, selected_branch, branch_list } from '../../store'
	import Dropdown from '../Dropdown.svelte'
	import { openDropdown } from '../../event'
	import { active_branch_dropdown, defineBranch, openBranchDropdown } from './store'
</script>

<Dropdown
	label={$selected_branch}
	icon="ri-git-branch-line"
	show_content={$active_branch_dropdown}
	on:click={() => openDropdown(active_branch_dropdown, openBranchDropdown)}
>
	<div slot="content">
		<ul>
			{#each $branch_list as branch}
				<li class="rounded hover:bg-background4">
					<a
						href="."
						class="px-3 py-2 flex"
						on:click|preventDefault={ async () => {
							await defineBranch(branch.branch_name)
							console.log($current_directory)
						}}
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
