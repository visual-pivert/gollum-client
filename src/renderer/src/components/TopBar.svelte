<script>
	import { afterUpdate } from 'svelte'
	import {
		active_branch_dropdown,
		active_project_dropdown
		// somethingIsOpen
	} from '../store'
	import { openDropdown } from '../event'

	import Button from './Buttons.svelte'
	import Dropdown from './Dropdown.svelte'

	const projects = ['project1', 'project2', 'project3']
	const branches = ['branch1', 'branch2', 'brnach3', 'branch4']

	$: show_branches = $active_branch_dropdown
	$: show_projects = $active_project_dropdown

	afterUpdate(() => {
		// console.log($somethingIsOpen)
	})
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
				label="Project"
				contents={projects}
				show_content={show_projects}
				on:click={() => openDropdown(active_project_dropdown)}
			></Dropdown>
			<Dropdown
				label="Branch"
				icon="ri-git-branch-line"
				contents={branches}
				show_content={show_branches}
				on:click={() => openDropdown(active_branch_dropdown)}
			></Dropdown>
		</div>
		<div class="button-container">
			<Button icon="ri-arrow-left-down-line" icon_color="var(--blue)" label="Pull" />
			<Button icon="ri-arrow-right-up-line" icon_color="var(--green)" label="Push" />
		</div>
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
