import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [phone, setPhone] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  /*Initialize reCAPTCHA verifier */
  /*
  const initRecaptcha = () => {
    return new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };
*/
  const handleContinue = async () => {
    if (!phone || !checked) return;
    setError("");
    setLoading(true);
    try {
      //const recaptcha = initRecaptcha();
      const result = await signInWithPhoneNumber(auth, `+91${phone}`);
      setConfirmationResult(result);
      setOtpStep(true);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const [otp, setOtp] = useState("");
  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      if (!confirmationResult) throw new Error("Please request OTP first");
      const res = await confirmationResult.confirm(otp);
      console.log("Logged in user:", res.user);
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (user) navigate("/profile");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {!otpStep ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Login or <span className="font-bold">Signup</span></h2>

            <div className="mb-4">
              <div className="flex items-center border rounded overflow-hidden">
                <span className="px-3 bg-gray-100 border-r">+91</span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 p-2 outline-none"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-sm">
                By continuing, I agree to the{" "}
                <span className="text-purple-600">Terms of Use</span> &{" "}
                <span className="text-purple-600">Privacy Policy</span> and I am above 18 years old.
              </label>
            </div>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <button
              onClick={handleContinue}
              disabled={!phone || !checked || loading}
              className={`w-full py-2 rounded text-white font-semibold ${
                phone && checked
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "CONTINUE"}
            </button>

            <p className="mt-4 text-sm text-center text-gray-500">
              Have trouble logging in? <span className="text-purple-600 cursor-pointer">Get help</span>
            </p>
            
            {/**This is the Recaptcha */}
            {/** <div id="recaptcha-container"></div> */}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-2 rounded bg-green-600 text-white font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
