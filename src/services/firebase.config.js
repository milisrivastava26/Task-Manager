import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD8JVB0doZ8CJ9FbJmGjHlEchVlyxHOGRM",
    authDomain: "task-manager-378d1.firebaseapp.com",
    projectId: "task-manager-378d1",
    storageBucket: "task-manager-378d1.appspot.com",
    messagingSenderId: "508611950582",
    appId: "1:508611950582:web:0b56749606d38306ef79d7"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);