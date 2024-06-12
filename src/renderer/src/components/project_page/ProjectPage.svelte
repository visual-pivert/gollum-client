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

	// pure functions
	const fetchLocalFileManager = async (project, branch, subdir = '') => {
		const mock_file_manager = [
			[
				{ name: subdir + 'local_file1', type: 'blob' },
				{ name: subdir + 'local_file2', type: 'blob' },
				{ name: subdir + 'local_file3', type: 'blob' },
				{ name: subdir + 'local_dir4', type: 'tree' },
				{ name: subdir + 'local_dir5', type: 'tree' },
				{ name: subdir + 'local_dir6', type: 'tree' }
			],
			[
				{ name: subdir + 'local_f1', type: 'blob' },
				{ name: subdir + 'local_f2', type: 'blob' },
				{ name: subdir + 'local_f3', type: 'blob' },
				{ name: subdir + 'local_d4', type: 'tree' },
				{ name: subdir + 'local_d5', type: 'tree' },
				{ name: subdir + 'local_d6', type: 'tree' }
			]
		]
		function getRandomInt(max) {
			return Math.floor(Math.random() * max)
		}
		if (project && branch) {
			return mock_file_manager[getRandomInt(mock_file_manager.length)]
		} else {
			return []
		}
	}

	const fetchNotClonedFileManager = async (project, branch, subdir = '') => {
		const mock_file_manager = [
			[
				{ name: subdir + 'not_file1', type: 'blob' },
				{ name: subdir + 'not_file2', type: 'blob' },
				{ name: subdir + 'not_file3', type: 'blob' },
				{ name: subdir + 'not_dir4', type: 'tree' },
				{ name: subdir + 'not_dir5', type: 'tree' },
				{ name: subdir + 'not_dir6', type: 'tree' }
			],
			[
				{ name: subdir + 'not_f1', type: 'blob' },
				{ name: subdir + 'not_f2', type: 'blob' },
				{ name: subdir + 'not_f3', type: 'blob' },
				{ name: subdir + 'not_d4', type: 'tree' },
				{ name: subdir + 'not_d5', type: 'tree' },
				{ name: subdir + 'not_d6', type: 'tree' }
			]
		]
		function getRandomInt(max) {
			return Math.floor(Math.random() * max)
		}
		if (project && branch) {
			return mock_file_manager[getRandomInt(mock_file_manager.length)]
		} else {
			return []
		}
	}

	// NOT pure function
	const defineCurrentFileManager = async () => {
		const cd = current_path_array ? current_path_array.join('/') : ''
		if (is_local_project) {
			current_file_manager = await fetchLocalFileManager(
				selected_project,
				selected_branch,
				cd
			)
		} else {
			current_file_manager = await fetchNotClonedFileManager(
				selected_project,
				selected_branch,
				cd
			)
		}
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
	onMount(() => {
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
			<div class="breadcrumbs frame">
				{#each current_path_array as step, index}
					<a
						href="."
						on:click|preventDefault={() => {
							defineCurrentPathArray(current_path_array.slice(0, index + 1))
							defineCurrentFileManager()
						}}>{step}<i class="ri-arrow-right-s-line"></i></a
					>
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
									<div class="name-cell w-full overflow-hidden overflow-ellipsis">
										{#if item.type == 'tree'}
											<i
												class="ri-folder-fill text-folder-color text-lg leading-none"
											></i>
										{:else}
											<i class="ri-file-3-line text-lg leading-none"></i>
										{/if}
										<a
											href="."
											class="text-font-color hover:text-blue hover:underline text-nowrap"
											on:click|preventDefault={() => {
												defineCurrentPathArray([
													...current_path_array,
													item.name
												])
												defineCurrentFileManager()
											}}
										>
											{item.name}
										</a>
									</div>
								</td>
								<td class="py-3 px-4 text-left w-4/12 overflow-hidden">
									<div
										class="text-font-color w-full overflow-hidden overflow-ellipsis"
									>
										<span class="text-nowrap"
											>{'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn'}</span
										>
									</div>
								</td>
								<td class="py-3 px-4 text-right w-3/12">
									<div
										class="text-font-color2 w-full overflow-hidden overflow-ellipsis"
									>
										<span class="text-nowrap">{'10 months ago'}</span>
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
		height: 300px;
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
</style>
