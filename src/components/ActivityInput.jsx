import { useState } from "react";

function ActivityInput({ cityKey, dayId, addActivity }) {
  const [activity, setActivity] = useState("");

  const handleAdd = () => {
    if (!activity.trim()) return;

    addActivity(cityKey, dayId, activity);
    setActivity("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Add activity"
        className="border p-2 rounded w-full"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-3 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default ActivityInput;