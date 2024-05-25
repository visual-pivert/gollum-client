<script>
	import { updateCurrentDirectoryPath } from '../event'
	import { current_directory, current_directory_path } from '../store'

	// const current_directory = [
	// 	{ name: 'src', commit_message: 'initial commit', date: '4 months ago', type: 'folder' },
	// 	{ name: 'build', commit_message: 'initial commit', date: '4 months ago', type: 'folder' },
	// 	{ name: 'README.md', commit_message: 'initial commit', date: '4 months ago', type: 'file' }
	// ]
	// $: current_directory = $current_directory
	// $: current_path = $current_directory_path
</script>

<div class="project-wrapper">
	{#if $current_directory}
		<div class="porject-container container mb-3 p-4">
			<div class="breadcrumbs frame">
				{#each $current_directory_path as step}
					<a href="." on:click={() => {}}>{step}<i class="ri-arrow-right-s-line"></i></a>
				{/each}
			</div>
			<div class="content">
				<table class="w-full">
					<thead>
						<tr class="bg-background4">
							<th class="py-3 px-4 text-left w-1/3">Nom</th>
							<th class="py-3 px-4 text-left">Message du dernier commit</th>
							<th class="py-3 px-4 text-right">Date du dernier commit</th>
						</tr>
					</thead>
					<tbody>
						<tr class="hidden">
							<td colspan="3" class="py-3 px-4 text-left w-1/3">sssssss</td>
						</tr>
						{#each Object.entries($current_directory) as item}
							<tr class="hover:bg-background4">
								<td class="py-3 px-4 text-left w-1/3">
									<div class="name-cell">
										{#if item[1].type == 'folder'}
											<i class="ri-folder-fill"></i>
										{:else}
											<i class="ri-file-3-line"></i>
										{/if}
										<a
											href="."
											class="text-font-color hover:text-blue hover:underline"
											on:click|preventDefault={() => {
												updateCurrentDirectoryPath(item[1].name)
												console.log($current_directory_path)
											}}>{item[1].name}</a
										>
									</div>
								</td>
								<td class="py-3 px-4 text-left">
									<div class="text-font-color2">
										{'...'}
									</div>
								</td>
								<td class="py-3 px-4 text-right">
									<div class="text-font-color2">
										{'...'}
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
	.name-cell > i {
		font-size: 1.2em;
	}
	/* .name-cell > a {
		color: var(--font-color);
	} */
</style>
