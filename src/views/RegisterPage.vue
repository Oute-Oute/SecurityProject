<template>
    <h1 class="h1-size">Create an Account</h1>
    <p class="required"><input type="text" placeholder="Email" v-model="email" required /></p>
    <p class="required"><input type="password" placeholder="Password" v-model="password" required /></p>
    <p class="required"><input type="password" placeholder="Confirm Password" v-model="confirmPassword" required /></p>
    <div class="errorRegex">
        <p v-if="password.length < 8">Password must be at least 8 characters</p>
        <p v-if="password.search(/(?=.*?[a-z])/)">Password must contains at least one letter</p>
        <p v-if="password.search(/^(?=.*?[A-Z])/)">Password must contains at least one capital letter</p>
        <p v-if="password.search(/(?=.*?[0-9])/)">Password must contains at least one digit</p>
        <p v-if="password.search(/(?=.*?[#?!@$%^&*-])/)">Password must contains at least one special character</p>
        <p v-if="password !== confirmPassword && confirmPassword != ''">Passwords do not match</p>
        <p v-if="errMsg">{{ errMsg }}</p>
    </div>

    <p><button class="button is-white" @click="register">Submit</button></p>
</template>
<script setup>
import { ref } from 'vue';
import firebaseApp from '../firebase';
import { useRouter } from 'vue-router'; // import router
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
let db = getFirestore();
const CryptoJS = require("crypto-js")
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errMsg = ref('')
const router = useRouter() // get a reference to our vue router
const register = () => {
    if (email.value.search(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        alert('Email is not valid')
        return
    }
    else if (password.value !== confirmPassword.value || password.value.search(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
        alert('Passwords do not meet requirements')
        return
    }
    else {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const users = collection(db, "users");
                let hash = CryptoJS.AES.encrypt(password.value, this.AESKey).toString()
                setDoc(doc(users, user.uid), {
                    password: hash,
                    email: email.value
                });

                router.push('/feed') // redirect to feed
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        errMsg.value = 'Email is already in use'
                        break
                    case 'auth/invalid-email':
                        errMsg.value = 'Email is invalid'
                        break
                    case 'auth/weak-password':
                        errMsg.value = 'Password is too weak'
                        break
                    default:
                        errMsg.value = 'Error: ' + errorMessage + ' Please try again'
                        break;
                }
                // ..
            });
    }
}
</script>

<style scoped>
@import "../assets/style/auth.css";
</style>