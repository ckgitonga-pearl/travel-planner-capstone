function DestinationCard({ city, onSelect }) {
  if (!city) return null; // 🛡️ prevents crash

  return (
    <div
      onClick={onSelect}
      className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
    >
      <h3 className="text-xl font-semibold">
        {city.name || "Unknown City"}
      </h3>

      <p className="text-gray-600">
        Country: {city.address?.countryCode || "N/A"}
      </p>
    </div>
  );
}

export default DestinationCard;