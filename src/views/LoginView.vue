<script>
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
                    this.message = 'Usuario logueado';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.message = errorMessage;
                })
        }
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