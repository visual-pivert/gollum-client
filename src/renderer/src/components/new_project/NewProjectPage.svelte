<script>
	import { openDropdown } from '../../event'
	import Buttons from '../Buttons.svelte'
	import Dropdown from '../Dropdown.svelte'
	import { show_tech_list } from './store'

	const tech_list = ['Laravel', 'Symfony', 'Django', 'Wordpress', 'Autre']
	let selected_tech = '...'
</script>

<div class="bg-background2 p-4 rounded-lg">
	<form action="">
		<div class="flex flex-col gap-4 items-stretch">
			<label for="project-name" class="flex gap-2 flex-col">
				<span>Nom du projet:</span>
				<input
					type="text"
					class="flex-grow bg-transparent outline-none border border-solid border-background3 h-8 focus:border-blue p-2 rounded"
					name="project-name"
					id="project-name"
				/>
			</label>
			<label for="tech" class="flex gap-2 items-center">
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
			</label>
			<label for="description" class="flex flex-col gap-2">
				<span>Description:</span>
				<textarea
					class="bg-transparent border border-solid border-background3 rounded w-full h-16 p-2 outline-none focus:border-blue"
					name="description"
					id="description"
				></textarea>
			</label>
			<label for="contributor" class="flex flex-col gap-2">
				<span>Contributeur:</span>
				<textarea
					class="bg-transparent border border-solid border-background3 rounded w-full h-16 p-2 outline-none focus:border-blue"
					name="contributor"
					id="contributor"
				></textarea>
			</label>
			<div class="w-28 self-end">
				<Buttons bg_color="--blue-btn" label="Créer" />
			</div>
		</div>
	</form>
</div>

<style>
</style>
