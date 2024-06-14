<script>
	// import { createEventDispatcher } from 'svelte'
	// const dispatch = createEventDispatcher()

	export let label = ''
	export let icon = ''
	export let icon2 = ''
	export let bg_color = '--background3'
	export let disabled = false
	export let icon_color = ''
	export let classes = ''

	$: cursor = disabled ? 'not-allowed' : 'pointer'
	let padding = icon ? '0.4em 1em 0.4em 0.7em' : '0.4em 1em'
	padding = icon2 ? '0.4em 0.7em 0.4em 1em' : padding
	padding = label ? padding : '2px'

	// label = [...label][0].toUpperCase() + [...label].slice(1).join('')
</script>

<button
	class={classes}
	style="
	cursor:{cursor};
    padding: {padding};
    background-color: var({bg_color});
    "
	on:click|preventDefault
	{disabled}
>
	<slot>
		{#if icon}
			<i class="{icon} icon1 {label ? 'mr-2' : ''}" style="color: {icon_color}"></i>
		{/if}
		<span>{label}</span>
		{#if icon2}
			<i class="{icon2} icon2"></i>
		{/if}
	</slot>
</button>

<!-- <button style="
    padding: {padding};
    background-color: {bg_color};
">
    <slot name="icon1" />
    <slot name="label" />
    <slot />
    <slot name="icon2" />
</button> -->

<style>
	button {
		all: unset;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--border-radius);
	}
	button > i {
		font-size: 1.1em;
	}
	button > .icon1 {
		/* margin-right: 5px; */
	}
	button > .icon2 {
		margin-left: 10px;
	}
	span {
		/* width: 100%; */
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}
	button.border {
		border: 1px solid var(--background3);
	}
	button.border-blue {
		border: 2px solid var(--blue-btn);
	}
</style>
