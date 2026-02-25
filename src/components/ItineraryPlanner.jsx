import { useState } from "react";
import { useItineraryStore } from "../store/itineraryStore";

function ItineraryPlanner({ city }) {
  const [activityInput, setActivityInput] = useState("");

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
          key={dayIndex}
          className="border p-4 rounded-lg mt-4"
        >
          <h3 className="font-semibold">
            Day {dayIndex + 1}
          </h3>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={activityInput}
              onChange={(e) =>
                setActivityInput(e.target.value)
              }
              placeholder="Add activity"
              className="border p-2 rounded w-full"
            />

            <button
              onClick={() => {
                if (!activityInput.trim()) return;
                addActivity(
                  cityKey,
                  dayIndex,
                  activityInput
                );
                setActivityInput("");
              }}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {day.activities.map((activity, activityIndex) => (
              <li
                key={activityIndex}
                className="flex justify-between items-center"
              >
                <span>{activity}</span>

                <button
                  onClick={() =>
                    removeActivity(
                      cityKey,
                      dayIndex,
                      activityIndex
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