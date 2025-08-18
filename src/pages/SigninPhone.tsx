import React, { useEffect, useState } from "react";
import { auth, setupRecaptcha, sendOtpE164 } from "../lib/firebase";
import type { ConfirmationResult } from "firebase/auth";

declare global {
  interface Window {
    confirmationResult: ConfirmationResult;
  }
}

const SigninPhone: React.FC = () => {
  const [phone, setPhone] = useState(""); // 10 digits only UI
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  // Ensure the reCAPTCHA container exists before init
  useEffect(() => {
    if (step === "phone") {
      // Initialize (or reuse) reCAPTCHA once the container is mounted
      setupRecaptcha();
    }
  }, [step]);

  const handleSendOTP = async () => {
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    try {
      setLoading(true);
      const e164 = `+91${phone}`;
      const confirmation = await sendOtpE164(e164);
      window.confirmationResult = confirmation;
      setStep("otp");
      alert("OTP sent successfully!");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      alert(err?.code ? `${err.code}: ${err.message}` : err?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!/^\d{4,8}$/.test(otp)) { // most OTPs are 6, but allow 4-8 for test numbers
      alert("Please enter a valid OTP.");
      return;
    }
    try {
      setLoading(true);
      const result = await window.confirmationResult.confirm(otp);
      console.log("User signed in:", result.user);
      alert("Phone number verified successfully!");
      // TODO: navigate or persist user here
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      alert(err?.code ? `${err.code}: ${err.message}` : err?.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login or Signup</h2>

        {step === "phone" && (
          <>
            <div className="flex items-center border rounded px-3 py-2">
              <span className="mr-2">+91</span>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full outline-none"
                inputMode="numeric"
              />
            </div>

            {/* reCAPTCHA container MUST exist before setupRecaptcha() */}
            <div id="recaptcha-container" className="mt-3" />

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 mt-4 rounded hover:bg-purple-700 transition"
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full border rounded px-3 py-2"
              inputMode="numeric"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 mt-4 rounded hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SigninPhone;
