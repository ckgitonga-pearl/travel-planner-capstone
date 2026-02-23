import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import { useState } from "react";
import { searchCities } from "./services/amadeus";

function Home() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword) => {
  try {
    setLoading(true);
    setError(null);
    setCities([]);

    const results = await searchCities(keyword);

    setCities(results || []);
  } catch (err) {
    // If Amadeus returns 400, treat as no results
    if (err.response?.status === 400) {
      setCities([]);
      setError(null);
    } else {
      setError("Network error. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">Travel Planner</h1>

    <SearchBar onSearch={handleSearch} />

    {loading && (
      <p className="text-blue-600 mb-4">
        Searching destinations...
      </p>
    )}

    {error && (
      <p className="text-red-500 mb-4">
        {error}
      </p>
    )}

    {!loading && cities.length === 0 && !error && (
      <p className="text-gray-500">
        No destinations found.
      </p>
    )}

    <div className="space-y-4 mt-4">
      {cities.map((city) => (
       <DestinationCard
  key={city.iataCode || city.name}
  city={city}
/>
      ))}
    </div>
  </div>
);
}

export default Home;