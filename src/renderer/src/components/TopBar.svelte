<script>
	import { selected_project } from '../store'
	import Button from './Buttons.svelte'
	import BranchDropdown from './branch_dropdown/BranchDropdown.svelte'
	import ProjectDropdown from './project_dropdown/ProjectDropdown.svelte'
</script>

<div class="topbar">
	<div class="left">
		<!-- <button id="menu-btn" on:click={() => (show_menu = !show_menu)}
			><i class="ri-menu-line"></i></button
		> -->
		<!-- <Dropdown
			disable_arrow_icon={true}
			icon="ri-menu-line"
			show_content={$active_menu_dropdown}
			on:click={() => openDropdown(active_menu_dropdown)}
		>
			<div slot="content">
				<a href=".">Nouveau projet</a>
			</div>
		</Dropdown> -->
		<button id="reload-btn"><i class="ri-restart-line"></i></button>
		<div class="dropdown-container">
			<ProjectDropdown />
			{#if $selected_project}
				<BranchDropdown />
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
	.button-container {
		display: flex;
		gap: 10px;
	}
</style>
