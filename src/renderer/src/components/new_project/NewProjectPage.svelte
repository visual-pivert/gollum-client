<script>
	// import { openDropdown } from '../../event'
	import Buttons from '../Buttons.svelte'
	// import Dropdown from '../Dropdown.svelte'
	// import { show_tech_list } from './store'

	// const tech_list = ['Laravel', 'Symfony', 'Django', 'Wordpress', 'Autre']
	// let selected_tech = '...'

	const data = {
		project_name: '',
		readme: '',
		contributor: []
	}
	let selected_user

	const users = ['Baba', 'Koto', 'Beloh']
</script>

<div class="bg-background2 p-4 rounded-lg">
	<form action="">
		<div class="flex flex-col gap-4 items-stretch">
			<div class="flex gap-2 flex-col justify-start">
				<label class="w-max" for="project-name">Nom du projet:</label>
				<input
					bind:value={data.project_name}
					type="text"
					class="flex-grow bg-transparent outline-none border focus:border-2 border-solid border-background3 h-8 focus:border-blue-btn p-2 rounded"
					name="project-name"
					id="project-name"
				/>
			</div>
			<!-- <label class="w-max" for="tech" class="flex gap-2 items-center">
				<span>Technologie utilisée:</span>
				<div
					class="min-w-14 pr-0 border border-solid
					{$show_tech_list ? 'border-blue' : 'border-background3'}
					rounded"
				>
					<Dropdown
						label={selected_tech}
						show_content={$show_tech_list}
						on:click={() => {
							openDropdown(show_tech_list)
						}}
					>
						<div slot="content">
							<ul>
								{#each tech_list as tech}
									<li class="rounded hover:bg-background4">
										<a
											class="px-3 py-2 flex"
											href="."
											on:click|preventDefault={() => {
												selected_tech = tech
											}}>{tech}</a
										>
									</li>
								{/each}
							</ul>
						</div>
					</Dropdown>
				</div>
			</label> -->
			<div class="flex flex-col gap-2">
				<label class="w-max" for="readme">Readme:</label>
				<textarea
					bind:value={data.readme}
					class="bg-transparent border focus:border-2 border-solid border-background3 rounded w-full h-16 p-2 outline-none focus:border-blue-btn"
					name="readme"
					id="readme"
				></textarea>
			</div>
			<div class="flex flex-col gap-2">
				<label class="w-max" for="contributor">Contributeur:</label>
				<div class="flex gap-1">
					<input
						bind:value={selected_user}
						list="users"
						type="email"
						name=""
						id="contributor"
						class="flex-grow bg-transparent outline-none border focus:border-2 border-solid border-background3 h-8 focus:border-blue-btn p-2 rounded"
						multiple
					/>
					<button
						class="bg-background4 rounded p-2 pr-3 hover:bg-background3"
						on:click|preventDefault={() => {
							data.contributor.push(selected_user)
						}}
					>
						<i class="ri-add-line"></i>
						<span>Ajouter</span>
					</button>
				</div>
				<datalist id="users" class="">
					{#each users as user}
						<option value={user} class="p-2" />
					{/each}
				</datalist>
				<div>
					{#each data.contributor as contributor}
						<div>
							<span>{contributor}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="w-28 self-end">
				<Buttons bg_color="--blue-btn" label="Créer" on:click={() => console.log(data)} />
			</div>
		</div>
	</form>
</div>

<style>
</style>
