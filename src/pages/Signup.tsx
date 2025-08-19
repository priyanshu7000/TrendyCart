import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import type { FirebaseError } from "firebase/app";

const Signup = () => {
  //we are creating the state to store Name, Phone, Email, Password, Confirm Password
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  //for email verification

  //We are handling the Signup
  //updating the handle signup
  const handleSignup = async () => {
    setError("");

    if (!name || !phone || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      //create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //Store extra info in Firestoe (Linked with user.uid)
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        email,
        createdAt: new Date(),
      });
      await sendEmailVerification(user);
      console.log("User signed up successfully:", user);
      alert("Signup successful! A verification email has been sent");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      if (err instanceof Error) {
        setError(err.message);
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already registered. Please log in instead.");
        } else {
          setError(error.message);
        }
      } else {
        setError("An unknown error occurred");
      }
    }
    //Firebase logic will go here later
    console.log("Signup data:", { name, phone, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
