import React, { useState } from "react";

const FlightSearch = ({ token }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/flight/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ origin, destination, departureDate, adults, currency }),
      });
      const flightData = await response.json();
    //   setMessage("✅ Flights found!");
      console.log("Flight offers: ", flightData);
    } catch (error) {
      console.log("Error fetching flight offers: ", error);
      setMessage("❌ Unable to fetch flights. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">✈️ Search Flights</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="From (e.g., NYC)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="To (e.g., LON)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Adults"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            🔍 Search Flights
          </button>
          {message && (
            <p className={`text-center mt-4 ${message.includes("❌") ? "text-red-500" : "text-green-500"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FlightSearch;
