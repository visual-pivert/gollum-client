<script>
	import Buttons from '../components/Buttons.svelte'
	import NavIcon from '../components/NavIcon.svelte'
	import Dropdown from '../components/Dropdown.svelte'
	// import VerticalB from '../components/LeftBar.svelte'

	const my_buttons = [
		{
			label: 'Push',
			icon: 'ri-arrow-right-up-line',
			icon_color: 'var(--green)',
			bg_color: 'var(--background3)'
		},
		{
			label: 'configuration',
			bg_color: 'var(--blue-btn)'
		}
	]

	const icons = [
		{
			icon: 'ri-folder-line'
		},
		{
			icon: 'ri-settings-3-line'
		}
	]

	const branch_dropdown = {
		label: 'Current_Branch',
		icon: 'ri-git-branch-line',
		contents: [1, 2, 3]
	}
	const project_dropdown = {
		label: 'Project_name'
	}
</script>

<section class="components">
	<h2>Gollum Components:</h2>

	<div class="compontents-container">
		<div class="buttons-container">
			{#each my_buttons as button}
				<Buttons {...button} />
			{/each}
		</div>

		<div class="nav-icon-container">
			{#each icons as icon}
				<NavIcon icon={icon.icon} />
			{/each}
		</div>

		<div class="dropdown-container">
			<Dropdown {...branch_dropdown} />
			<Dropdown {...project_dropdown} />
		</div>

		<!-- <VerticalBar top_icons=icons/>
        <div class="right">
            <VerticalBar />
        </div> -->
	</div>
</section>

<style>
	.buttons-container,
	.nav-icon-container,
	.dropdown-container {
		display: flex;
		gap: 10px;
		padding: 5px;
		/* background-color: var(--background2); */
	}
</style>
