<script>
	import { current_view } from '../store'
	import Topbar from './../components/TopBar.svelte'
	import LeftBar from '../components/left_aside/LeftBar.svelte'
	import RightSide from '../components/right_aside/RightSide.svelte'
	import Footer from '../components/Footer.svelte'
	import { page_list } from '../components/left_aside/left_aside_buttons'
</script>

<main>
	<Topbar />
	<div>
		<div class="left">
			<LeftBar />
		</div>
		<div class="center">
			<div class="center-container">
				<svelte:component this={page_list[$current_view]} />
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
		/* width: 500px; */
		flex-grow: 1;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.center-container {
		width: max(min(100%, 7in), 2in);
		height: max-content;
		padding: 5px 6px;
		margin: 0 auto;
	}
</style>
