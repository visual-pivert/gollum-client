<script lang="ts">
	import NavIcon from '../NavIcon.svelte'
	import { active_aside_component } from '../../store'
	import { top_buttons, bottom_buttons, contents } from './right_aside_buttons'
	import { afterUpdate } from 'svelte'
	afterUpdate(() => {})
</script>

<div class="container">
	{#if $active_aside_component}
		<div class="content">
			<svelte:component this={contents[$active_aside_component]} />
		</div>
	{/if}
	<div class="right-bar">
		<div class="icon-container">
			{#each top_buttons as button}
				<NavIcon
					icon={button.icon}
					on:click={() => button.onClick()}
					active={$active_aside_component == button.name}
				/>
			{/each}
		</div>
		<div class="icon-container">
			{#each bottom_buttons as button}
				<NavIcon
					icon={button.icon}
					on:click={() => button.onClick()}
					active={$active_aside_component == button.name}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		width: max-content;
		height: 100%;
		display: flex;
	}
	.right-bar {
		width: var(--bar-thinkness);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border-left: 1px solid var(--background);
		background-color: var(--background2);
	}
	.icon-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.content {
		width: 250px;
		height: 100%;
		background-color: var(--background2);
	}
</style>
