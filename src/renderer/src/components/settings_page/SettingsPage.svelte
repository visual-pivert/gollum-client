<script>
	import { writable } from 'svelte/store'
	import Buttons from '../Buttons.svelte'
	import { onMount } from 'svelte'
	import { search } from '../search'
	import { openDropdown } from '../../event'
	import { crossfade, fade, fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { flip } from 'svelte/animate'
	// import ManageContributor from '../manage_contributor/ManageContributor.svelte'

	let users = []
	let logged_user
	const search_contrib_dropdown = writable(false)

	const fetchUsers = async () => {
		const u = await window.api.apiListUser(logged_user.access_token)
		console.log(u)
		return u.datas
	}

	const defineUsers = async () => {
		users = await fetchUsers()
	}

	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
		await defineUsers()
	})

	// current project's settings
	const project_data = {
		project_name: 'selected_project',
		contributors: [
			{
				email: 'username.email@gmail.com',
				slug: 'username',
				username: 'username'
			},
			{
				email: 'username10.email@gmail.com',
				slug: 'username10',
				username: 'username10',
				is_contrib: true
			}
		]
	}

	let new_settings_data = JSON.parse(JSON.stringify(project_data))

	$: disable_button = JSON.stringify(new_settings_data) === JSON.stringify(project_data)

	function cancelChange() {
		new_settings_data = JSON.parse(JSON.stringify(project_data))
	}

	function saveChange() {
		console.log(new_settings_data)
	}

	let to_search = ''
	let search_focus = false

	$: result = search(users, to_search, 'username').reduce((acc, user) => {
		if (new_settings_data.contributors.some((contrib) => contrib.username == user.username)) {
			user.is_contrib = true
		} else {
			user.is_contrib = false
		}
		acc = [...acc, user]
		return acc
	}, [])

	const addContributor = (user) => {
		if (
			!new_settings_data.contributors.some(
				(contributor) => contributor.username == user.username
			)
		) {
			new_settings_data.contributors = [...new_settings_data.contributors, user]
		}
	}

	function removeContributor(user) {
		new_settings_data.contributors = [...new_settings_data.contributors].filter(
			(contrib) => user.slug != contrib.slug
		)
		console.log(new_settings_data.contributors)
	}

	// const [send, receive] = crossfade({
	// 	fallback(node) {
	// 		const style = getComputedStyle(node)
	// 		const transform = style.transform === 'none' ? '' : style.transform

	// 		return {
	// 			duration: 600,
	// 			easing: quintOut,
	// 			css: (t) => `
	// 				transform: scale(${t});
	// 				opacity: ${t}
	// 			`
	// 		}
	// 	}
	// })
</script>

<div class="project-container flex flex-col gap-4 p-4 rounded-lg">
	<!-- <div class="flex gap-2 flex-col justify-start">
		<label class="w-max" for="project-name">Nom du projet:</label>
		<input
			bind:value={new_settings_data.project_name}
			type="text"
			class="flex-grow bg-transparent outline-none border focus:border-2 border-solid border-background3 h-8 focus:border-blue-btn p-2 rounded"
			name="project-name"
			id="project-name"
		/>
	</div> -->
	<!-- <ManageContributor new_settings_data={new_settings_data} /> -->
	<span>Contributeurs:</span>
	<div class="relative">
		<div
			class="flex border-solid h-8
					{search_focus ? 'border-2 border-blue-btn' : 'border border-background3'}
					items-center rounded"
		>
			<label for="search">
				<i class="ri-search-line pl-2"></i>
			</label>
			<input
				bind:value={to_search}
				type="text"
				name=""
				id="search"
				class="flex-grow bg-transparent outline-none w-full h-8 p-2 dropdown-btn"
				on:focus={() => {
					openDropdown(search_contrib_dropdown)
					search_focus = true
				}}
				on:blur={() => {
					search_focus = false
				}}
			/>
		</div>
		{#if to_search && result.length > 0 && $search_contrib_dropdown}
			<div
				class="p-2 bg-background2 border border-solid border-background3 rounded absolute w-full dropdown-btn"
			>
				<div class="pb-1">
					{#each result.filter((user) => user.is_contrib) as user (user.slug)}
						<div
							out:fade={{ duration: 0 }}
							class="flex items-center justify-between hover:bg-background4 rounded"
						>
							<span class="flex-grow p-2 px-3">{user.username}</span>
							<button
								class="self-stretch hover:bg-background3 p-1 rounded rounded-es-none rounded-ss-none text-red opacity-70 hover:opacity-100 flex items-center"
								on:click={() => {
									removeContributor(user)
								}}
							>
								<span class="mx-2">Supprimer</span>
								<i class="ri-close-line text-red"></i>
							</button>
						</div>
					{/each}
				</div>
				<div class="pt-1 border-t border-solid border-background3">
					{#each result.filter((user) => !user.is_contrib) as user (user.slug)}
						<div
							out:fade={{ duration: 0 }}
							class="flex items-center justify-between hover:bg-background4 rounded"
						>
							<span class="flex-grow p-2 px-3">{user.username}</span>
							<button
								class="self-stretch hover:bg-background3 p-1 rounded rounded-es-none rounded-ss-none text-green opacity-70 hover:opacity-100 flex items-center"
								on:click={() => {
									addContributor(user)
								}}
							>
								<span class="mx-2">Ajouter</span>
								<i class="ri-add-line text-green"></i>
							</button>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="contributors-container flex flex-wrap content-start gap-2 flex-grow overflow-auto">
		{#each new_settings_data.contributors as contributor}
			<div
				class="gap-2 items-center inline-flex self-start p-2 pl-3 rounded hover:bg-background4 border border-solid border-background3"
			>
				<span class="text-font-color2">{contributor.username}</span>
				<button
					class="flex items-center justify-center"
					on:click={() => {
						removeContributor(contributor)
					}}
				>
					<i class="ri-close-line text-font-color3 hover:text-red"></i>
				</button>
			</div>
		{/each}
	</div>

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
		height: 100%;
		background-color: var(--background2);
	}
	.contributors-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
