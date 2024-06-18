<script>
	import { onMount } from 'svelte'
	import Buttons from './Buttons.svelte'
	import { rx_selected_project } from './project_dropdown/model'
	import { rx_selected_branch } from './branch_dropdown/model'

	//vars
	let changed_files = []
	let logged_user
	let selected_project
	let selected_files = []
	let commit_message = ''

	// pure function
	const fetchChangedFiles = async (repo_name) => {
		const status = await window.api.gitStatus(repo_name, {
			username: logged_user.username,
			password: logged_user.password
		})

		if (status) {
			return status
		} else {
			return {}
		}
	}

	// NOT pure function
	const defineChangedFiles = async () => {
		changed_files = []
		const status = await fetchChangedFiles(selected_project.repo_path)
		const cf = [
			...status.not_added,
			...status.created,
			...status.deleted,
			...status.modified,
			...status.renamed
		]
		const set_cf = new Set(cf)
		for (const file_path of set_cf) {
			changed_files = [
				...changed_files,
				{ name: file_path.split('/').at(-1), file_path: file_path, is_checked: false }
			]
		}
	}

	const commitSelectedFiles = async (amend = false) => {
		const commited = await window.api.gitCommit(
			selected_project.repo_path,
			{ username: logged_user.username, password: logged_user.password },
			commit_message,
			selected_files.map((value) => value.file_path),
			amend
		)
		console.log(commited)
		await defineChangedFiles()
	}

	// lifecycles
	onMount(async () => {
		logged_user = await window.api.getLoggedUser()
		rx_selected_project.subscribe((value) => (selected_project = value))
		rx_selected_branch.subscribe(async (value) => await defineChangedFiles())
	})

	$: nothing_checked = !changed_files.reduce((acc, file) => (acc ||= file.is_checked), false)
	$: checked_all = changed_files.reduce(
		(acc, file) => (acc &&= file.is_checked),
		true && changed_files.length > 0
	)

	function checkAllChange() {
		checked_all = !checked_all
		changed_files = changed_files.map((file) => {
			file.is_checked = checked_all
			return file
		})
	}

	function includeSelectedFile() {
		selected_files = changed_files.filter((file) => file.is_checked)
	}

	function commitMessageOnfucus() {}
</script>

<div class="container">
	<div class="flex gap-1 mb-1">
		<input
			type="checkbox"
			bind:checked={checked_all}
			id="select-all"
			class="hidden"
			on:change={() => {
				checkAllChange()
			}}
		/>
		<label for="select-all" class="cursor-pointer">
			{#if checked_all}
				<i class="ri-checkbox-fill text-blue"></i>
			{:else}
				<i class="ri-checkbox-blank-line text-font-color2"></i>
			{/if}
			Modifications:
		</label>
	</div>
	<div class="changes-container mb-4">
		<div class="changed-files pl-2">
			{#each changed_files as file}
				<div class="mb-1">
					<input
						type="checkbox"
						bind:checked={file.is_checked}
						id={file.name}
						class="hidden"
					/>
					<label for={file.name} class="cursor-pointer">
						{#if file.is_checked}
							<i class="ri-checkbox-fill text-blue"></i>
						{:else}
							<i class="ri-checkbox-blank-line text-font-color2"></i>
						{/if}
						<span class="mr-1">{file.name}</span>
						<span class="text-font-color2 text-xs">{file.file_path}</span>
					</label>
				</div>
			{/each}
		</div>
	</div>
	<div class="commit-message-container flex flex-col gap-1 mb-4">
		<label for="commit-message">
			<span class="mb-1 block">Message:</span>
			<textarea
				bind:value={commit_message}
				name="commit-message"
				id="commit-message"
				class="w-full min-h-20 max-h-36 bg-transparent border focus:border-2 border-solid border-background3 rounded focus:border-blue-btn outline-none p-2"
				on:focus={() => commitMessageOnfucus()}
			></textarea>
		</label>
	</div>
	<div class="button-container">
		<Buttons
			bg_color="--blue-btn"
			disabled={nothing_checked}
			on:click={async () => {
				includeSelectedFile()
				await commitSelectedFiles(false)
			}}
			label="Commit"
		/>
		<Buttons
			disabled={nothing_checked}
			bg_color="--background3"
			label="Commit & amend"
			on:click={async () => {
				includeSelectedFile()
				await commitSelectedFiles(true)
			}}
		/>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 12px;
		display: flex;
		flex-direction: column;
		background-color: var(--background2);
	}

	.changes-container {
		flex-grow: 1;
		padding: 4px;
		border: 1px solid var(--background3);
		border-radius: var(--border-radius);
		overflow-y: auto;
	}
	.changes-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
	.button-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
