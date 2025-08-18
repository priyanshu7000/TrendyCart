import React, { useState } from "react";
import { auth, setUpRecaptcha } from "../lib/firebase";

import { signInWithPhoneNumber  } from "firebase/auth";
import type{ConfirmationResult} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: ConfirmationResult;
  }
}

const SigninPhone: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit number");
      return;
    }

    try {
      setLoading(true);
      setUpRecaptcha(); // setup invisible reCAPTCHA
      const appVerifier = window.recaptchaVerifier;

      const fullPhone = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
      );

      window.confirmationResult = confirmation;
      setStep("otp");
      alert("OTP sent successfully!");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const result = await window.confirmationResult.confirm(otp);
      console.log("User signed in:", result.user);
      alert("Phone number verified successfully!");
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      alert(err.message);
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
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <div id="recaptcha-container"></div>

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
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded px-3 py-2"
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
