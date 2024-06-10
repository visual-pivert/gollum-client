<script>
	import { afterUpdate } from 'svelte'
	import { openDropdown } from '../../event'
	import { close_function_overlays, new_project_data } from '../../store'
	import { search_result_contributor } from './store'

	const users = [
		{ username: 'Baba' },
		{ username: 'Beloh' },
		{ username: 'Gurry' },
		{ username: 'Koto' },
		{ username: 'Niim' },
		{ username: 'Selu' },
		{ username: 'Zaama' }
	]

	let to_search = ''
	let search_focus = false

	$: result = users.reduce((acc, user) => {
		if (user.username.toLowerCase().startsWith(to_search.toLowerCase())) {
			acc = [...acc, user]
		}
		return acc
	}, [])

	afterUpdate(() => {
		console.log($close_function_overlays)
	})

	function addContributor(user) {
		if (!$new_project_data.contributors.includes(user)) {
			$new_project_data.contributors = [...$new_project_data.contributors, user]
		}
		// console.log($new_project_data.contributors)
	}

	function removeContributor(user) {
		delete $new_project_data.contributors[$new_project_data.contributors.indexOf(user)]
		$new_project_data.contributors = [...$new_project_data.contributors].filter((user) => {
			return user != undefined
		})
		// console.log($new_project_data.contributors)
	}
</script>

<div class="flex flex-col gap-2">
	<span>Contributeur:</span>
	{#if $new_project_data.contributors.length > 0}
		<div>
			<ul class="flex gap-2 flex-wrap">
				{#each $new_project_data.contributors as contributor}
					<ul>
						<div
							class="flex gap-1 items-center p-2 border border-solid border-background3 rounded hover:bg-background4"
						>
							<img
								src=""
								alt=""
								class="w-5 h-5 border border-solid border-background4 outline-none rounded-full"
							/>
							<span class="mr-2">{contributor.username}</span>
							<i
								class="ri-close-large-line opacity-50 hover:opacity-1 hover:text-red cursor-pointer"
								on:click={() => {
									removeContributor(contributor)
								}}
								role="button"
								on:keypress={() => {}}
								tabindex="0"
							></i>
						</div>
					</ul>
				{/each}
			</ul>
		</div>
	{/if}
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
					openDropdown(search_result_contributor)
					console.log($search_result_contributor)

					search_focus = true
				}}
				on:blur={() => {
					search_focus = false
				}}
			/>
		</div>
		{#if to_search && result.length > 0 && $search_result_contributor}
			<div
				class="p-2 bg-background2 border border-solid border-background3 rounded absolute w-full"
			>
				<ul>
					{#each result as user}
						<li class="hover:bg-background4 rounded">
							<a
								href="."
								class="p-2 block"
								on:click|preventDefault={() => {
									search_focus = true
									addContributor(user)
									to_search = ''
									result = []
									search_focus = false
								}}>{user.username}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
