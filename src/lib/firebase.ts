import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8q3OAi4qU-YfUAT1AA1iFR4qPw_HRpKg",
  authDomain: "trendycart-5e5d6.firebaseapp.com",
  projectId: "trendycart-5e5d6",
  storageBucket: "trendycart-5e5d6.firebasestorage.app",
  messagingSenderId: "67189418319",
  appId: "1:67189418319:web:a42b2b2475b039971d3d3a",
  measurementId: "G-JP48TPBLZ7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const setUpRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved");
        },
      }
    );
  }
};
