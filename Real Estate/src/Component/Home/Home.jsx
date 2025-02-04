import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Buy");

  return (
    <div className=" px-8 ">
      <div
        className="relative bg-cover bg-center h-screen rounded-xl "
        style={{ backgroundImage: 'url("images/hero3.jpg")' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 "></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
          {/* Title and Subtitle */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Journey To Your Perfect Home
          </h1>
          <p className="text-lg md:text-xl mb-8">
            
          </p>

          {/* Search Filters */}
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-4xl">
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-4">
              {["Buy", "Rent", "Sell"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 rounded-lg font-semibold ${
                    activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select className="flex-1 p-3 border rounded-lg">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Studio</option>
              </select>
              <input
                type="text"
                placeholder="Location e.g. Gambir, Jakarta Pusat"
                className="flex-1 p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Price Range e.g. Min Price - Max Price"
                className="flex-1 p-3 border rounded-lg"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                Search
              </button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex gap-3 flex-wrap justify-center">
            {[
              "Resident House",
              "Studio Apartment",
              "Countryside",
              "Farmland House",
            ].map((tag) => (
              <button
                key={tag}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
