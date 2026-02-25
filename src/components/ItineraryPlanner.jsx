import { useState } from "react";
import { useItineraryStore } from "../store/itineraryStore";

function ItineraryPlanner({ city }) {
  

  if (!city) return null;

  const cityKey =
    city.id || `${city.name}-${city.address?.countryCode}`;

  const {
    itineraries,
    addDay,
    addActivity,
    removeActivity,
  } = useItineraryStore();

  const cityPlan = itineraries[cityKey] || [];
  const [inputs, setInputs] = useState({});

  const handleInputChange = (dayId, value) => {
    setInputs((prev) => ({
      ...prev,
      [dayId]: value,
    }));
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">
        Itinerary Planner
      </h2>

      <button
        onClick={() => addDay(cityKey)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Add Day
      </button>

      {cityPlan.length === 0 && (
        <p className="text-gray-500">No days added yet.</p>
      )}

      {cityPlan.map((day, dayIndex) => (
        <div
          key={day.id}
          className="border p-4 rounded-lg mt-4"
        >
          <h3 className="font-semibold">
            Day {dayIndex + 1}
          </h3>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={inputs[day.id] || ""}
              onChange={(e) =>
                handleInputChange(day.id, e.target.value)
              }
              placeholder="Add activity"
              className="border p-2 rounded w-full"
            />

            <button
              onClick={() => {
  const activity = inputs[day.id];

  if (!activity || !activity.trim()) return;

  addActivity(cityKey, day.id, activity);

  setInputs((prev) => ({
    ...prev,
    [day.id]: "",
  }));
}}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {day.activities.map((activity,index) => (
              <li
                key={index}
                className="flex justify-between items-center"
              >
                <span>{activity}</span>

                <button
                  onClick={() =>
                    removeActivity(
                      cityKey,
                      day.id,
                      index
                    )
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ItineraryPlanner;