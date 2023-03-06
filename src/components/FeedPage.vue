<template>
    <router-view />
    <div class="save-btn">
        <button class="modal-button" @click="showModal = true">New Show</button>
    </div>
    <NewShow v-show="showModal" @close-modal="showModal = false" />
</template>


<script>
import NewShow from './NewShow.vue';

export default {
    name: 'App',
    components: {
        NewShow,

    },
    data() {
        return {
            showModal: false
        }
    }
}
</script>

<style scoped>
@import "../assets/style/modal.css"
</style>