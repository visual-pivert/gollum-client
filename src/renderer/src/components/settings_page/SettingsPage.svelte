<script>
	import { writable } from 'svelte/store'
	import Buttons from '../Buttons.svelte'
	import ManageContributor from '../manage_contributor/ManageContributor.svelte'

	// current project's settings
	const project_data = {
		project_name: 'selected_project',
		contributors: [
			{
				email: 'username.email@gmail.com',
				slug: 'username',
				username: 'username'
			},
			{ username: 'Niim' },
			{ username: 'Selu' },
			{ username: 'Zaama' }
		]
	}

	const new_settings_data = writable(JSON.parse(JSON.stringify(project_data)))

	$: disable_button = JSON.stringify($new_settings_data) === JSON.stringify(project_data)

	function cancelChange() {
		new_settings_data.set(JSON.parse(JSON.stringify(project_data)))
	}

	function saveChange() {
		console.log($new_settings_data)
	}
</script>

<div class="project-container flex flex-col gap-4 p-4 rounded-lg">
	<div class="flex gap-2 flex-col justify-start">
		<label class="w-max" for="project-name">Nom du projet:</label>
		<input
			bind:value={$new_settings_data.project_name}
			type="text"
			class="flex-grow bg-transparent outline-none border focus:border-2 border-solid border-background3 h-8 focus:border-blue-btn p-2 rounded"
			name="project-name"
			id="project-name"
		/>
	</div>
	<ManageContributor project_data={new_settings_data} />
	<div class="flex gap-2 w-max self-end">
		<Buttons
			label="Annuler"
			on:click={() => {
				cancelChange()
			}}
			disabled={disable_button}
		/>
		<Buttons
			label="Enregistrer"
			bg_color="--blue-btn"
			on:click={() => {
				saveChange()
			}}
			disabled={disable_button}
		/>
	</div>
</div>

<style>
	.project-container {
		width: 100%;
		height: 900px;
		background-color: var(--background2);
	}
</style>
