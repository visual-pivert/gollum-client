<script>
	import { onMount } from 'svelte'
	import Buttons from '../Buttons.svelte'
	import { search } from '../search'
	import { rx_selected_project } from '../project_dropdown/model'
	import { rx_selected_branch } from '../branch_dropdown/model'

	let config_list = [
		{
			tech: '',
			old_config: [
				{ name: '', date: '', config: {} },
			],
			form: [
				{
					name: '',
					type: ''
				},
			]
		}
	]

	let selected_template = config_list[0]
	let template_to_search = ''
	$: template_result = search(config_list, template_to_search, 'tech')

	$: selected_config = selected_template.old_config
	let config_to_search = ''
	$: config_result = search(selected_config, config_to_search, 'name')

	let old_config_chosen = null

	let config_form
	let config_form_data

	let is_loaded = false

	let selected_project
	let selected_branch

	const fetchConfigList = async () => {
		const fetched_config_list = await window.api.prodConfigList()
		config_list = []
		let template_setted = []

		let old_for = {}

		for (const fetched_config_2 of fetched_config_list) {
			const template_name = fetched_config_2.template_name

			if(Object.keys(old_for).indexOf(template_name) < 0) {
				old_for[template_name] = []
			}

			const config_name = fetched_config_2.config_name
			const timestamp = fetched_config_2.timestamp
			const config = JSON.parse(fetched_config_2.config)
			const prod_list_input = await window.api.prodListInputConfig(template_name)

			let conf = {}
			for (const field of prod_list_input) {
				conf[field] = ''
				if (config[field]) {
					conf[field] = config[field]
				}
			}

			console.log(template_name)
			console.log(old_for)
			console.log(old_for[template_name])
			old_for[template_name] = [...old_for[template_name], { name:  config_name, date: timestamp, config: conf }]
		}

		for (const fetched_config of fetched_config_list) {
			const template_name = fetched_config.template_name
			const prod_list_input = await window.api.prodListInputConfig(template_name)

			const formated_list_input = prod_list_input.map((value) => {return { name: value, type: 'text' }})
			if (template_setted.indexOf(template_name) < 0){
				config_list = [...config_list, { tech: template_name, old_config: old_for[template_name], form: formated_list_input }]
			}
			template_setted = [...template_setted, template_name]
		}
		const set_config_list = new Set(config_list)
		config_list = [...set_config_list]


		// Ajout de autres templates
		const template_from_base = config_list.map((value) => value.tech)
		const template_from_dir = await window.api.localTemplateList()
		console.log(template_from_dir)
		let new_templates = []
		template_from_dir.forEach((value) => {
			if (template_from_base.indexOf(value) < 0) {
				new_templates = [...new_templates, value]
			}
		})

		for (const new_template of new_templates) {
			let new_template_tokens = await window.api.prodListInputConfig(new_template)
			new_template_tokens = new_template_tokens.map((value) => { return {name: value, type: 'text'} })
			config_list = [
				...config_list,
				{
					tech: new_template,
					form: new_template_tokens,
					old_config: [{ name: '', date: '', config: {} }]
				}
			]
		}

		console.log(config_list)

	}


	onMount( async () => {

		rx_selected_project.subscribe((value) => {
			selected_project = value
		})

		rx_selected_branch.subscribe((value) => {
			selected_branch = value
		})

		await fetchConfigList()
		selected_template = config_list[0]
		is_loaded = true
	})

	async function saveConfig() {
		config_form_data = new FormData(config_form)
		const conf = Object.fromEntries(config_form_data)
		const conf_name = conf['__config_name']
		delete conf['__config_name']
		let submitable = false
		for(const [key, value] of Object.entries(conf)) {
			if (value) {
				submitable = true
				break
			}
		}
		if (!submitable) {
			console.log('unsubmitable')
		} else {
			await window.api.prodSaveAndPutConfigOnProduction(
				selected_project.repo_path,
				selected_branch.branch_name,
				conf_name,
				selected_template.tech,
				conf
			)
		}
		console.log(conf)
	}

	let files

	let modal_opened = false
	function openModal() {
		modal_opened = true
	}
	function colseModal() {
		modal_opened = false
	}

	$: new_config = true
</script>

{#if is_loaded}
<div class="bg-background2 p-3 rounded-lg">
	<span class="font-bold text-xl mb-3 block px-2">Configuration du mise en production :</span>
	<div class="p-2">
		<div class="mb-6">
			<!-- SELECT TEMPLETE TO USE -->
			<div class="flex flex-col gap-2 mb-6">
				<label for="template" class="self-start">
					<span class="font-bold">Templates :</span>
				</label>
				<div class="flex gap-2 items-center">
					<div class="flex-grow relative">
						<label
							for="template"
							class="flex gap-2 items-center border border-solid border-background3 rounded h-8 p-2"
						>
							<i class="ri-search-line"></i>
							<input
								type="text"
								name=""
								id="template"
								class="bg-transparent outline-none flex-grow"
								bind:value={template_to_search}
								placeholder={selected_template.tech}
								on:input={() => {
									console.log(template_result)
								}}
							/>
						</label>
						{#if template_result.length > 0 && template_to_search}
							<div
								class="absolute w-full bg-background2 border border-solid border-background3 rounded p-2"
							>
								<ul>
									{#each template_result as template}
										<li class="hover:bg-background4 rounded">
											<a
												href="."
												class="p-2 block"
												on:click|preventDefault={() => {
													template_to_search = ''
													template_result = []
													selected_template = template
												}}>{template.tech}</a
											>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- BUTTON SWITCH CONFIG MODE -->
			<div class="flex gap-2 h-8">
				<Buttons
					label="Nouvelle configuration"
					bg_color={new_config ? '--blue-btn' : '--transpqrent'}
					classes={new_config ? '' : 'border'}
					on:click={async() => {
						new_config = true
						old_config_chosen = null
						await fetchConfigList()
					}}
				/>
				<Buttons
					label="Configurations existantes"
					bg_color={!new_config ? '--blue-btn' : '--transpqrent'}
					classes={!new_config ? '' : 'border'}
					on:click={ async () => {
						new_config = false
						old_config_chosen = null
						await fetchConfigList()
					}}
				/>
			</div>
		</div>

		{#if new_config ? !old_config_chosen : old_config_chosen}
			<form bind:this={config_form} class="flex flex-col">
				<table class="table-fixed mb-2">
					<tr>
						<td class="py-1 w-3/12">
							<label for="config-name" class="font-bold">Nom de la configuration</label>
						</td>
						<td class="py-1 w-9/12">
							<input
								type="text"
								name="__config_name"
								id="config-name"
								value={old_config_chosen ? old_config_chosen.name : ''}
								class="w-full bg-transparent h-8 p-2 border focus:border-2 border-solid border-background3 focus:border-blue-btn outline-none rounded"
							/>
						</td>
					</tr>
					<tr>
						<td class="pt-4" colspan="2">
							<span class="font-bold text-base">Configuration :</span>
						</td>
					</tr>
					{#each selected_template.form as field}
						<tr class="">
							<td class="py-1 w-3/12">
								<label for={field.name} class="">{field.name} :</label>
							</td>
							<td class="py-1 w-9/12">
								<input
									type={field.type}
									id={field.name}
									name={field.name}
									value={(old_config_chosen && old_config_chosen['config'] && old_config_chosen['config'][field.name]) ? old_config_chosen['config'][field.name] : ''}
									class="w-full bg-transparent outline-none h-8 rounded border border-solid border-background3 p-2 focus:border-2 focus:border-blue-btn"
									/>
							</td>
						</tr>
					{/each}
				</table>
				<div class="w-max self-end">
					<Buttons
						label="Sauvegarder"
						bg_color="--blue-btn"
						on:click={ async () => {
							await saveConfig()
							await fetchConfigList()
						}}
					/>
				</div>
			</form>
		{:else}
			<div class="flex-grow relative">
				<label
					for="template"
					class="flex gap-2 items-center border border-solid border-background3 rounded h-8 p-2"
				>
					<i class="ri-search-line"></i>
					<input
						type="text"
						name=""
						id="template"
						class="bg-transparent outline-none flex-grow"
						bind:value={config_to_search}
						placeholder="Rechercher une configuration"
						on:input={() => {
							console.log(config_result)
						}}
					/>
				</label>
			</div>

			<div class="flex flex-col gap-3">
				<div class="border border-solid border-background3 rounded mt-2">
					<table class="table-fixed w-full">
						<thead class="bg-background4 broder-b border-solid">
							<tr class="border-background3">
								<td class="p-2">Nom du config</td>
								<td class="p-2">Date</td>
								<td class="w-20"></td>
							</tr>
						</thead>
						<tbody>
							{#each config_result as config}
								<tr class="hover:bg-background4" title={config.name}>
									<td class="p-2">
										<span>{config.name}</span>
									</td>
									<td class="p-2">
										<span>{config.date}</span>
									</td>
									<td class="p-2 flex justify-center">
										<button
											class="p-1 px-2 bg-background3 rounded hover:bg-blue-btn"
											on:click={() => {
												old_config_chosen = config
												new_config = null
												console.log(old_config_chosen)
											}}>Choisir</button
										>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if modal_opened}
	<div
		class="w-full h-full bg-background bg-opacity-50 backdrop-blur-sm absolute top-0 left-0 z-50 flex items-center justify-center"
	>
		<div
			class="w-max bg-background2 p-5 rounded-lg border border-solid border-background3 shadow-lg"
		>
			<div class="flex flex-col gap-2">
				<span class="font-bold text-lg">Nouveau template</span>
				<table class="table-fixed">
					<tr class="">
						<td class="px-1 pr-4 w-2/6">
							<label for="template-name">
								<span>Nom :</span>
							</label>
						</td>
						<td class="py-1 w-1/6">
							<input
								type="text"
								name="template-name"
								id="template-name"
								class="bg-transparent outline-none border focus:border-2 border-solid border-background3 focus:border-blue-btn rounded p-2 h-8 w-80"
							/>
						</td>
					</tr>
					<tr class="">
						<td class="px-1 pr-4 w-2/6">
							<label for="template-file">
								<span>Fichier :</span>
							</label>
						</td>
						<td class="py-1 w-1/6">
							<input
								bind:files
								type="file"
								name="template-file"
								id="template-file"
								multiple
								class="hidden"
							/>
							<label for="template-file">
								<div
									class="bg-transparent border border-solid border-background3 rounded p-2 h-8 w-80 flex items-center text-nowrap"
								>
									{#if files}
										{#each files as file}
											{file.name}
										{/each}
									{:else}
										<span class="opacity-50">Importer ici</span>
									{/if}
								</div>
							</label>
						</td>
					</tr>
				</table>
				<div class="flex gap-2 w-max self-end mt-3">
					<Buttons label="Annuler" on:click={colseModal} />
					<Buttons label="Confirmer" bg_color="--blue-btn" />
				</div>
			</div>
		</div>
	</div>
{/if}
{/if}


<style>
	tbody tr {
		border-top: 1px solid var(--background3);
	}
</style>
