import { defineStore } from "pinia";
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {

    async function fetchLogin(dataUser){
        try {         
            const response = await axios.post('http://localhost:3000/api/user/login', dataUser);            
            localStorage.setItem("monde__de_merde_", response.data.token)
        } catch (err) {
            console.error('Erreur lors de la récupération des données :', err.response);
        }
    }

    async function fetchSignup(dataUser){
        try {
            await axios.post('http://localhost:3000/api/user/signup', dataUser);
            await fetchLogin(dataUser);
        } catch (err) {
            console.error('Erreur lors de la récupération des données :', err.response);
        }
    }

    return {fetchLogin, fetchSignup};
})