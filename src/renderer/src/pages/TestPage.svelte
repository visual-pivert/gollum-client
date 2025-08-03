<script>
    import { FormUtil } from "../utils/FormUtil"
    
    let tree
    let blob
    $: real_tree = tree
    $: real_blob = blob
</script>

<div class="test">
    <button on:click|preventDefault={ async (e) => {
        const basedir = '/home/eliome/Test/ultime_git_test/'
        const credentials = { username: 'username', password: 'password' }
        const git_log_response = await window.api.gitLog(basedir, credentials)
        console.log("API reponse: " + JSON.stringify(git_log_response))
    }}>git log...</button>
</div>

<div class="test-tree">
    <form action="" on:submit|preventDefault={ async (e) => {
        // const form_value = FormUtil.getFormData(e.target)
        // tree = await window.api.apiRepoTree(
        //     form_value['access_token'], 
        //     form_value['repo_path'],
        //     form_value['branch'],
        //     form_value['file_path']
        // )
        tree = await window.api.apiRepoTree(
            'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ==',
            'username/new_repo2',
            'a',
            ''
        )
    }}>
        <button type="submit">git tree...</button>
    </form>
    <div>{JSON.stringify(real_tree)}</div>
</div>
<div class="test-blob">
    <form action="" on:submit|preventDefault={ async (e) => {
        // const form_value = FormUtil.getFormData(e.target)
        blob = await window.api.apiRepoBlob(
            'eyJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJfaWQiOiAzNDg5NSwgIl90aW1lc3RhbXAiOiAxNzE2MjczNDQwfQ==',
            'username/new_repo2',
            'a',
            'testttt/testtt'
        )
    }}>
        <button type="submit">git blob...</button>
    </form>
    <div>{JSON.stringify(real_blob)}</div>
</div>

<style>

</style>