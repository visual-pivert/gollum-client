<script lang="ts">
    import LoginPage from "./pages/LoginPage.svelte"
    import SignupPage from "./pages/SignupPage.svelte";



    // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<div class="main-container">
    <LoginPage></LoginPage>
    <SignupPage></SignupPage>


</div>

<style>

</style>