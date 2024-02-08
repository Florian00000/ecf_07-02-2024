import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const usePojectStore = defineStore('project',() => {
    const listProject = ref([]);

    async function fetchListProjects() {
        try {
            const token = localStorage.getItem('monde__de_merde_');

            const response =  await axios.get('http://localhost:3000/api/project/getMyProjects', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            listProject.value = response.data;

        } catch (err) {
            console.log('Erreur lors de la récupération des données :', err);
        }
    }

    return { listProject, fetchListProjects };
})