import { useState, useEffect } from "react"; 
import HeartIcon from "../Home/HeartIcon";
import { NavLink } from "react-router";

const ProCard = ({ pro }) => {
  const {
    _id,
    images,
    price,
    title,
    propertyType,
    bedrooms = 0,
    bathrooms = 0,
    area = 0,
    address = {},
  } = pro;

  const [filled, setFilled] = useState(false);

  // Extract address details safely
  const addressStreet = address?.street || "";
  const addressCity = address?.city || "";
  const addressZipCode = address?.zipCode || "";
  const fullAddress = addressStreet || "Address not available";
  const cityZip = addressCity && addressZipCode ? `${addressCity}, ${addressZipCode}` : "Location not specified";

  // Get the first image URL or use placeholder
  const imageUrl = images && images.length > 0 ? images[0].url : "/placeholder-image.jpg";

  const formatPrice = (value) => {
    if (value == null) return "$0";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatSquareFeet = (value) => {
    if (value == null) return "0";
    return value.toLocaleString();
  };

  async function likeproperty() {
    try {
      const res = await fetch('http://localhost:5000/api/v1/like/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }), // sending the ID in body
        credentials: 'include', // Ensure cookies are sent with the request
      });
  
      const data = await res.json();
      console.log('Response:', data);
      setFilled(data.licked || data.liked); // Handle both possible response keys
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async function likeStatus() {
    try {
      const res = await fetch('http://localhost:5000/api/v1/like/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
        credentials: 'include',
      });
  
      const data = await res.json();
      console.log('Like status response:', data);
      setFilled(data.licked || data.liked); // Handle both possible response keys
    } catch (err) {
      console.error('Error checking like status:', err);
    }
  }
  
  useEffect(() => {
    likeStatus();
  }, [_id]); // Added _id as dependency

  return (
    <div className="relative h-full rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-64">
        <NavLink to="/Details" state={{ _id }}>
          <img
            src={imageUrl}
            alt={title || "Property"}
            className="w-full h-full object-cover"
          />
        </NavLink>

        {/* Property Type Badge */}
        {propertyType && (
          <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={likeproperty}
          className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
        >
          <HeartIcon filled={filled} />
        </button>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-sm">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold truncate">{title || "Untitled Property"}</h3>
          <div className="text-xl font-bold text-amber-500">
            {formatPrice(price)}
          </div>
        </div>

        {/* Address */}
        <div className="text-white/90 text-sm mb-3">
          <div className="truncate">{fullAddress}</div>
          <div className="text-white/70 text-xs">{cityZip}</div>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center">
            <span>{formatSquareFeet(area)} Sq. Ft.</span>
          </div>
          <div className="flex items-center">
            <span>{bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}</span>
          </div>
          <div className="flex items-center">
            <span>{bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProCard;