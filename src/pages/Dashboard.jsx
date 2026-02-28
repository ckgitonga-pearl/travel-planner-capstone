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
  city.id || `${city.name}-${city.address?.countryCode}`;
  // 🔥 Analytics
  const totalDays = cityItinerary.length;
  const totalActivities = cityItinerary.reduce(
    (total, day) => total + day.activities.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
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

        {/* 🔥 Analytics Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500">Total Days</p>
            <p className="text-3xl font-bold text-blue-600">
              {totalDays}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500">Total Activities</p>
            <p className="text-3xl font-bold text-blue-600">
              {totalActivities}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500">Trip Status</p>
            <p className="text-3xl font-bold text-green-600">
              {totalDays > 0 ? "Planned" : "Not Started"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Budget */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <BudgetPlanner city={selectedCity} />
          </div>

          {/* Itinerary Summary */}
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

                  {day.activities.length === 0 ? (
                    <p className="text-gray-400 mt-2">
                      No activities added
                    </p>
                  ) : (
                    <ul className="list-disc pl-5 mt-2">
                      {day.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  )}
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