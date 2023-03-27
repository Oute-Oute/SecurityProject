<template>
    <div>
        <nav>
            <router-link class="menu-item" to="/"> Home </router-link> |
            <router-link class="menu-item" to="/wishlist"> Wishlist </router-link> |
            <span v-if="isLoggedIn">
                <button class="menu-item" @click="signOutButton">Logout</button>
            </span>
            <span v-else>
                <router-link class="menu-item" to="/register"> Register </router-link> |
                <router-link class="menu-item" to="/sign-in"> Login </router-link>
            </span>
        </nav>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'MenuComp'
}
</script>

<script setup>
import { ref } from 'vue' // used for conditional rendering
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
const router = useRouter()

const isLoggedIn = ref(true)
// runs after firebase is initialized
const auth = getAuth()
onAuthStateChanged(auth, function (user) {
    if (user) {
        isLoggedIn.value = true // if we have a user
    } else {
        isLoggedIn.value = false // if we do not
    }
})
const signOutButton = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    router.push('/')
}
</script>

<style scoped>
@import "../assets/style/menu.css";
</style>