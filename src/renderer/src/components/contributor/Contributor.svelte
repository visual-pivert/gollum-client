<script>
	let to_search
	let search_focus
	let contributors = [
		{ username: 'bbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' },
		{ username: 'baaaaaaa' },
		{ username: 'beeeee' },
		{ username: 'abbbbbb' }
	]
</script>

<div class="p-3 flex flex-col gap-2 h-full">
	<span>Contributeur:</span>
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
				// openDropdown(search_result_contributor)
				search_focus = true
			}}
			on:blur={() => {
				search_focus = false
			}}
		/>
	</div>
	<div class="contributors-container flex-grow overflow-auto">
		{#each contributors as user}
			<div class="flex items-center justify-between p-2 pl-3 rounded hover:bg-background4">
				<span class="text-font-color2">{user.username}</span>
				<button>
					<i class="ri-close-line text-font-color3 hover:text-red"></i>
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.contributors-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
