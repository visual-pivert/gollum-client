<script>
	import { onDestroy, onMount } from 'svelte'
	import Button from './Buttons.svelte'
	import BranchDropdown from './branch_dropdown/BranchDropdown.svelte'
	import MenuDropdown from './menu_dropdown/MenuDropdown.svelte'
	import ProjectDropdown from './project_dropdown/ProjectDropdown.svelte'
	import { rx_selected_project } from './project_dropdown/model'


	let selected_project //rx


	let subscriber
	onMount(() => {
		subscriber = rx_selected_project.subscribe((value) => selected_project = value)
	})

	onDestroy(() => {
		subscriber.unsubscribe()
	})

</script>

<div class="topbar relative z-50">
	<div class="left">
		<MenuDropdown />
		<button id="reload-btn"><i class="ri-restart-line"></i></button>
		<div class="dropdown-container">
			<ProjectDropdown />
			{#if selected_project}
				<BranchDropdown />
			{/if}
		</div>
		{#if selected_project}
			<div class="button-container">
				<Button icon="ri-arrow-left-down-line" icon_color="var(--blue)" label="Pull"/>
				<Button icon="ri-arrow-right-up-line" icon_color="var(--green)" label="Push"/>
				<Button icon="ri-file-copy-line" icon_color="var(--font-color)" label="Clone"/>
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
