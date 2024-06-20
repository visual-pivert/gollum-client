<script>
	import { onMount } from 'svelte'
	import Buttons from '../Buttons.svelte'
	import ManageContributor from '../manage_contributor/ManageContributor.svelte'
	import { show_new_project_modal } from './store'
	import { writable } from 'svelte/store'

	const data = writable({
		project_name: '',
		contributors: []
	})

	let logged_user

	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
	})

	$: can_create = !$data.project_name

	const createProject = async () => {
		const repo_created = await window.api.apiCreateRepo(
			logged_user.access_token,
			logged_user.username,
			logged_user.password,
			$data.project_name
		)
		console.log(repo_created)
		if ($data.contributors.length > 0) {
			for (const el of $data.contributors) {
				try {
					console.log(el)
					await window.api.apiAddContrib(
						logged_user.access_token,
						el.username,
						logged_user.username + '/' + $data.project_name
					)
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

{#if $show_new_project_modal}
	<div
		class="w-full h-full bg-background bg-opacity-50 backdrop-blur-sm fixed top-0 left-0 z-50 flex items-center justify-center"
	>
		<div
			class="min-w-96 w-2/5 bg-background2 p-4 border border-solid border-background3 rounded-lg"
		>
			<form action="">
				<div class="flex flex-col gap-4 items-stretch">
					<div class="flex gap-2 flex-col justify-start">
						<label class="w-max" for="project-name">Nom du projet:</label>
						<input
							bind:value={$data.project_name}
							type="text"
							class="flex-grow bg-transparent outline-none border focus:border-2 border-solid border-background3 w-full h-8 focus:border-blue-btn p-2 rounded"
							name="project-name"
							id="project-name"
						/>
					</div>
					<ManageContributor project_data={data} />
					<div class="w-max self-end flex gap-2">
						<Buttons
							label="Annuler"
							on:click={() => {
								show_new_project_modal.set(false)
							}}
						/>
						<Buttons
							bg_color="--blue-btn"
							label="Créer"
							on:click={() => {
								createProject()
							}}
							disabled={can_create}
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
</style>
