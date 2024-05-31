<script>
	import { current_view, logged_user, not_cloned_project_list } from '../store'
	import Topbar from './../components/TopBar.svelte'
	import LeftBar from '../components/left_aside/LeftBar.svelte'
	import RightSide from '../components/right_aside/RightSide.svelte'
	import Footer from '../components/Footer.svelte'
	import { page_list } from '../components/left_aside/left_aside_buttons'

	// Recuperation de l'utilisateur connecte
	// logged user est un store
	// window.api.getLoggedUser().then((data) => {
	// 	logged_user.update(() => data)
	// 	window.api.apiRepoList($logged_user.AUTH_TOKEN).then((data) => {
	// 		const the_data = data.datas
	// 		console.log(the_data)
	// 		not_cloned_project_list.update(() => the_data)
	// 	})
	// })

</script>

<main>
	<Topbar />
	<div>
		<div class="left">
			<LeftBar />
		</div>
		<!-- {JSON.stringify($logged_user)} -->
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
