import { createApp } from 'vue';
import App from './App.vue';
import firebaseApp from './plugins/firebase';
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyCFirpnYPTh5Izd5ldO8LZa3UtHrLldRak",
//     authDomain: "securityprojectdi5tb.firebaseapp.com",
//     databaseURL: "https://securityprojectdi5tb-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "securityprojectdi5tb",
//     storageBucket: "securityprojectdi5tb.appspot.com",
//     messagingSenderId: "878316006275",
//     appId: "1:878316006275:web:106258acce3148665de4b6"
// };

// const fApp=initializeApp(firebaseConfig);
// const db=getDatabase();
//console.log(db)

createApp(App).mount('#app');
