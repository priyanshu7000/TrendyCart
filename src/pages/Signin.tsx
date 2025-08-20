import { useState } from "react";
import {
  SignInMethod,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom"; //for page navigation

const Signin = () => {
  //Make the states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //this is an ts object with typescript utility with key value pair with both string, string and have some errors which may occur and give the value if that key hit you can use that value
  const errorMessages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-email": "Invalid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };

  //we are handling the Signin there !!
  const handleSignin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both field are required.");
      return;
    }

    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      //optional:Check email verification
      if (!user.emailVerified) {
        await signOut(auth);
        setError("Please verify your email before signing in.");
        setLoading(false);
        return;
      }
      //Success -> go to profile/dashboard
      navigate("/profile");
    } catch (err) {
      const e = err as FirebaseError;
      setError(errorMessages[e.code] || e.message || "Login Failed.");
    } finally {
      setLoading(false);
    }
  };

  //we are handling the password reset section
  const handleResetPassword = async () => {
    setError("");
    if (!email) {
      setError("Enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      //we will add toast later it
      alert("Password reset email sent! Check your inbox.");
    } catch (err) {
      const e = err as FirebaseError;
      setError(
        errorMessages[e.code] || e.message || "Could not send reset email."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSignin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In Page</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          autoComplete="current-password"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={handleResetPassword}
            className="text-sm text-purple-600 hover:underline"
          >
            Forgot password?
          </button>

          <Link to="/signup" className="text-sm text-gray-600 hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
