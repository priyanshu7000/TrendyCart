import { useRef, useState } from "react";
import { auth } from "../lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import type { ConfirmationResult } from "firebase/auth";

export default function SigninPhone() {
  const [phone, setPhone] = useState(""); // e.g. +91XXXXXXXXXX
  const [code, setCode] = useState(""); // 6-digit OTP
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confirmRef = useRef<ConfirmationResult | null>(null);

  // --- Setup Recaptcha ---
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // ✅ element ID first
        { size: "invisible" },
        auth // ✅ auth is last
      );
    }
    return (window as any).recaptchaVerifier as RecaptchaVerifier;
  };

  // --- Send OTP ---
  const sendOtp = async () => {
    setError(null);

    // ✅ Validate phone format
    if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
      setError("Invalid phone number. Use format: +919876543210");
      return;
    }

    setSending(true);
    try {
      const appVerifier = await setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      confirmRef.current = confirmation;
      setStep("verify");
    } catch (e: any) {
      console.error("OTP Error:", e);
      setError(e?.message || "Failed to send OTP");
      // Reset verifier so next try works
      (window as any).recaptchaVerifier = null;
    } finally {
      setSending(false);
    }
  };

  // --- Verify OTP ---
  const verifyOtp = async () => {
    setError(null);
    setVerifying(true);
    try {
      await confirmRef.current?.confirm(code);
      // ✅ success — onAuthStateChanged in AuthContext will update user
    } catch (e: any) {
      setError("Invalid or expired code");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">
        Sign in with Phone
      </h1>

      {step === "enter" && (
        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={sendOtp}
            disabled={sending}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-60"
          >
            {sending ? "Sending OTP..." : "Send OTP"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      {step === "verify" && (
        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2 tracking-widest text-center"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
          <button
            onClick={verifyOtp}
            disabled={verifying || code.length < 6}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-60"
          >
            {verifying ? "Verifying..." : "Verify & Continue"}
          </button>
          <button
            onClick={() => setStep("enter")}
            className="w-full border py-2 rounded"
          >
            Edit phone
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      {/* Required for reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
