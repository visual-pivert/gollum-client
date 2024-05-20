<script lang="ts">
	import Index from './pages/Index.svelte'

	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<div class="main-container">
	<!-- <p>Hello world!</p> -->
	<Index />
</div>

<style>
	.main-container {
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
	}
</style>
