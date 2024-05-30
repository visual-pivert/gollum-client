<script>
	import { afterUpdate } from 'svelte'
	import Buttons from './Buttons.svelte'

	let changed_files = [
		{ name: 'file1', file_path: 'src/main', is_checked: false },
		{ name: 'file2', file_path: 'src/main', is_checked: false }
	]

	$: nothing_checked = !changed_files.reduce((acc, file) => (acc ||= file.is_checked), false)
	$: checked_all = changed_files.reduce((acc, file) => (acc &&= file.is_checked), true)

	afterUpdate(() => {
		console.log(nothing_checked)
	})

	function checkAllChange() {
		checked_all = !checked_all
		changed_files = changed_files.map((file) => {
			file.is_checked = checked_all
			return file
		})
	}

	let selected_files = []
	function includeSelectedFile() {
		selected_files = changed_files.filter((file) => file.is_checked)
	}

	let commit_message = ''
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
			<textarea
				bind:value={commit_message}
				name="commit-message"
				id="commit-message"
				class="w-0 h-0 absolute"
				on:focus={() => commitMessageOnfucus()}
			></textarea>
			<span class="mb-1 block">Message:</span>
			<div class="commit-message-output">
				<p id="message">
					{commit_message}
				</p>
			</div>
		</label>
	</div>
	<div class="button-container">
		<Buttons
			bg_color="--blue-btn"
			disabled={nothing_checked}
			on:click={() => {
				includeSelectedFile()
				console.log(selected_files)
				console.log(commit_message)
			}}
		>
			Commit
		</Buttons>
		<Buttons disabled={nothing_checked} bg_color="--background3">Commit & amend</Buttons>
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
	.commit-message-output {
		height: 100px;
		padding: 5px 6px;
		border: 1px solid var(--background3);
		border-radius: var(--border-radius);
	}
	.commit-message-container textarea:focus ~ .commit-message-output {
		border: 1px solid var(--blue);
	}
	.commit-message-container textarea:focus ~ .commit-message-output > #message::after {
		display: inline;
		content: '_';
		animation: 1s infinite blink;
	}
	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
