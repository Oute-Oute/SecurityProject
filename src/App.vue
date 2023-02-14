<template>
  <div id="app">
    <MenuComp/>
  </div>
</template>

<script>
import MenuComp from './components/MenuComp.vue';

export default {
  name: 'App',
  components: {
    MenuComp
}
}
</script>

<style scoped>
@import "./assets/style/main.css";
</style>
