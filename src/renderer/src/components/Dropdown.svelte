<script>
	import Buttons from './Buttons.svelte'

	import { fade } from 'svelte/transition'

	export let label = ''
	export let title = ''
	export let icon = ''
	export let contents = []
	export let disable_arrow_icon = false

	const dropdown_arrow = 'ri-arrow-down-s-line'

	export let show_content = false
	$: show = show_content
</script>

<div class="dropdown">
	<slot name="button">
		<Buttons
			classes="dropdown-btn"
			{label}
			{title}
			{icon}
			icon2={disable_arrow_icon ? '' : dropdown_arrow}
			bg_color="transparent"
			on:click
		/>
	</slot>
	{#if show}
		<div class="contents-container p-2" transition:fade={{ duration: 10 }}>
			<slot name="content">
				<ul>
					{#each contents as content}
						<li class="px-3 py-2">{content}</li>
					{/each}
				</ul>
			</slot>
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		max-width: 120px;
	}
	.contents-container {
		width: max-content;
		min-width: 150px;
		max-height: calc(100vh - 200px);
		position: absolute;
		top: 120%;
		opacity: 1;
		background-color: var(--background2);
		border: 1px solid var(--background3);
		border-radius: var(--border-radius);
		box-shadow: 0px 2px 5px 0px var(--background);
		overflow-y: auto;
		transition: opacity 0.2s;
	}
	.contents-container::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
