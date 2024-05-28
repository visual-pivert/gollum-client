<script>
	import Buttons from './Buttons.svelte'

	import { fade } from 'svelte/transition'

	// import { afterUpdate, createEventDispatcher } from 'svelte'
	// const dispatch = createEventDispatcher()

	export let label = ''
	export let icon = ''
	export let contents = []

	const dropdown_arrow = 'ri-arrow-down-s-line'

	export let show_content = false
	// console.log(show_content)
	$: show = show_content
</script>

<div class="dropdown">
	<slot name="button">
		<Buttons
			classes="dropdown-btn"
			{label}
			{icon}
			icon2={dropdown_arrow}
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

<!-- <div>
	<slot>
		<ul>
			{#each contents as item}
				<li>{item}</li>
			{/each}
		</ul>
	</slot>
</div> -->

<style>
	.dropdown {
		position: relative;
		max-width: 120px;
	}
	.contents-container {
		width: max-content;
		min-width: 150px;
		max-height: 400px;
		position: absolute;
		top: 120%;
		opacity: 1;
		background-color: var(--background2);
		border: 1px solid var(--background3);
		border-radius: var(--border-radius);
		box-shadow: 0px 2px 5px 0px var(--background);
		overflow-y: hidden;
		transition: opacity 0.2s;
	}
</style>
