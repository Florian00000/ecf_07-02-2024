<script setup>
import { RouterView } from 'vue-router';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

function logout(){
  localStorage.removeItem("monde__de_merde_");
  router.push("/");
}

</script>

<template>
  <header>
    <!-- As a link -->
<nav class="navbar ">
  <a class="navbar-brand text-white" href="#">Navbar</a>
  <button class="btn btn-outline-light" v-on:click="logout">déconnexion</button>
</nav>
  
  </header>

  <main class="container">
    <RouterView/>
  </main>
  
</template>

<style scoped>

nav{
  background-color: rgb(0, 104, 74);  
  height: 8dvh;
}

main{
  height: 92dvh;
}



</style>
