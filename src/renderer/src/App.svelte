<script lang="ts">
	import { onMount } from 'svelte'
	import LoginPage from './pages/LoginPage.svelte'
	import SignupPage from './pages/SignupPage.svelte'
	import { current_page } from './store'
	// import TestPage from './pages/TestPage.svelte'
	import Index from './pages/Index.svelte'
	import NotifContainer from './components/notification/NotifContainer.svelte'

	const pages = {
	 	'login-page': LoginPage,
	 	'signup-page': SignupPage,
		'index-page': Index
	}

	onMount(async () => {
		await window.api.loginSubmit({
			username: 'username',
			password: 'password'
		})
		console.log(await window.api.getLoggedUser())
	})
</script>

<div class="main-container relative">
	<!---<LoginPage></LoginPage>
    <SignupPage></SignupPage>--->
	<svelte:component this={pages[$current_page]} />
	<!---<TestPage></TestPage>-->
	<!--<Index />-->
	<NotifContainer />
</div>
