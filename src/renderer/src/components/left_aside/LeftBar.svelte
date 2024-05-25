<script lang="ts">
	import { current_view } from '../../store'
	import NavIcon from '../NavIcon.svelte'
	import { bottom_left_buttons, top_left_buttons } from './left_aside_buttons'
</script>

<div class="container">
	<div class="button-container">
		{#each top_left_buttons as button}
			<NavIcon
				icon={button.icon}
				on:click={() => button.onClick()}
				active={$current_view == button.name}
			/>
		{/each}
	</div>
	<div class="button-container">
		{#each bottom_left_buttons as button}
			<NavIcon
				icon={button.icon}
				on:click={() => button.onClick()}
				active={$current_view == button.name}
			/>
		{/each}
	</div>
</div>

<style>
	.container {
		width: var(--bar-thinkness);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background-color: var(--background2);
	}
	.button-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
