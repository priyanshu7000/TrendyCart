// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8q3OAi4qU-YfUAT1AA1iFR4qPw_HRpKg",
  authDomain: "trendycart-5e5d6.firebaseapp.com",
  projectId: "trendycart-5e5d6",
  storageBucket: "trendycart-5e5d6.firebasestorage.app",
  messagingSenderId: "67189418319",
  appId: "1:67189418319:web:a42b2b2475b039971d3d3a",
  measurementId: "G-JP48TPBLZ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
