<script>
	import { updateCurrentDirectoryPath } from '../../event'
	import { current_directory, current_directory_path, selected_branch, selected_project } from '../../store'
	import { defineBranch } from '../branch_dropdown/store'
	import { defineDir } from './store'
</script>

<div class="project-wrapper">
	{#if $current_directory}
		<div class="porject-container container mb-3 p-4">
			<div class="breadcrumbs frame">
				{#each $current_directory_path as step,index}
					<a href="." on:click|preventDefault={async () => {
						current_directory_path.update(() => {
							if (index === 0) {
								return [$selected_project.repo_path]
							}
							return $current_directory_path.slice(0, index+1)
						})
						await defineDir()
					}}>{step}<i class="ri-arrow-right-s-line"></i></a>
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
						{#each $current_directory as item}
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
											on:click|preventDefault={async() => {
												updateCurrentDirectoryPath(item.name)
												await defineDir()
											}}>{item.name}</a
										>
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
