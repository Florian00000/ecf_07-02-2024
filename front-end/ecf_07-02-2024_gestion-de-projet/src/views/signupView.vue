<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth.js";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const username = ref("");
const password = ref("");
const password2 = ref("");
const alertConfirmation = ref(false);

async function inscription() {
    alertConfirmation.value = false;
    if (password.value !== password2.value) {
        (alertConfirmation.value = true);
    }else{
        const dataUser = {
            username: username.value,
            password: password.value,
        };
        await authStore.fetchSignup(dataUser);
        if (localStorage.getItem("monde__de_merde_")) {
          router.push("/user")
        }
    }

    username.value = "";
    password.value = "";
    password2.value = "";
}
</script>

<template>
    <form v-on:submit.prevent="inscription">
        <h1>Inscription</h1>
        <div class="form-group">
            <label for="exampleInputEmail1">Nom d'utilisateur</label>
            <input type="text" class="form-control" placeholder="Entrer votre nom d'utilisateur" required="required" v-model="username" />
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Mot de passe</label>
            <input type="password" class="form-control" placeholder="mot de passe" required="required" v-model="password" />
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Confirmer votre mot de passe</label>
            <input type="password" class="form-control" placeholder="mot de passe" required="required" v-model="password2" />
        </div>
        <button type="submit" class="btn">Inscription</button>

        <!-- alerte de mots de passe différents -->
        <template v-if="alertConfirmation === true">
            <div class="alert alert-danger mt-2" role="alert">
                Erreur lors de la confirmation du mot de passe
            </div>
        </template>

        <br />
        <hr />
        <RouterLink to="/" id="lien-signup">Déja un compte? Cliquez là-bas</RouterLink>
    </form>
</template>

<style scoped>
form {
    width: 40%;
    margin: auto;
    height: 100%;
    padding-top: 15%;
}

#lien-signup {
    display: block;
    text-align: end;
}

button{
  background-color: rgb(0, 104, 74) ;
  color: white ;
}
</style>
