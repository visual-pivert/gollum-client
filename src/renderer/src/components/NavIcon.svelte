<script>
	export let icon = ''
	export let id = ''
	export let active = false
</script>

<button {id} on:click class:active>
	<i class={icon}></i>
</button>

<style>
	button {
		all: unset;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		border-radius: var(--border-radius);
		transition: background 0.2s;
	}
	button.active {
		background-color: var(--background3);
	}
	button:hover i {
		color: white;
	}
	i {
		font-size: 1em;
		color: var(--font-color2);
	}
</style>
