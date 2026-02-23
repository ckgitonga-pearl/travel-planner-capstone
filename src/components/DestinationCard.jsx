function DestinationCard({ city }) {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">
        {city.name}
      </h2>
      <p className="text-gray-600">
        Country: {city.address.countryCode}
      </p>
    </div>
  );
}

export default DestinationCard;