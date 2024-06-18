<script>
	import Dropdown from '../Dropdown.svelte'
	import { openDropdown } from '../../event'
	import { active_branch_dropdown } from './store'
	import { onDestroy, onMount } from 'svelte'
	import { rx_is_local_project, rx_selected_project } from '../project_dropdown/model'
	import { rx_selected_branch } from './model'
	import Buttons from '../Buttons.svelte'

	let branch_list
	let selected_project //rx
	let selected_branch //rx
	let is_local_project //rx
	let logged_user
	let new_branch_name = ''

	// pure function
	const fetchBranch = async (repo_name) => {
		let bl = []
		if (is_local_project) {
			bl = await window.api.localBranchList(repo_name)
			console.log(bl)
		} else {
			bl = await window.api.apiListBranches(logged_user.access_token, repo_name)
			bl = bl.datas
		}

		if (selected_project) return bl
		else return []
	}


	// Not pure function
	const defineBranch = (branch) => {
		rx_selected_branch.next(branch)
	}

	const onDropdownOpen = async () => {
		branch_list = await fetchBranch(selected_project.repo_path)
	}

	const createNewBranch = async () => {
		await window.api.gitNewBranch(
			selected_project.repo_path,
			{ username: logged_user.username, password: logged_user.password },
			new_branch_name
		)
	}

	// lifecycles
	let subscribers = []
	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
		const is_local_project_sub = rx_is_local_project.subscribe((value) => {
			is_local_project = value
		})
		const project_sub = rx_selected_project.subscribe(async (value) => {
			selected_project = value
			const fetched_branch = await fetchBranch(selected_project.repo_path)
			console.log(fetched_branch)
			defineBranch(fetched_branch[0])
		})

		const branch_sub = rx_selected_branch.subscribe((value) => {
			selected_branch = value
		})

		subscribers = [project_sub, branch_sub, is_local_project_sub]
	})

	onDestroy(() => {
		for (const sub of subscribers) {
			sub.unsubscribe()
		}
	})

	let modal_opened = false
	function openModal() {
		modal_opened = true
	}
	function closeModal() {
		modal_opened = false
		new_branch_name = ''
	}
</script>

<Dropdown
	label={selected_branch ? selected_branch.branch_name : null}
	icon="ri-git-branch-line"
	show_content={$active_branch_dropdown}
	on:click={async () => {
		openDropdown(active_branch_dropdown, await onDropdownOpen())
	}}
>
	<div slot="content" class="w-44">
		<ul class="pb-1 mb-1 border-b border-solid border-background3">
			{#each branch_list as branch}
				<li class="rounded hover:bg-background4">
					<a
						href="."
						title="checkout {branch.branch_name}"
						class="px-3 py-2 block w-full overflow-hidden overflow-ellipsis"
						on:click|preventDefault={() => defineBranch(branch)}
					>
						{branch.branch_name}
					</a>
				</li>
			{/each}
		</ul>
		<button
			class="w-full p-2 flex justify-center gap-1 items-center hover:bg-background4 rounded text-font-color2 hover:text-blue"
			on:click={openModal}
		>
			<span>Nouvelle branche</span>
			<i class="ri-add-line"></i>
		</button>
	</div>
</Dropdown>

{#if modal_opened}
	<div
		class="w-full h-full bg-background bg-opacity-50 backdrop-blur-sm fixed top-0 left-0 z-50 flex items-center justify-center"
	>
		<div
			class="flex flex-col bg-background2 p-5 rounded-lg border border-solid border-background3 shadow-lg"
		>
			<div class="flex flex-col gap-1">
				<label for="branch-name">Nouvelle branche :</label>
				<input
					type="text"
					id="branch-name"
					class="bg-transparent outline-none border focus:border-2 border-solid border-background3 focus:border-blue-btn rounded p-2 h-8 w-80"
					bind:value={new_branch_name}
				/>
			</div>

			<div class="flex gap-2 w-max self-end mt-3">
				<Buttons label="Annuler" on:click={closeModal} />
				<Buttons label="Créer" bg_color="--blue-btn" on:click={ async () => {
					await createNewBranch()
					closeModal()
				}} />
			</div>
		</div>
	</div>
{/if}

<style>
</style>
