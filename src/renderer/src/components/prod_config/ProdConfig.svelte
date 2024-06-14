<script>
	import Buttons from '../Buttons.svelte'

	let config_list = [
		{
			tech: 'wrodpress',
			old_config: [
				{ name: 'config', date: '1563-65-78' },
				{ name: 'config', date: '1563-65-78' },
				{ name: 'config', date: '1563-65-78' }
			],
			form: [
				{
					name: 'db_name',
					type: 'text'
				},
				{
					name: 'db_user',
					type: 'text'
				},
				{
					name: 'db_password',
					type: 'password'
				},
				{
					name: 'db_host',
					type: 'text'
				}
			]
		},
		{
			tech: 'laravel',
			old_config: [
				{ name: 'config', date: '1563-65-78' },
				{ name: 'config', date: '1563-65-78' },
				{ name: 'config', date: '1563-65-78' }
			],
			form: [
				{
					name: 'db_name',
					type: 'text'
				},
				{
					name: 'db_user',
					type: 'text'
				},
				{
					name: 'db_password',
					type: 'password'
				}
			]
		}
	]

	let selected_config = config_list[0]

	let config_form
	let config_form_data

	function saveConfig() {
		config_form_data = new FormData(config_form)
		console.log(Object.fromEntries(config_form_data))
	}

	let files

	let modal_opened = false
	function openModal() {
		modal_opened = true
	}
	function colseModal() {
		modal_opened = false
	}

	let new_config = true
</script>

<div class="bg-background2 p-3 rounded-lg">
	<span class="font-bold text-xl mb-2">Configuration du mise en production :</span>
	<div class="p-2">
		<div>
			<label for="template" class="flex flex-col gap-2 mb-3">
				<span>Templates :</span>
				<div class="flex gap-2 items-center">
					<div
						class="flex gap-2 items-center flex-grow border border-solid border-background3 rounded h-8 p-2"
					>
						<i class="ri-search-line"></i>
						<input
							type="text"
							name=""
							id="template"
							class="bg-transparent outline-none flex-grow"
						/>
						<div class="absolute w-full"></div>
					</div>
					<div class="flex h-8">
						<Buttons
							label="Ajouter un autre"
							icon="ri-add-line"
							on:click={() => openModal()}
						/>
					</div>
				</div>
			</label>
			<div class="flex gap-2 h-8 mb-3">
				<Buttons
					label="Nouvelle configuration"
					bg_color={new_config ? '--blue-btn' : '--transpqrent'}
					classes={new_config ? '' : 'border'}
					on:click={() => {
						new_config = true
					}}
				/>
				<Buttons
					label="Configurations existantes"
					bg_color={!new_config ? '--blue-btn' : '--transpqrent'}
					classes={!new_config ? '' : 'border'}
					on:click={() => {
						new_config = false
					}}
				/>
			</div>
		</div>

		{#if new_config}
			<form bind:this={config_form} class="flex flex-col">
				<table class="table-fixed mb-2">
					{#each selected_config.form as field}
						<tr class="">
							<td class="py-1 w-3/12">
								<label for={field.name} class="">{field.name} :</label>
							</td>
							<td class="py-1 w-9/12">
								<input
									type={field.type}
									id={field.name}
									name={field.name}
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
						on:click={() => {
							saveConfig()
						}}
					/>
				</div>
			</form>
		{:else}
			<div class="flex flex-col gap-3">
				<div class="border border-solid border-background3 rounded mt-2">
					<table class="table-fixed w-full">
						<thead class="bg-background4 broder-b border-solid">
							<tr class="border-background3">
								<td class="p-2">Nom du config</td>
								<td class="p-2">Date</td>
								<td class="w-10"></td>
							</tr>
						</thead>
						<tbody>
							{#each selected_config.old_config as config}
								<tr class="hover:bg-background4" title={config.name}>
									<td class="p-2">
										<span>{config.name}</span>
									</td>
									<td class="p-2">
										<span>{config.date}</span>
									</td>
									<td>
										<i class="ri-check-line text-green"></i>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div class="w-max self-end">
					<Buttons label="Confirmer" bg_color="--blue-btn" />
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

<style>
	tbody tr {
		border-top: 1px solid var(--background3);
	}
</style>
