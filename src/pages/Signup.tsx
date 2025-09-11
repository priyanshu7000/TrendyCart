import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../lib/firebase";

import type { FirebaseError } from "firebase/app";
//import eye icon from lucide
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

import image01 from "../assets/signUp_Page_images/image01.png";
import image02 from "../assets/signUp_Page_images/image02.png";
import image03 from "../assets/signUp_Page_images/image03.png";
import image04 from "../assets/signUp_Page_images/image04.png";
import image05 from "../assets/signUp_Page_images/image05.png";
import backgroundImage from "../assets/background_image/backgroundImage.png";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Signup = () => {
  //we are creating the state to store Name, Phone, Email, Password, Confirm Password
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //for show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  //for image array for right section
  const images = [image01, image02, image03, image04, image05];
  //bg-image
  const bgImage = backgroundImage;
  const [currentImage, setCurrentImage] = useState(0);


  //for loader
  const [isLoading, setIsLoading] = useState(false);
  // track if component is mounted
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  //this is for navigation
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  //for email verification

  //We are handling the Signup
  //updating the handle signup
  const handleSignup = async () => {
  setIsLoading(true);
  setError("");

  if (!name || !phone || !email || !password || !confirmPassword) {
    setError("All fields are required.");
    setIsLoading(false);
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    setIsLoading(false);
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      phone,
      email,
      createdAt: new Date(),
    });
    await sendEmailVerification(user);

    toast.success("Signup successful! A verification email has been sent");
  } catch (err: unknown) {
    const error = err as FirebaseError;
    if (error.code === "auth/email-already-in-use") {
      setError("This email is already registered. Please log in instead.");
    } else {
      setError(error.message || "An unknown error occurred");
    }
  } finally {
    // 👈 ensures loader always stops
    setIsLoading(false);
  }
};


  //for googlesignup handle
// const handleGoogleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.preventDefault();
//   setIsLoading(true);

//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     // ...
//     console.log("User successfully sign up ", result.user);
//     //navigate to home page after signup
//     navigate("/home");
//   } catch (err: unknown) {
//     const error = err as FirebaseError;

//     if (error.code === "auth/popup-closed-by-user") {
//       toast.error("Popup closed. Please try again.");

//       //explicity stop the loader
//       setIsLoading(false);
//        navigate("/signup");
//     } else {
//       setError(error.message);
//       toast.error(error.message);
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };

const handleGoogleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  if (!isMounted.current) return;
  setIsLoading(true);
  setError(""); // Clear any previous errors
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!isMounted.current) return;
    // Store user data in Firestore (optional, similar to email signup)
    await setDoc(doc(db, "users", result.user.uid), {
      name: result.user.displayName || "Google User",
      email: result.user.email,
      createdAt: new Date(),
    });
    toast.success("Google signup successful!");
    if (isMounted.current) navigate("/home");
  } catch (err: unknown) {
    const error = err as FirebaseError;
    if (error.code === "auth/popup-closed-by-user") {
      if (isMounted.current) {
        toast.error("Signup cancelled. Please try again.");
      }
    } else if (error.code === "auth/cancelled-popup-request") {
      if (isMounted.current) toast.error("Please wait for the current popup to complete.");
    } else {
      if (isMounted.current) {
        setError(error.message || "Google signup failed");
        toast.error(error.message || "Google signup failed");
      }
    }
  } finally {
    if (isMounted.current) setIsLoading(false);
  }
};

console.log("🔍 Component render - isLoading:", isLoading);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="flex h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left Section */}
      <div className="w-2/3 flex flex-col items-center justify-center px-8 ">
        <h1 className="text-3xl font-bold mb-2">Unlock Your Style</h1>
        <p className="text-gray-600 mb-6">
          Sign up for exclusive deals and the latest trends
        </p>

        <form action="" className="flex flex-col items-center w-full max-w-lg ">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Password */}
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/**this is the remeber me and forget password*/}
          <div className="flex items-center justify-between w-full mb-3 text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Forget Password?
            </a>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Sign Up
          </button>

          {/**Social media icons */}
          {/**this is the pre-define tailwind css google and facebook icons */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignup}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0001 4.54517C14.1537 4.54517 15.9392 5.37877 17.2917 6.64367L20.4571 3.47827C18.2393 1.35337 15.2001 0 12.0001 0C7.30006 0 3.22746 2.69837 1.05006 6.54517L5.05006 9.54517C5.97236 7.63587 8.16336 6.54517 12.0001 6.54517Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.6401 12.2721C23.6401 11.5878 23.5828 10.9035 23.4735 10.2285H12.0001V14.7715H18.5135C18.2571 16.0364 17.5857 17.1524 16.6001 17.9715L20.6001 21.0001C22.9235 18.7715 23.6401 15.6534 23.6401 12.2721Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.0001 24.0001C15.2001 24.0001 17.9628 22.9094 20.0101 21.0001L16.6001 17.9715C15.6145 18.7906 14.1878 19.3637 12.0001 19.3637C8.16336 19.3637 5.97236 18.2721 5.05006 16.3628L1.05006 19.3628C3.22746 23.2094 7.30006 24.0001 12.0001 24.0001Z"
                  fill="#34A853"
                />
                <path
                  d="M1.05006 6.54517C0.378765 7.63587 0 8.90077 0 10.2285C0 11.5562 0.378765 12.8211 1.05006 13.9118L5.05006 16.3628L5.05006 9.54517L1.05006 6.54517Z"
                  fill="#FBBC05"
                />
              </svg>
              Continue with Google
            </button>

            {/* Facebook Button */}
            <button className="flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b5998] hover:bg-[#314a77] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998]">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C17.361 21.288 22 17.128 22 12z" />
              </svg>
              Continue with Facebook
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-1/3 flex items-center justify-center bg-gray-100 relative overflow-hidden">
        <img
          src={images[currentImage]}
          alt="Fashion"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-fade"
        />
      </div>
    </div>
  );
};
export default Signup;
