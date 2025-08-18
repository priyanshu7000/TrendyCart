// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    recaptchaWidgetId?: number;
  }
}

// --- Firebase config from env (Vite) ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// --- Initialize ---
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// --- Create (or reuse) reCAPTCHA ---
// IMPORTANT: Correct constructor signature is:
// new RecaptchaVerifier(containerOrId, parameters, auth)
export function setupRecaptcha(): RecaptchaVerifier {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",              // must exist in DOM
      {
        size: "invisible",                // switch to "normal" if you want to see it while debugging
        callback: () => {
          console.log("reCAPTCHA solved ✅");
        },
        "expired-callback": () => {
          console.warn("reCAPTCHA expired; will be reset on next attempt.");
        },
      },
      auth
    );

    // render is recommended to ensure the widget is fully created
    window.recaptchaVerifier.render().then((widgetId: number) => {
      window.recaptchaWidgetId = widgetId;
      console.log("reCAPTCHA widgetId:", widgetId);
    });
  }
  return window.recaptchaVerifier!;
}

// --- Send OTP helper ---
export async function sendOtpE164(phoneE164: string): Promise<ConfirmationResult> {
  const appVerifier = setupRecaptcha();
  // Simple guardrails/logging
  if (!phoneE164.startsWith("+")) {
    throw new Error("Phone must be in E.164 format (e.g., +919876543210).");
  }
  console.log("Sending OTP to:", phoneE164);
  return await signInWithPhoneNumber(auth, phoneE164, appVerifier);
}
