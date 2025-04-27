import React, { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");  // Added for city input
  const [minPrice, setMinPrice] = useState("");  // Added for minPrice input
  const [maxPrice, setMaxPrice] = useState("");  // Added for maxPrice input
  const navigate = useNavigate();

  const tabs = ["Buy", "Rent"];
  const popularSearches = [
    "Resident House",
    "Studio Apartment",
    "Countryside",
    "Farmland House",
  ];

  // Function to handle the filter search
  const fetchFilteredProperties = () => {
    const filters = {
      page: 1, // Default page
      limit: 10, // Default limit
      sort: 'createdAt', // Default sort
      city,
      propertyType,
      minPrice,
      maxPrice,
    };

    // Create query string from filter object
    const query = new URLSearchParams(filters).toString();

    // Navigate to the /property page with the query parameters
    navigate(`/property?${query}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-gray-700 font-medium">
      {/* Tabs */}
      <div className="relative z-0 flex bg-gray-500 w-fit rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 pt-2 pb-5 rounded-lg ${
              activeTab === tab ? "bg-gray-50 text-black" : "bg-gray-500 text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="flex relative z-2 gap-4 mb-6 py-3 px-3 -mt-3 bg-gray-50 rounded-lg items-center">
        {/* Property Type Dropdown */}
        <div className="flex flex-col justify-items-start">
          <span className="flex justify-items-start pl-4">Property Type</span>
          <select
            className="w-full px-3 py-1 rounded-lg border-0 outline-none focus:outline-none text-gray-500"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="" hidden>Select Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        {/* Vertical Line 1 */}
        <div className="w-[1px] h-10 bg-gray-300 self-center"></div>

        {/* Location Input */}
        <div className="flex-1">
          <span className="flex justify-items-start pl-3">Location</span>
          <input
            type="text"
            placeholder="e.g Gambir, Jakarta Pusat"
            className="w-full px-3 py-1 border-0 outline-none focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Vertical Line 2 */}
        <div className="w-[1px] h-10 bg-gray-300 self-center"></div>

        {/* Price Range Input */}
        <div className="flex-1">
          <span className="flex justify-items-start pl-3">Price Range</span>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min. Price"
              className="w-full px-3 py-1 border-0 outline-none focus:outline-none"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max. Price"
              className="w-full px-3 py-1 border-0 outline-none focus:outline-none"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={fetchFilteredProperties}
          className="h-12 px-8 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Popular Searches */}
      <div className="flex items-center gap-4">
        <span className="text-black text-2xl">Popular Search :</span>
        <div className="flex gap-3">
          {popularSearches.map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.75)] hover:bg-gray-50 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
