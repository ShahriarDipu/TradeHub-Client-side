// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXo6PWnbGV6EzEtzq192tK3-l0KrioHAs",
  authDomain: "tradehub-1931e.firebaseapp.com",
  projectId: "tradehub-1931e",
  storageBucket: "tradehub-1931e.firebasestorage.app",
  messagingSenderId: "699996081099",
  appId: "1:699996081099:web:ca6aadeeaf6ae08c43844e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);