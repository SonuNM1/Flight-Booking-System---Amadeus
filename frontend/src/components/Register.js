import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // State to track if email is already registered
  const navigate = useNavigate(); // To navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple front-end validation: Check if fields are empty
    if (!name || !email || !password) {
      setMessage("❌ All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Success message
      setMessage("✅ Registration successful!");

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5 seconds delay before redirecting
    } catch (error) {
      console.log("Register error:", error);

      // Display specific error message
      if (error?.response?.data?.message === "Email already in use") {
        setMessage("❌ Email already in use!");
        setIsRegistered(true); // Set state to indicate that the email is already registered
      } else {
        setMessage(
          "❌ " + (error?.response?.data?.message || "Something went wrong.")
        );
        setIsRegistered(false); // In case of other errors, reset the state
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Register
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("❌") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-4">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
