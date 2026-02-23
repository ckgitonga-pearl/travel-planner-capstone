import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import { useState } from "react";
import { searchCities } from "./services/amadeus";

function Home() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (keyword) => {
    try {
      const results = await searchCities(keyword);
      setCities(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch cities.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Travel Planner</h1>

      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {cities.map((city) => (
          <DestinationCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}

export default Home;