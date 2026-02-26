import { Link } from "react-router-dom";
import { useItineraryStore } from "../store/itineraryStore";
import BudgetPlanner from "../components/BudgetPlanner";

function Dashboard() {
  const { selectedCity, itineraries } = useItineraryStore();

  if (!selectedCity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  const cityKey =
    selectedCity.id ||
    `${selectedCity.name}-${selectedCity.address?.countryCode}`;

  const cityItinerary = itineraries[cityKey] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">
            {selectedCity.name} Trip Dashboard
          </h1>

          <Link
            to="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Back
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow-md p-6">
            <BudgetPlanner city={selectedCity} />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">
              Itinerary Summary
            </h2>

            {cityItinerary.length === 0 ? (
              <p className="text-gray-500">
                No itinerary planned yet.
              </p>
            ) : (
              cityItinerary.map((day, index) => (
                <div
                  key={day.id}
                  className="border rounded-lg p-4"
                >
                  <h3 className="font-semibold">
                    Day {index + 1}
                  </h3>

                  <ul className="list-disc pl-5 mt-2">
                    {day.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;