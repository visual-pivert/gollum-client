<script>
// @ts-nocheck

	import { openDropdown, resetCurrentDirectoryPath } from '../../event'

	import {
		current_directory,
		local_project_list,
		not_cloned_project_list,
		selected_project,
		is_local_project
	} from '../../store'
	import Dropdown from '../Dropdown.svelte'
	import { active_project_dropdown, openProjectDropdown, defineProject } from './store'

	$: show = $active_project_dropdown
</script>

<Dropdown
	label={$selected_project ? $selected_project.repo_path : 'Project'}
	show_content={show}
	on:click={() => {
		openDropdown(active_project_dropdown, openProjectDropdown)
	}}
>selected_project
	<div class="dropdown-project" slot="content">
		<div>
			<span class="div-title">Projets local:</span>
			<ul>
				{#each $local_project_list as project}
					<li class="rounded hover:bg-background4">
						<a
							href="."
							class="px-3 py-2 flex"
							on:click|preventDefault={async () => {
								is_local_project.update(() => true)
								await defineProject(project)
								// current_directory.update(
								// 	() => $selected_project.active_branch.contents
								// )

							}}
						>
							<span>{project.repo_path}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<span class="div-title">Projets non clonés:</span>
			<ul>
				{#each $not_cloned_project_list as project}
					<li class="rounded hover:bg-background4">
						<a
							href="."
							class="px-3 py-2 flex"
							on:click|preventDefault={async () => {
								is_local_project.update(() => false)
								await defineProject(project)
							}}
						>
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
