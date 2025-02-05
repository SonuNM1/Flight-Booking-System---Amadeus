import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/amadeus/get-token")
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching token: ", err);
        setLoading(false);
      });
  }, []);

  // Copy Token to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Centered Heading */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Book Your Flights Instantly ✈️
      </h1>

      {/* Two Equal Sections: Image (Left) & Content (Right) */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-between">
        {/* Left Section (Image) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="flight_system.jpg"
            alt="Flight Booking"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section (Text + Buttons) */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left p-6">
          {/* Amadeus API Token Section */}
          <div className="mt-6 w-full max-w-lg bg-white shadow-lg rounded-lg p-4 text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Amadeus API Token
            </h2>

            {loading ? (
              <p className="text-gray-500 animate-pulse">Fetching token...</p>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-3 border border-gray-300">
                <span className="text-gray-700 text-sm truncate w-3/4">{token}</span>
                <button
                  onClick={copyToClipboard}
                  className="ml-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>

          {/* Gap between the token and the next section */}
          <p className="text-lg text-gray-700 mt-6 max-w-md text-center">
            Experience a seamless and secure flight booking system. Choose your
            destination, compare flights, and book instantly.
          </p>

          {/* Features Section */}
          <div className="text-lg text-gray-800 space-y-3 max-w-md mt-4 text-center">
            <p>
              🔍 <span className="font-semibold">Search, Compare & Book</span>{" "}
              flights instantly.
            </p>
            <p>
              🔐 <span className="font-semibold">Secure & Fast</span> booking
              experience.
            </p>
            <p>
              💳 <span className="font-semibold">Multiple Payment Options</span>{" "}
              available.
            </p>
          </div>

          {/* Buttons for Register & Login */}
          <div className="mt-6 space-x-4 text-center">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Homepage