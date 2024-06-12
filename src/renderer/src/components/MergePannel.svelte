<script>
	import { afterUpdate } from 'svelte'
	import Buttons from './Buttons.svelte'
	import { selected_branch } from '../store'

	let branch_list = [
		{ branch_name: 'master' },
		{ branch_name: 'release1.0' },
		{ branch_name: 'release1.1' },
		{ branch_name: 'release1.3' },
		{ branch_name: 'test' },
		{ branch_name: 'reeeb' },
		{ branch_name: 'module' }
	]

	let to_search = ''
	let search_focus = false

	$: result = branch_list.reduce((acc, branch) => {
		if (branch.branch_name.toLowerCase().startsWith(to_search.toLowerCase())) {
			acc = [...acc, branch]
		}
		return acc
	}, [])

	let checked_branch = null

	function merge(current_branch, to_merge) {
		console.log('merge: ', current_branch, to_merge)
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
					<input
						type="radio"
						name="merge"
						id={branch.branch_name}
						value={branch}
						on:input={() => {
							checked_branch = branch
						}}
						class="hidden"
					/>
					<label
						for={branch.branch_name}
						class="cursor-pointer flex gap-2 items-center p-1 px-2 rounded hover:bg-background4 opacity-80
							{branch == checked_branch ? 'bg-background4 opacity-100' : ''}"
					>
						<i
							class="ri-git-branch-line
								{branch == checked_branch ? 'text-blue' : 'text-font-color'}"
						></i>
						{branch.branch_name}
					</label>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<Buttons
			label="Merge"
			bg_color="--blue-btn"
			on:click={() => merge($selected_branch, checked_branch.branch_name)}
			disabled={!checked_branch}
		/>
	</div>
</div>

<style>
	.branch-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
