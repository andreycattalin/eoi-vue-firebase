<script>
import { auth } from '@/firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    data() {
        return {
            email: "",
            password: "",
            message: ""
        }
    },
    methods: {
        login() {
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.message = 'Usuario logueado ' + user.email;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.message = errorMessage;
                })
        }
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                this.message = 'Usuario logueado ' + user.email;
            } else {
                this.message = 'No hay usuario logueado';
            }
        });
    }
}
</script>

<template>
    <div>
        <h1>Iniciar sesión</h1>
        <input v-model="email" type="email">
        <input v-model="password" type="password">
        <button @click="login">Entrar</button>
        <p>{{ message }}</p>
    </div>
</template>