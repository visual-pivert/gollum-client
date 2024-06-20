<script>
	import { onMount } from 'svelte'
	import Buttons from './Buttons.svelte'
	import { rx_selected_project } from './project_dropdown/model'
	import { rx_selected_branch } from './branch_dropdown/model'

	let branch_list = []

	let selected_project //rx
	let selected_branch //rx

	let logged_user

	const fetchLocalBranch = async () => {
		branch_list = await window.api.localBranchList(selected_project.repo_path)
	}
	let to_search = ''
	let search_focus = false

	$: result = branch_list.reduce((acc, branch) => {
		if (
			branch.branch_name.toLowerCase().startsWith(to_search.toLowerCase()) &&
			selected_branch.branch_name != branch.branch_name
		) {
			// const tmp = { branch: branch, checked: false }
			acc = [...acc, branch]
		}
		return acc
	}, [])

	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
		rx_selected_project.subscribe((value) => {
			selected_project = value
		})
		rx_selected_branch.subscribe(async (value) => {
			selected_branch = value
			await fetchLocalBranch()
		})
		await fetchLocalBranch()
	})

	let checked_branch = null

	const merge = async () => {
		await window.api.gitMerge(
			selected_project.repo_path,
			{ username: logged_user.username, password: logged_user.password },
			checked_branch.branch_name
		)
		rx_selected_project.next(selected_project)
	}
</script>

<div class="flex flex-col gap-2 p-3 h-full">
	<span>Merge avec:</span>
	<div
		class="h-7
			{search_focus ? 'border-2 border-blue-btn' : 'border border-background3'}
			border-solid rounded px-2"
	>
		<label for="search-branch" class="flex gap-1 items-center">
			<i class="ri-search-line"></i>
			<input
				id="search-branch"
				type="text"
				bind:value={to_search}
				class="bg-transparent p-1 outline-none flex-grow"
				on:focus={() => {
					search_focus = true
				}}
				on:blur={() => {
					search_focus = false
				}}
			/>
		</label>
	</div>
	<div class="branch-container flex-grow overflow-auto">
		<ul class="ml-2">
			{#each result as branch}
				<li>
					<label for={branch.branch_name}>
						<button
							class="w-full cursor-pointer flex gap-1 items-center p-1 px-2 rounded hover:bg-background4 opacity-80
							{branch == checked_branch ? 'bg-background4 opacity-100' : ''}"
							on:click={() => {
								checked_branch = branch
							}}
						>
							<i
								class="ri-git-branch-line mr-3
								{branch == checked_branch ? 'text-blue' : 'text-font-color'}"
							></i>
							{selected_branch.branch_name}
							<!-- <i class="ri-arrow-left-line {branch == checked_branch ? 'text-blue' : 'text-font-color'}"></i> -->
							<i
								class="ri-arrow-left-double-line
							{branch == checked_branch ? 'text-green' : 'text-font-color'}"
							></i>
							{branch.branch_name}
						</button>
					</label>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<Buttons
			label="Merge"
			bg_color="--blue-btn"
			on:click={async () => await merge()}
			disabled={!checked_branch}
		/>
	</div>
</div>

<style>
	.branch-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
