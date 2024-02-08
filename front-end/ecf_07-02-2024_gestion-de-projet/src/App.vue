<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <!-- As a link -->
<nav class="navbar ">
  <a class="navbar-brand text-white" href="#">Navbar</a>
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
