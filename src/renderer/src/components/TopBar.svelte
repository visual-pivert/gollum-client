<script>
	// import { afterUpdate } from 'svelte'
	import {
		active_branch_dropdown,
		active_project_dropdown,
		current_directory,
		// current_view_path,
		local_project_list,
		not_cloned_project_list,
		branch_list,
		current_branch,
		current_project,

		storeNotClonedListProject,

		storeBranchList,

		storeTree,

		storeCurrentProject,

		storeCurrentBranch,
		project_tree_path






		// somethingIsOpen
	} from '../store'

	import { openDropdown, resetCurrentDirectoryPath } from '../event'

	import Button from './Buttons.svelte'
	import Dropdown from './Dropdown.svelte'
	import { onMount } from 'svelte'

	import { storeLoggedUser } from '../store'

	// const projects = $project_list.map((project) => project.name)
	// const projects = ['project1']
	// const branches = ['branch1', 'branch2', 'brnach3', 'branch4']

	// $: show_branches = $active_branch_dropdown
	// $: show_projects = $active_project_dropdown

	// afterUpdate(() => {
	// 	// console.log($somethingIsOpen)
	// })

	onMount(async () => {
		await storeLoggedUser()
	})

	// fire lorsque le dropdown qui liste les projets est clicked
	async function projectDropdownClicked() {
		openDropdown(active_project_dropdown)
		await storeNotClonedListProject()
	}

	// fire lorsque un projet non clone est clicked
	async function notClonedUniqueProjectClicked(project) {
		await storeCurrentProject(project)
		await storeBranchList()
		await storeTree()
	}

</script>

<!-- <svelte:document on:click={closeAllDropdown} /> -->

<div class="topbar">
	<div class="left">
		<button id="menu-btn"><i class="ri-menu-line"></i></button>
		<button id="reload-btn"><i class="ri-restart-line"></i></button>
		<div class="dropdown-container">
			<!-- <Button label="Project" icon2="ri-arrow-down-s-line" bg_color="transparent" />
			<Dropdown>
				<ul>
					{#each projects as project}
						<li>{project}</li>
					{/each}

				</ul>
			</Dropdown> -->

			<Dropdown
				label={$current_project ? $current_project.repo_path : 'Project'}
				show_content={$active_project_dropdown}
				on:click={ async () => { await projectDropdownClicked() }}
			>
				<div class="dropdown-project" slot="content">
					<div>
						<span class="div-title">Projets local:</span>
						<ul>
							{#each $local_project_list as project}
								<li class="rounded hover:bg-background4">
									<a
										href="."
										class="px-3 py-2 flex"
										on:click|preventDefault={() => {
											resetCurrentDirectoryPath(project.repo_path)
											storeCurrentProject(project)
											current_directory.update(
												() => $current_project.active_branch.contents
											)
										}}
									>
										<span>{project.name}</span>
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
									<a href="." class="px-3 py-2 flex" on:click|preventDefault={ async () => {
										await resetCurrentDirectoryPath(project.repo_path)
										await notClonedUniqueProjectClicked(project)
									}}>
										<span>{project.repo_path}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</Dropdown>
			{#if $current_project}
				<Dropdown
					label={$current_branch.branch_name}
					icon="ri-git-branch-line"
					show_content={$active_branch_dropdown}
					on:click={ async () => {
						openDropdown(active_branch_dropdown)
						await storeBranchList()
					}}
				>
					<div slot="content">
						<ul>
							{#each $branch_list as branch}
								<li class="rounded hover:bg-background4">
									<a
										href="."
										class="px-3 py-2 flex"
										on:click|preventDefault={ async () => {
											resetCurrentDirectoryPath($current_project.repo_path)
											await storeCurrentBranch(branch)
											await storeTree()
										}}
									>
										{branch.branch_name}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</Dropdown>
			{/if}
		</div>
		{#if $current_project}
			<div class="button-container">
				<Button icon="ri-arrow-left-down-line" icon_color="var(--blue)" label="Pull" />
				<Button icon="ri-arrow-right-up-line" icon_color="var(--green)" label="Push" />
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
	.button-container {
		display: flex;
		gap: 10px;
	}
</style>
