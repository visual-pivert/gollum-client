<script>
	import { new_project_data } from '../../store'
	import Buttons from '../Buttons.svelte'
	import ManageContributor from '../manage_contributor/ManageContributor.svelte'

	const data = {
		project_name: '',
		readme: '',
		contributors: []
	}

	new_project_data.set(data)

	$: can_create = !$new_project_data.project_name

	function crateProject() {
		console.log(data)
	}
</script>

<div class="bg-background2 p-4 rounded-lg">
	<form action="">
		<div class="flex flex-col gap-4 items-stretch">
			<div class="flex gap-2 flex-col justify-start">
				<label class="w-max" for="project-name">Nom du projet:</label>
				<input
					bind:value={$new_project_data.project_name}
					type="text"
					class="flex-grow bg-transparent outline-none border focus:border-2 border-solid border-background3 h-8 focus:border-blue-btn p-2 rounded"
					name="project-name"
					id="project-name"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label class="w-max" for="readme">Readme:</label>
				<textarea
					bind:value={$new_project_data.readme}
					class="bg-transparent border focus:border-2 border-solid border-background3 rounded w-full h-16 p-2 outline-none focus:border-blue-btn"
					name="readme"
					id="readme"
				></textarea>
			</div>
			<ManageContributor />
			<div class="w-28 self-end">
				<Buttons
					bg_color="--blue-btn"
					label="Créer"
					on:click={() => crateProject()}
					disabled={can_create}
				/>
			</div>
		</div>
	</form>
</div>

<style>
</style>
