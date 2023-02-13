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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
