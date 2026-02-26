import { useItineraryStore } from "../store/itineraryStore";

function BudgetPlanner({ city }) {
  if (!city) return null;

  const cityKey =
    city.id || `${city.name}-${city.address?.countryCode}`;

  const {
    budgets,
    setBudget,
    tripDates,
    setTripDates,
    itineraries,
  } = useItineraryStore();

  const budget = budgets[cityKey] || "";
  const dates = tripDates[cityKey] || {};

  // Calculate total planned cost
  const totalCost =
    (itineraries[cityKey] || []).reduce((sum, day) => {
      return (
        sum +
        day.activities.reduce(
          (daySum, activity) =>
            daySum + Number(activity.cost || 0),
          0
        )
      );
    }, 0);

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">
        Budget Planner
      </h2>

      {/* Budget Input */}
      <div>
        <label className="block font-semibold mb-1">
          Trip Budget
        </label>
        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(cityKey, e.target.value)
          }
          placeholder="Enter trip budget"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Trip Dates */}
      <div className="space-y-2">
        <label className="block font-semibold">
          Trip Dates
        </label>

        <div className="flex gap-4">
          <input
            type="date"
            value={dates.start || ""}
            onChange={(e) =>
              setTripDates(cityKey, {
                ...dates,
                start: e.target.value,
              })
            }
            className="border p-2 rounded w-full"
          />

          <input
            type="date"
            value={dates.end || ""}
            onChange={(e) =>
              setTripDates(cityKey, {
                ...dates,
                end: e.target.value,
              })
            }
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Budget Summary */}
      <div className="border-t pt-4">
        <p className="font-semibold">
          Total Planned Cost: ${totalCost}
        </p>

        {budget && (
          <p
            className={`font-semibold ${
              totalCost > budget
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            Remaining Budget: ${budget - totalCost}
          </p>
        )}
      </div>
    </div>
  );
}

export default BudgetPlanner;