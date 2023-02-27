import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebaseApp from './firebase';
require ('@/assets/style/bulma.scss');
require ('@/assets/style/main.css');

export const app=createApp(App)
app.use(router)
app.mount('#app');