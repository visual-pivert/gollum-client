<script>
	import { openDropdown } from '../../event'
	import Dropdown from '../Dropdown.svelte'
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
				<a href="." class="px-3 py-2 flex">Nouveau Projet</a>
			</li>
		</ul>
	</div>
</Dropdown>

<style>
</style>
