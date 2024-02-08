<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.js';
import { useRoute, useRouter, RouterLink } from "vue-router";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');

async function login() {
    const dataUser = {
        username: username.value,
        password: password.value
    }    
    await authStore.fetchLogin(dataUser);
    username.value = "";
    password.value = "";
    if (localStorage.getItem("jwt")) {
      router.push("/user")
    }
}

</script>

<template >
    <form v-on:submit.prevent="login">
      <h1>Connexion</h1>
  <div class="form-group">
    <label for="exampleInputEmail1">Nom d'utilisateur</label>
    <input type="text" class="form-control" placeholder="Entrer votre nom d'utilisateur" required="required" v-model="username" >    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mot de passe</label>
    <input type="password" class="form-control" placeholder="mot de passe" required="required" v-model="password" >
  </div>  
  <button type="submit" class="btn">Connexion</button>
  <br>
  <hr>
  <RouterLink to="/signup" id="lien-signup">Pas encore de compte? Cliquez-ici</RouterLink>
</form>
  
</template>

<style scoped>

form{
    width: 40%;
    margin: auto;
    height: 100%;
    padding-top: 15%;        
}

#lien-signup{
  display: block;
  text-align: end;
}


</style>
