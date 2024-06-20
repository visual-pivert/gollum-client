<script>
	import { onDestroy, onMount } from 'svelte'
	import { rx_is_local_project, rx_selected_project } from '../project_dropdown/model'
	import { rx_selected_branch } from '../branch_dropdown/model'

	// vars
	let is_local_project //rx
	let selected_branch //rx
	let selected_project //rx
	let current_file_manager
	let current_path_array = []
	let logged_user

	// pure functions
	const fetchLocalFileManager = async (project, branch, subdir = '') => {
		await window.api.localCheckout(project, branch)
		const local_file_manager = await window.api.localRepoTree(subdir)
		if (local_file_manager) {
			return local_file_manager
		} else {
			return []
		}
	}

	const fetchNotClonedFileManager = async (project, branch, subdir = '') => {
		const not_cloned_file_manager = await window.api.apiRepoTree(
			logged_user.access_token,
			project,
			branch,
			subdir
		)
		if (not_cloned_file_manager) {
			console.log(not_cloned_file_manager.datas)
			return not_cloned_file_manager.datas
		} else {
			return []
		}
	}

	const sortFiles = (files) => {
		return files.sort((a, b) => {
			if (a.type === b.type) {
				return a.name.localeCompare(b.name)
			}
			return a.type === 'tree' ? -1 : 1
		})
	}

	// NOT pure function
	const defineCurrentFileManager = async () => {
		let cd = current_path_array ? current_path_array.join('/') : ''
		if (is_local_project) {
			current_file_manager = await fetchLocalFileManager(
				selected_project.repo_path,
				selected_branch.branch_name,
				cd
			)
		} else {
			const not_local_cd = current_path_array.slice(1).join('/')
			current_file_manager = await fetchNotClonedFileManager(
				selected_project.repo_path,
				selected_branch.branch_name,
				not_local_cd
			)
		}
		current_file_manager = sortFiles(current_file_manager)
	}

	const defineCurrentPathArray = (array_path = null) => {
		if (array_path) {
			current_path_array = array_path
		} else {
			current_path_array = [selected_project.repo_path]
		}
	}

	// Lifecycles
	let subscribers
	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
		const is_local_project_sub = rx_is_local_project.subscribe(
			(value) => (is_local_project = value)
		)

		const selected_project_sub = rx_selected_project.subscribe(
			(value) => (selected_project = value)
		)

		const selected_branch_sub = rx_selected_branch.subscribe((value) => {
			selected_branch = value
			defineCurrentPathArray()
			defineCurrentFileManager()
		})
		subscribers = [is_local_project_sub, selected_project_sub, selected_branch_sub]
	})

	onDestroy(() => {
		for (const sub of subscribers) {
			sub.unsubscribe()
		}
	})
</script>

<div class="project-wrapper">
	{#if current_file_manager}
		<div class="porject-container container mb-3 p-4">
			<div class="breadcrumbs frame overflow-auto">
				{#each current_path_array as step, index}
					<a
						href="."
						on:click|preventDefault={() => {
							defineCurrentPathArray(current_path_array.slice(0, index + 1))
							defineCurrentFileManager()
						}}
					>
						<span class="hover:text-blue hover:underline">{step}</span>
						<i class="ri-arrow-right-s-line"></i>
					</a>
				{/each}
			</div>
			<div class="content">
				<table class="w-full table-fixed">
					<thead>
						<tr class="bg-background4">
							<th class="py-3 px-4 text-left w-5/12">Nom</th>
							<th class="py-3 px-4 text-left w-4/12">Commit</th>
							<th class="py-3 px-4 text-right w-3/12">Date</th>
						</tr>
					</thead>
					<tbody>
						<tr class="hidden">
							<td colspan="3" class="py-3 px-4 text-left">sssssss</td>
						</tr>
						{#each current_file_manager as item}
							<tr class="hover:bg-background4">
								<td class="py-3 px-4 text-left w-5/12">
									<div class="name-cell w-full">
										<a
											title={item.name}
											href="."
											class="flex items-center gap-2 text-font-color hover:text-blue w-max max-w-full"
											on:click|preventDefault={() => {
												defineCurrentPathArray([
													...current_path_array,
													item.name
												])
												defineCurrentFileManager()
											}}
										>
											{#if item.type == 'tree'}
												<i
													class="ri-folder-fill text-folder-color text-lg leading-none"
												></i>
											{:else}
												<i
													class="ri-file-3-line text-font-color2 text-lg leading-none"
												></i>
											{/if}
											<span
												class="text-nowrap w-max overflow-hidden overflow-ellipsis"
											>
												{item.name}
											</span>
										</a>
									</div>
								</td>
								<td class="px-4 text-left w-4/12 overflow-hidden">
									<div
										class="text-font-color w-full overflow-hidden overflow-ellipsis"
									>
										<span class="text-nowrap"
											>{item.log ? item.log: 'no log here'}</span
										>
									</div>
								</td>
								<td class="py-3 px-4 text-right w-3/12">
									<div
										class="text-font-color2 w-full overflow-hidden overflow-ellipsis"
									>
										<span class="text-nowrap">{item.date ? item.date: 'no date here'}</span>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="readme-container container mb-3 p-4">
			<div class="frame">
				<i class="ri-book-open-line"></i>
				<span>README</span>
			</div>
			<div class="content frame"></div>
		</div>
	{:else}
		<div class="container mb-3 p-4">
			<h1>Welcome to Gollum</h1>
		</div>
	{/if}
</div>

<style>
	.project-wrapper {
		width: 100%;
		/* height: 300px; */
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 15px;
		/* margin-bottom: 12px;
		padding: 16px; */
		background-color: var(--background2);
		border-radius: 10px;
	}

	.frame {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 8px 10px;
		border: 1px solid var(--background3);
		border-radius: var(--border-radius);
	}

	.content {
		border: 1px solid var(--background3);
		border-radius: var(--border-radius);
	}
	tbody tr {
		border-top: 1px solid var(--background3);
	}
	.name-cell {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.breadcrumbs::-webkit-scrollbar {
		height: var(--scrollbar-thinkness);
	}
	.breadcrumbs::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
