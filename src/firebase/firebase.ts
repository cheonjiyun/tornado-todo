// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQgiCscxL2Fc2Efs6gDb8c3QEGbLfxMV8",
    authDomain: "tornado-todo.firebaseapp.com",
    projectId: "tornado-todo",
    storageBucket: "tornado-todo.appspot.com",
    messagingSenderId: "1002567402087",
    appId: "1:1002567402087:web:e8501e962e0a264d6a4ac2",
    measurementId: "G-LKGN9GYW0S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
