import { Link } from "react-router-dom";
import { useItineraryStore } from "../store/itineraryStore";

function Dashboard() {
  const { selectedCity, itineraries } = useItineraryStore();

  if (!selectedCity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">No Trip Selected</h2>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

 const cityKey = selectedCity.name;
const cityItinerary = itineraries[cityKey] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">
            {selectedCity.name} Trip Summary
          </h1>

          <Link
            to="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Back
          </Link>
        </div>

       {cityItinerary.length === 0 ? (
  <p className="text-gray-500">No itinerary planned yet.</p>
) : (
  cityItinerary.map((day, index) => (
    <div
      key={day.id}
      className="border rounded-lg p-4 space-y-2"
    >
      <h3 className="font-semibold text-lg">
        Day {index + 1}
      </h3>

      {day.activities.length === 0 ? (
        <p className="text-gray-400">No activities</p>
      ) : (
        <ul className="list-disc pl-5">
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
  );
}

export default Dashboard;