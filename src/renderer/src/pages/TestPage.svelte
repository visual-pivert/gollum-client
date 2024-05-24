<script>

</script>

<div class="test">
    <button on:click|preventDefault={ async (e) => {
        const basedir = '/home/eliome/Test/ultime_git_test/'
        const credentials = { username: 'username', password: 'password' }
        const git_log_response = await window.api.gitLog(basedir, credentials)
        console.log("API reponse: " + JSON.stringify(git_log_response))
    }}>git log...</button>
</div>

<style>

</style>