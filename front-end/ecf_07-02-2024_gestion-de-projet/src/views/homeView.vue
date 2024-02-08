<script setup>
import { usePojectStore } from '../stores/project.js';
import { onMounted } from 'vue';

const projectStore = usePojectStore();

onMounted(async ()=> {
    await projectStore.fetchListProjects();
})

console.log(projectStore.listProject);

</script>

<template>    
    <section>
        <div v-for="project in projectStore.listProject" class="cards">
            <p><span>Nom du projet:</span>  {{ project.projectName }}</p>
            <p><span>Description: </span>  {{ project.projectDescription }}</p>            
        </div>
    </section>
</template>
<style scoped>
.cards{
    padding: 1rem;
    border: 1px solid rgb(193, 200, 197);
    border-radius: 0.5rem;
    width: 46%;
    margin: 2%;    
    box-shadow: 8px 4px 4px rgba(175, 175, 175, 0.832);
}

section{
    display: flex;
    flex-wrap: wrap; 
}

span{
    color: rgb(0, 163, 92);
}
</style>