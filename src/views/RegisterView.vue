<script>
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    data() {
        return {
            email: '',
            password: '',
            message: ''
        }
    },
    methods: {
        register() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.message = 'Usuario registrado';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.message = errorMessage;
                });
        }
    }
}
</script>

<template>
    <div>
        <h1>Registro</h1>
        <input v-model="email" type="email">
        <input v-model="password" type="password">
        <button @click="register">Registrarme</button>
        <p>{{ message }}</p>
    </div>
</template>