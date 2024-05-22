<script lang="ts">
    import { FormUtil } from "#renderer/utils/FormUtil"
    import { RouteUtil } from "#renderer/utils/RouteUtil"
</script>


<div class="account-page">
    <div class="account">
        <div class="text-center mb-3">
            <span class="text-8xl font-bold text-green-500">G</span>
        </div>
        <div class="mb-6">
            <h2 class="text-2xl text-center">Créer un compte sur <span class="font-bold text-green-500">Gollum</span>.</h2>
        </div>
        <form class="form-group mb-5" method="POST" on:submit|preventDefault={async (e) => {
            const form_data = FormUtil.getFormData(e.target)
            const signup_api_response = await window.api.signupSubmit(form_data)
            console.log("API response: " + JSON.stringify(signup_api_response))
        }}>
            <div class="mb-6">
                <input class="form-input" name="username" type="text" placeholder="Nom d'utilisateur">
            </div>
            <div class="mb-6">
                <input class="form-input" name="email" type="email" placeholder="Email">
            </div>
            <div class="mb-6">
                <input class="form-input" name="password" type="password" placeholder="Mot de passe">
            </div>
            <div class="mb-6">
                <input class="form-input" name="cpassword" type="password" placeholder="Confirmation du mot de passe">
            </div>
            <div>
                <button class="btn btn-primary btn-full" type="submit">S'inscrire</button>
            </div>
        </form>
        <div>
            <p class="text-center font-medium">Vous avez déjà un compte? <a href="login" on:click|preventDefault={() => RouteUtil.redirectTo('login-page')} class="text-blue-400 underline font-semibold">connexion</a></p>
        </div>
    </div>
</div>


<style>
    .account-page {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .account {
        min-width: 400px;
        padding: 10px;
    }
</style>