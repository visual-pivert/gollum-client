<script>
	import { onMount, tick } from 'svelte'
	import { fade } from 'svelte/transition'
	import { rx_is_local_project, rx_selected_project } from './project_dropdown/model'
	import { rx_selected_branch } from './branch_dropdown/model'
	import moment from 'moment'
	import _ from 'lodash'

	let commit_list = []
	let is_local_project //rx
	let selected_branch //rx
	let selected_project //rx
	let logged_user

	const fetchLocalCommit = async (repo_name) => {
		const commit_list = await window.api.gitLog(repo_name, {
			username: logged_user.username,
			password: logged_user.passwrod
		})
		if (commit_list) {
			return commit_list
		} else {
			return []
		}
	}

	const fetchNotClonedCommit = async (repo_name) => {
		const commit_list = await window.api.apiListCommit(
			logged_user.access_token,
			repo_name,
			selected_branch.branch_name
		)
		if (commit_list) {
			return commit_list
		} else {
			return []
		}
	}

	const fetchCommit = async () => {
		if (is_local_project) {
			commit_list = await fetchLocalCommit(selected_project.repo_path)
			commit_list = commit_list.all
		} else {
			commit_list = await fetchNotClonedCommit(selected_project.repo_path)
			commit_list = commit_list.datas
		}
		console.log(commit_list)
	}

	onMount(async () => {
		logged_user = await window.api.getLoggedUser()

		rx_selected_project.subscribe((value) => (selected_project = value))
		rx_is_local_project.subscribe((value) => (is_local_project = value))

		rx_selected_branch.subscribe(async (value) => {
			selected_branch = value
			await fetchCommit()
		})
		await fetchCommit()
	})

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
		{#each commit_list as commit}
			<div
				transition:fade={{ duration: 5 }}
				id="commit-{commit.hash}"
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
				<span class="mr-3">{commit.hash.slice(0, 7)}</span>
				<span class="text-font-color2 commit-message">{commit.message}</span>
			</div>
		{/each}
	</div>
	{#if active_commit}
		<div
			in:fade={{ duration: 200, delay: 300 }}
			out:fade={{ duration: 0 }}
			id={active_commit.hash}
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
					<span>{active_commit.author_name}</span>
				</span>
				<span>{active_commit.hash.slice(0, 7)}</span>
			</div>
			<p class="flex items-center mb-2">
				<i class="ri-history-line mr-1"></i>
				<span class="text-xs">{_.capitalize(moment(active_commit.date).fromNow())}</span>
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
