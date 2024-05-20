<script lang="ts">
	import NavIcon from '../NavIcon.svelte'
	// import { createEventDispatcher } from 'svelte'
	import { updateCurrentPage } from '../../event'
	// import { active_project_dropdown, current_page } from '../store'
	import { right_events } from '../right_aside/elements'

	// const dispatch = createEventDispatcher()

	// class Buttons {
	// 	public name: string
	// 	public icon: string
	// 	constructor(name, icon) {
	// 		this.name = name
	// 		this.icon = icon
	// 	}
	// 	abstract onClick(): void
	// }

	const top_buttons = [
		{
			page_ref: 'project_page',
			icon: 'ri-folder-line',
			event: () => {
				updateCurrentPage('project_page')
			}
		},
		{
			page_ref: 'settings_page',
			icon: 'ri-settings-3-line',
			event: () => {
				updateCurrentPage('settings_page')
			}
		},
		{
			icon: 'ri-arrow-left-line',
			event: () => {
				document.dispatchEvent(right_events.commit_list)
			}
		}
	]
	const bottom_buttons = []
</script>

<div class="container">
	<div class="button-container">
		{#each top_buttons as button}
			<NavIcon icon={button.icon} on:click={button.event} />
		{/each}
	</div>
	<div class="button-container">
		{#each bottom_buttons as button}
			<NavIcon icon={button.icon} />
		{/each}
	</div>
</div>

<style>
	.container {
		width: var(--bar-thinkness);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background-color: var(--background2);
	}
	.button-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
