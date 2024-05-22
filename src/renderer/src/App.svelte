<script lang="ts">
    import LoginPage from "./pages/LoginPage.svelte"
    import SignupPage from "./pages/SignupPage.svelte";
    import { setContext } from 'svelte';
    import { current_page } from '#renderer/store'

    const pages = {
        'login-page': LoginPage,
        'signup-page': SignupPage
    }

    // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<div class="main-container">

    <!-- <LoginPage></LoginPage>
    <SignupPage></SignupPage> -->
    <svelte:component this={pages[$current_page]} />


</div>

<style>

</style>