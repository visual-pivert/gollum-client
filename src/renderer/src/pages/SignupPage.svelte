<script lang="ts"></script>


<div class="account-page">
    <div class="account">
        <div class="text-center mb-3">
            <span class="text-8xl font-bold text-green-500">G</span>
        </div>
        <div class="mb-6">
            <h2 class="text-2xl text-center">Créer un compte sur <span class="font-bold text-green-500">Gollum</span>.</h2>
        </div>
        <div class="form-group mb-5">
            <div class="mb-6">
                <input class="form-input" type="text" placeholder="Nom d'utilisateur">
            </div>
            <div class="mb-6">
                <input class="form-input" type="email" placeholder="Email">
            </div>
            <div class="mb-6">
                <input class="form-input" type="password" placeholder="Mot de passe">
            </div>
            <div class="mb-6">
                <input class="form-input" type="password" placeholder="Confirmation du mot de passe">
            </div>
            <div>
                <button class="btn btn-primary btn-full" type="submit">S'inscrire</button>
            </div>
        </div>
        <div>
            <p class="text-center font-medium">Vous avez déjà un compte? <a href="login" class="text-blue-400 underline font-semibold">connexion</a></p>
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