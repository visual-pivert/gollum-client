<script>
	import { onMount } from 'svelte'
	import { new_project_data } from '../../store'
	import Buttons from '../Buttons.svelte'
	import ManageContributor from '../manage_contributor/ManageContributor.svelte'

	const data = {
		project_name: '',
		contributors: []
	}

	let logged_user

	onMount ( async () => {
		logged_user = await window.api.getLoggedUser()
	})

	new_project_data.set(data)

	$: can_create = !$new_project_data.project_name

	const createProject = async () => {
		const repo_created = await window.api.apiCreateRepo(logged_user.access_token, logged_user.username, logged_user.password, data.project_name)
		console.log(repo_created)
		if (data.contributors.length > 0) {
			for (const el of data.contributors) {
				try {
					console.log(el)
					await window.api.apiAddContrib(logged_user.access_token, el.username, logged_user.username + '/' + data.project_name)
				} catch(e) {
					console.log(e)
				}
			}
		}
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
			<ManageContributor />
			<div class="w-28 self-end">
				<Buttons
					bg_color="--blue-btn"
					label="Créer"
					on:click={() => createProject()}
					disabled={can_create}
				/>
			</div>
		</div>
	</form>
</div>

<style>
</style>
