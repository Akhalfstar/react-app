import React, { useState, useEffect } from "react";
import ProCard from "./ProCard";
import { useLocation, useNavigate } from "react-router";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";

function Property() {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Filter states
  const [filters, setFilters] = useState({
    city: queryParams.get("city") || "",
    propertyType : (queryParams.get("propertyType") || "").toLowerCase(),
    minPrice: queryParams.get("minPrice") || "",
    maxPrice: queryParams.get("maxPrice") || "",
    bedrooms: queryParams.get("bedrooms") || "",
    bathrooms: queryParams.get("bathrooms") || "",
    page: queryParams.get("page") || 1,
    limit: queryParams.get("limit") || 12,
    sort: queryParams.get("sort") || "createdAt"
  });

  // City options (you can fetch these from API if needed)
  const cityOptions = ["New York", "Noida", "Los Angeles", "Chicago", "Miami", "Seattle", "Austin"];
  const propertyTypeOptions = ["Apartment", "House", "Villa", "Townhouse"];
  const sortOptions = [
    { value: "createdAt", label: "Newest" },
    { value: "price", label: "Price (Low to High)" },
    { value: "-price", label: "Price (High to Low)" }
  ];

  useEffect(() => {
    fetchProperties(filters);
  }, [filters.page, filters.limit, filters.sort]);

  const fetchProperties = async (filterParams) => {
    let query = `page=${filterParams.page}&limit=${filterParams.limit}&sort=${filterParams.sort}`;

    if (filterParams.city) query += `&city=${filterParams.city}`;
    if (filterParams.propertyType) query += `&propertyType=${(filterParams.propertyType).toLowerCase()}`;
    if (filterParams.minPrice) query += `&minPrice=${filterParams.minPrice}`;
    if (filterParams.maxPrice) query += `&maxPrice=${filterParams.maxPrice}`;
    if (filterParams.bedrooms) query += `&bedrooms=${filterParams.bedrooms}`;
    if (filterParams.bathrooms) query += `&bathrooms=${filterParams.bathrooms}`;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/property/search?${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      setAllProperties(res.data || res);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    
    // Update URL with filter params
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    
    navigate(`${location.pathname}?${searchParams.toString()}`);
    fetchProperties(filters);
    
    if (window.innerWidth < 768) {
      setFilterOpen(false);
    }
  };

  const clearFilters = () => {
    const resetFilters = {
      city: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      page: 1,
      limit: 12,
      sort: "createdAt"
    };
    setFilters(resetFilters);
    navigate(location.pathname);
    fetchProperties(resetFilters);
  };

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sort: e.target.value };
    setFilters(newFilters);
    
    // Update URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", e.target.value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Available Properties</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.sort}
                onChange={handleSortChange}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="md:hidden bg-amber-600 text-white rounded-md px-4 py-2 flex items-center gap-2"
            >
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Hidden on mobile unless opened */}
          <div className={`
            md:w-1/4 bg-white p-4 rounded-lg shadow-md
            ${filterOpen ? 'block' : 'hidden'} md:block
            fixed md:relative top-0 left-0 w-full h-full md:h-auto z-10 md:z-0
            ${filterOpen ? 'bg-white' : ''}
          `}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="md:hidden text-gray-500"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={applyFilters} className="space-y-4">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Cities</option>
                  {cityOptions.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              {/* Property Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Types</option>
                  {propertyTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
              
              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-md px-4 py-2 flex-1 flex items-center justify-center gap-2"
                >
                  <FiSearch size={16} />
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
          
          {/* Properties Grid */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Error: {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProperties.length > 0 ? (
                    allProperties.map((pro) => <ProCard key={pro._id} pro={pro} />)
                  ) : (
                    <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
                      <h3 className="text-xl font-medium text-gray-800 mb-2">No properties found</h3>
                      <p className="text-gray-500">Try adjusting your filters to see more results</p>
                    </div>
                  )}
                </div>
                
                {/* Pagination can be added here */}
                {allProperties.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, parseInt(prev.page) - 1) }))}
                        disabled={filters.page <= 1}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 border border-gray-300 rounded-md bg-amber-50 text-sm font-medium">
                        Page {filters.page}
                      </span>
                      <button 
                        onClick={() => setFilters(prev => ({ ...prev, page: parseInt(prev.page) + 1 }))}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;