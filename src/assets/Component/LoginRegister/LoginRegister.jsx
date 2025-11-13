import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import toast from "react-hot-toast";

export const LoginRegister = () => {
  const { signInWithGoogle, createUser, signInUser,signOutWithGoogle } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");

  // -------------------------- LOGIN --------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success("Login Successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  // ------------------------- GOOGLE LOGIN ----------------------
  const handleWithGoogle = (e) => {
    e.preventDefault();

    signInWithGoogle()
      .then((result) => {
        toast.success("Logged in with Google!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  // ------------------------ REGISTER ---------------------------
  const handleRegister = (e) => {
    e.preventDefault();
   


    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoURL.value;

    // ---------------- Password Validation ----------------
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain at least one uppercase letter!");
    }

    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain at least one lowercase letter!");
    }

    // ---------------- Create User ----------------
    createUser(email, password)
      .then((result) => {
        toast.success("Registration Successful!");
        console.log(result);
         e.target.reset();
          // ❗ DO NOT KEEP USER LOGGED IN
      signOutWithGoogle()

      // Optional: Switch tab to Login
      setActiveTab("login");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="shadow-2xl p-8 rounded-2xl w-full max-w-md bg-white dark:bg-gray-900 dark:text-gray-100">
        
        {/* Title */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-400 bg-clip-text text-transparent text-center mb-2">
          Welcome to TradeHub
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-4">
          Login or create an account to continue
        </p>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-l-lg ${
              activeTab === "login"
                ? "bg-orange-100 text-orange-700 font-semibold"
                : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-r-lg ${
              activeTab === "register"
                ? "bg-orange-100 text-orange-700 font-semibold"
                : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* -------------------- LOGIN FORM --------------------- */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Password</label>
              <input
                name="password"
                type="password"
                placeholder="•••••••"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Login
            </button>

            <div className="py-3 text-blue-600"><a href="#">Forgot Password ?</a></div>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300 dark:border-gray-700" />
              <span className="px-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            </div>

            <button
              onClick={handleWithGoogle}
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 dark:border-gray-700 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 512 512">
                <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                <path fill="#34A853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285F4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#FBBC05" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              </svg>
              Google
            </button>
          </form>
        )}

        {/* ------------------ REGISTER FORM -------------------- */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Photo URL (optional)</label>
              <input
                name="photoURL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {/* Password field with requirement text */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Password</label>
              <input
                name="password"
                type="password"
                placeholder="•••••••"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />

              <p className="text-xs text-red-500 mt-1">
                Must contain at least 6 characters, 1 uppercase & 1 lowercase letter.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Register
            </button>

            <div className="py-3 text-blue-600"><a href="#">Forgot Password ?</a></div>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300 dark:border-gray-700" />
              <span className="px-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            </div>

            <button
              onClick={handleWithGoogle}
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 dark:border-gray-700 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 512 512">
                <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                <path fill="#34A853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285F4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#FBBC05" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              </svg>
              Google
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
