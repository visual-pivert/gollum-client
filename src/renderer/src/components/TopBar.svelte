<script>
	// import { afterUpdate } from 'svelte'
	import {
		active_branch_dropdown,
		active_menu_dropdown,
		active_project_dropdown,
		current_directory,
		// current_view_path,
		local_project_list,
		not_cloned_project_list,
		selected_project

		// somethingIsOpen
	} from '../store'
	import { openDropdown, resetCurrentDirectoryPath } from '../event'

	import Button from './Buttons.svelte'
	import Dropdown from './Dropdown.svelte'

	// const projects = $project_list.map((project) => project.name)
	// const projects = ['project1']
	// const branches = ['branch1', 'branch2', 'brnach3', 'branch4']

	// $: show_branches = $active_branch_dropdown
	// $: show_projects = $active_project_dropdown

	// afterUpdate(() => {
	// 	// console.log($somethingIsOpen)
	// })
</script>

<div class="topbar">
	<div class="left">
		<!-- <button id="menu-btn" on:click={() => (show_menu = !show_menu)}
			><i class="ri-menu-line"></i></button
		> -->
		<Dropdown
			disable_arrow_icon={true}
			icon="ri-menu-line"
			show_content={$active_menu_dropdown}
			on:click={() => openDropdown(active_menu_dropdown)}
		>
			<div slot="content">
				<a href=".">Nouveau projet</a>
			</div>
		</Dropdown>
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
				label={$selected_project ? $selected_project.name : 'Project'}
				show_content={$active_project_dropdown}
				on:click={() => openDropdown(active_project_dropdown)}
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
											selected_project.update(() => project)
											resetCurrentDirectoryPath(project.name)
											current_directory.update(
												() => $selected_project.active_branch.contents
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
									<a
										href="."
										class="px-3 py-2 flex"
										on:click|preventDefault={() =>
											($selected_project = project)}
									>
										<span>{project.name}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</Dropdown>
			{#if $selected_project}
				<Dropdown
					label={$selected_project.active_branch.name}
					icon="ri-git-branch-line"
					show_content={$active_branch_dropdown}
					on:click={() => openDropdown(active_branch_dropdown)}
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
			{/if}
		</div>
		{#if $selected_project}
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
