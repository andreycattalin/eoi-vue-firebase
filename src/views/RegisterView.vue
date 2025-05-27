<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            console.log(this.email, this.password)
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
    </div>
</template>