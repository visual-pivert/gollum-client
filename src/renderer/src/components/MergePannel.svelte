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

	let checked_branch = null

	function merge(current_branch, to_merge) {
		console.log('merge: ', current_branch, to_merge)
	}
</script>

<div class="flex flex-col gap-2 p-3 h-full">
	<span>Merge avec:</span>
	<div class="branch-container flex-grow overflow-auto">
		<ul class="ml-2">
			{#each branch_list as branch}
				<li class="flex gap-2 items-center p-1">
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
					{#if branch == checked_branch}
						<i class="ri-checkbox-circle-fill text-blue"></i>
					{:else}
						<i class="ri-checkbox-blank-circle-line text-font-color2"></i>
					{/if}
					<label for={branch.branch_name}>{branch.branch_name}</label>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<Buttons
			label="Merge"
			bg_color="--blue-btn"
			on:click={() => merge($selected_branch, checked_branch)}
			disabled={!checked_branch}
		/>
	</div>
</div>

<style>
	.branch-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
