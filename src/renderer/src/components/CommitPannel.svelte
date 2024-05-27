<script>
	import Buttons from './Buttons.svelte'
</script>

<div class="container">
	<p>commit</p>
	<div class="button-container">
		<Buttons bg_color="--blue-btn">Commit</Buttons>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 10px;
		background-color: var(--background2);
	}
</style>
