<script lang="ts">
    import { FormUtil } from "../utils/FormUtil";
    import { RouteUtil } from "../utils/RouteUtil";
</script>

<div class="account-page">
    <div class="account">
        <div class="text-center mb-3">
            <span class="text-8xl font-bold text-green-500">G</span>
        </div>
        <div class="mb-6">
            <h2 class="text-2xl text-center">Contribuer à l'innovation digitale avec <span class="font-bold text-green-500">Gollum</span>.</h2>
        </div>
        <form class="form-group mb-5" method="POST" on:submit|preventDefault={ async (e) => {
            const form_values = FormUtil.getFormData(e.target)
            const login_api_reponse = await window.api.loginSubmit(form_values)
			if (login_api_reponse["datas"]){
				RouteUtil.redirectTo('index-page')
			}
            console.log("API reponse: " + JSON.stringify(login_api_reponse))
        }}>
            <div class="mb-6">
                <input class="form-input" type="text" name="username" placeholder="Nom d'utilisateur">
            </div>
            <div class="mb-6">
                <input class="form-input" type="password" name="password" placeholder="Mot de passe">
            </div>
            <div>
                <button class="btn btn-primary btn-full" type="submit">Se connecter</button>
            </div>
        </form>
        <div>
            <p class="text-center font-medium">Vous n'avez pas de compte? <a href="signup" class="text-blue-400 underline font-semibold" on:click|preventDefault={() => RouteUtil.redirectTo("signup-page")}>Créer un compte.</a></p>
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
        max-width: 400px;
        padding: 10px;
    }

</style>
