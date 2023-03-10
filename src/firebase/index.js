import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFirpnYPTh5Izd5ldO8LZa3UtHrLldRak",
    authDomain: "securityprojectdi5tb.firebaseapp.com",
    databaseURL: "https://securityprojectdi5tb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "securityprojectdi5tb",
    storageBucket: "securityprojectdi5tb.appspot.com",
    messagingSenderId: "878316006275",
    appId: "1:878316006275:web:106258acce3148665de4b6"
    };
let firebaseApp;
firebaseApp=initializeApp(firebaseConfig);
export const auth=getAuth();
const db=getDatabase();

export default firebaseApp