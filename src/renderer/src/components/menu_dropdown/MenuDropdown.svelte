<script>
	import { openDropdown } from '../../event'
	import Dropdown from '../Dropdown.svelte'
	import NewProjectPage from '../new_project/NewProjectPage.svelte'
	import { show_new_project_modal } from '../new_project/store'
	import { active_menu_dropdown } from './store'
</script>

<Dropdown
	icon="ri-menu-line"
	disable_arrow_icon={true}
	show_content={$active_menu_dropdown}
	on:click={() => {
		openDropdown(active_menu_dropdown)
	}}
>
	<div slot="content">
		<ul>
			<li class="rounded hover:bg-background4">
				<a
					href="."
					class="px-3 py-2 flex"
					on:click|preventDefault={() => show_new_project_modal.set(true)}
					>Nouveau Projet</a
				>
			</li>
		</ul>
	</div>
</Dropdown>

<NewProjectPage />

<style>
</style>
