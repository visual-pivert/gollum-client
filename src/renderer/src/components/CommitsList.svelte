<script>
	import { afterUpdate, tick } from 'svelte'
	import { fade } from 'svelte/transition'

	const commits_list = [
		{ id: 'd7e185d68d5q9', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit c commit commit commit commit commitcommit commit commit commit commicommit commit commit commit c commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7e135d68d5q9',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		},
		{
			id: 'd7',
			author: 'Berty',
			message:
				'commit commit commit commit commitcommit commit commit commit commicommit commit commit commit c commit commit commit commit commitcommit commit commit commit commicommit commit commit commit c commit commit commit commit commitcommit commit commit commit commicommit commit commit commit commit commit commit commit commit committ',
			date: new Date()
		},
		{ id: 'd7e185d68d5', author: 'Dox', message: 'commit commit', date: new Date() },
		{
			id: '35d68d5q9',
			author: 'Berty',
			message: 'commit commit commit commit commit',
			date: new Date()
		}
	]

	let active_commit = null
	let active_commit_element
	let active_commit_position_y

	async function onMouseenter(e, commit) {
		active_commit = commit
		active_commit_position_y = e.target.getBoundingClientRect().bottom
		await tick()
		if (active_commit_element.getBoundingClientRect().bottom > window.innerHeight) {
			active_commit_position_y =
				e.target.getBoundingClientRect().top -
				active_commit_element.getBoundingClientRect().height
		}
	}

	function onMouseout() {
		active_commit = null
	}
</script>

<div class="container relative">
	<span class="block mb-1">Commits:</span>
	<div class="commits-container flex flex-col overflow-y-auto">
		{#each commits_list as commit}
			<div
				transition:fade={{ duration: 5 }}
				id="commit-{commit.id}"
				class="commit flex items-center cursor-pointer hover:bg-background4 rounded opacity-80 hover:opacity-100"
				role="listitem"
				on:mouseenter={(e) => {
					onMouseenter(e, commit)
				}}
				on:mouseleave={() => {
					onMouseout()
				}}
			>
				<i class="ri-git-commit-line rotate-90 text-base mr-1"></i>
				<span class="mr-3">{commit.id.slice(0, 7)}</span>
				<span class="text-font-color2 commit-message">{commit.message}</span>
			</div>
		{/each}
	</div>
	{#if active_commit}
		<div
			in:fade={{ duration: 200, delay: 300 }}
			out:fade={{ duration: 0 }}
			id={active_commit.id}
			bind:this={active_commit_element}
			style="top: calc({active_commit_position_y}px - var(--bar-thinkness))"
			class="
					z-50
					text-font-color2
					full-info w-60 absolute
					-left-48 top-6
					bg-background2
					p-2 rounded-md border
					border-background3 border-solid
					shadow"
		>
			<div class="flex justify-between mb-2">
				<span class="flex items-center">
					<i
						class="mr-1 ri-user-line w-4 h-4 text-center rounded-full border border-solid border-font-color2 text-xs"
					></i>
					<span>{active_commit.author}</span>
				</span>
				<span>{active_commit.id.slice(0, 7)}</span>
			</div>
			<p class="flex items-center mb-2">
				<i class="ri-history-line mr-1"></i>
				<span class="text-xs">{active_commit.date.toDateString()}</span>
			</p>
			<p>{active_commit.message}</p>
		</div>
	{/if}
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
	.commits-container {
		flex-grow: 1;
		min-height: 100%;
	}
	.commits-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
	.commit-message {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
