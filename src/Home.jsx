import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import { useState } from "react";
import { searchCities } from "./services/amadeus";
import { useFavoriteStore } from "./store/favoriteStore";

function Home() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const handleSearch = async (keyword) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCity(null);
      setHasSearched(true);

      const results = await searchCities(keyword);

      // Remove duplicates safely
      const uniqueResults = (results || []).filter(
        (city, index, self) =>
          index ===
          self.findIndex(
            (c) =>
              (c.id || c.name + c.address?.countryCode) ===
              (city.id || city.name + city.address?.countryCode)
          )
      );

      setCities(uniqueResults);
    } catch (err) {
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
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">

        <h1 className="text-3xl font-bold text-center">
          Travel Planner
        </h1>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="text-blue-600">Searching destinations...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {hasSearched && !loading && cities.length === 0 && !error && (
          <p className="text-gray-500">No destinations found.</p>
        )}

        {/* Search Results */}
        <div className="space-y-4">
          {cities.map((city, index) => (
            <DestinationCard
              key={
                city.id ||
                `${city.name}-${city.address?.countryCode}-${index}`
              }
              city={city}
              onSelect={() => setSelectedCity(city)}
            />
          ))}
        </div>

        {/* Selected Destination */}
        {selectedCity && (
          <div className="p-6 bg-white rounded-xl shadow-md space-y-3">
            <h2 className="text-2xl font-bold text-blue-700">
              Selected Destination
            </h2>

            <p className="text-lg font-semibold">
              {selectedCity.name} (
              {selectedCity.address?.countryCode || "N/A"})
            </p>

            <p className="text-sm text-gray-600">
              IATA Code: {selectedCity.iataCode || "N/A"}
            </p>

            <button
              onClick={() => addFavorite(selectedCity)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save to Favorites
            </button>
          </div>
        )}

        {/* Favorite Destinations */}
{favorites.length > 0 && (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-bold text-blue-700 mb-6">
      Favorite Destinations
    </h2>

    <div className="space-y-4">
      {favorites.map((city, index) => (
        <div
          key={
            city.id ||
            `${city.name}-${city.address?.countryCode}-${index}`
          }
          className="flex items-center justify-between border-b pb-4"
        >
          {/* LEFT SIDE */}
          <div>
            <p className="font-semibold text-lg">
              {city.name} ({city.address?.countryCode || "N/A"})
            </p>
            <p className="text-sm text-gray-600">
              IATA: {city.iataCode || "N/A"}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <button
  onClick={() => removeFavorite(city.iataCode)}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Remove
</button>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default Home;