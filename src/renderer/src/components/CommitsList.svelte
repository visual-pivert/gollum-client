<script>
	import { fade } from 'svelte/transition'

	const commits_list = [
		{ id: 'd7e185d68d5q9', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		}
	]

	let active_commit_popup = null
</script>

<div class="container">
	<span class="block mb-1">Commits:</span>
	<!-- <div class="commits-wrapper"> -->
	<div class="commits-container flex flex-col">
		{#each commits_list as commit}
			<div
				transition:fade={{ duration: 5 }}
				id="commit-{commit.id}"
				class="commit flex items-center cursor-default relative"
				role="list"
				on:mouseenter={() => {
					active_commit_popup = commit.id
				}}
				on:mouseleave={() => {
					active_commit_popup = null
				}}
			>
				<i class="ri-git-commit-line rotate-90 text-base mr-1"></i>
				<span class="mr-3">{commit.id.slice(0, 7)}</span>
				<span class="text-font-color2 commit-message">{commit.message}</span>
				{#if active_commit_popup == commit.id}
					<div
						in:fade={{ duration: 200, delay: 300 }}
						out:fade={{ duration: 0 }}
						id={commit.id}
						class="
							z-50
							text-font-color2
							full-info w-60 absolute
							-left-48 top-0
							bg-background2
							p-2 rounded-md border
							border-background3 border-solid
							shadow-lg"
					>
						<div class="flex justify-between mb-2">
							<span class="flex items-center">
								<i
									class="mr-1 ri-user-line w-4 h-4 text-center rounded-full border border-solid border-font-color2 text-xs"
								></i>
								<span>{commit.author}</span>
							</span>
							<span>{commit.id.slice(0, 7)}</span>
						</div>
						<p class="flex items-center mb-2">
							<i class="ri-history-line mr-1"></i>
							<span class="text-xs">{commit.date.toDateString()}</span>
						</p>
						<p>{commit.message}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<!-- </div> -->
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--background2);
		overflow-x: visible;
	}
	/* .commits-wrapper {
		flex-grow: 1;
		overflow-y: auto;
		overflow-x: visible;
	} */
	/* .commits-wrapper::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	} */
	.commits-container {
		flex-grow: 1;
		min-height: 100%;
		/* background-color: violet;
		overflow-y: auto; */
	}

	.commit-message {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
