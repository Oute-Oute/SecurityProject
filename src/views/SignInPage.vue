<template>
    <h1>Login to Your Account</h1>
    <p class="required"><input type="text" placeholder="Email" v-model="email" /></p>
    <p class="required"><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button class="button is-white" @click="signIn">Submit</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // import router
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const email = ref('')
const errMsg = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router
const signIn = () => { // we also renamed this method
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            router.push('/feed') // redirect to the feed
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    errMsg.value = 'No account with that email was found'
                    break
                case 'auth/wrong-password':
                    errMsg.value = 'Incorrect password'
                    break
                default:
                    errMsg.value = 'Email or password was incorrect'
                    break
            }
        });
}
</script>

<style scoped>
@import "../assets/style/auth.css";
</style>