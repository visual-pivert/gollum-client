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
		<Buttons {label} {icon} icon2={dropdown_arrow} bg_color="transparent" on:click />
	</slot>
	{#if show}
		<slot name="content">
			<ul class="contents-container" transition:fade={{ duration: 10 }}>
				{#each contents as content}
					<li>{content}</li>
				{/each}
			</ul>
		</slot>
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
	}
	.contents-container {
		width: 150px;
		max-height: 400px;
		position: absolute;
		top: 120%;
		padding: 0 0;
		opacity: 1;
		background-color: var(--background2);
		border-radius: var(--border-radius);
		box-shadow: 0px 1px 5px 0px var(--background);
		overflow-y: hidden;
		transition: opacity 0.2s;
	}
	.contents-container > li {
		padding: 8px 10px;
	}
	/* .contents-container.show {
		opacity: 1;
	} */
</style>
