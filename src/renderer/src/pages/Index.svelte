<script>
	import { current_page } from '../store/store'
	import Topbar from './../components/TopBar.svelte'
	import LeftBar from '../components/left/LeftBar.svelte'
	import RightSide from '../components/right_aside/RightSide.svelte'
	import ProjectPage from '../components/ProjectPage.svelte'
	import SettingsPage from '../components/SettingsPage.svelte'
	// import { afterUpdate } from 'svelte'
	import Footer from '../components/Footer.svelte'

	const page_list = {
		project_page: ProjectPage,
		settings_page: SettingsPage
	}
	$: selected_page = page_list[$current_page]
</script>

<main>
	<Topbar />
	<div>
		<div class="left">
			<LeftBar />
		</div>
		<div class="center">
			<div class="center-container">
				<svelte:component this={selected_page} />
			</div>
		</div>
		<div class="right">
			<RightSide />
		</div>
	</div>
	<Footer />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
	}
	main > div {
		width: 100%;
		height: calc(100% - var(--bar-thinkness) - var(--footer-thinkness));
		display: flex;
		justify-content: space-between;
	}
	.left,
	.right {
		width: max-content;
	}
	.right {
		margin-left: 5px;
	}
	.center {
		width: 500px;
		flex-grow: 1;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.center-container {
		width: max(min(100%, 700px), 310px);
		height: max-content;
		padding: 5px 6px;
		margin: 0 auto;
	}
</style>
